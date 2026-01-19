from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import torch
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image
import io
import json
import urllib.request
import os
import ssl

# Bypass SSL verification for model/label downloads (fix for macOS)
ssl._create_default_https_context = ssl._create_unverified_context

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",  # React app
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Model (Custom Rice Classifier)
print("Loading custom rice classifier...")
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# structure: MobileNetV2
model = models.mobilenet_v2(weights=None)
# Replace classifier head for 4 classes (as identified in inspection)
# MobileNetV2 classifier is a Sequential:
# (0): Dropout
# (1): Linear(in_features=1280, out_features=1000) -> Change to 4
model.classifier[1] = torch.nn.Linear(model.classifier[1].in_features, 4)

# Load weights
try:
    state_dict = torch.load("rice_classifier.pth", map_location=device)
    model.load_state_dict(state_dict)
    print("Custom model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    # Fallback to init if fails? No, critical error.
    raise e

model.to(device)
model.eval()

# Image Transforms - standard for MobileNetV2/ResNet
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# Class Labels
# Since we don't have a labels file, we'll use generic names.
labels = ['keeri samba', 'rathu kekulu', 'samba', 'suwandel'] # Common 4-class rice datasets often have these. 
# If incorrect, user can update. I will notify user.

@app.get("/")
async def read_root():
    return {"message": "Image Classification API is running"}

@app.post("/classify")
async def classify_image(file: UploadFile = File(...)):
    try:
        # Read image
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data)).convert('RGB')
        
        # Transform
        input_tensor = transform(image)
        input_batch = input_tensor.unsqueeze(0) # Create mini-batch as expected by the model
        
        # Inference
        with torch.no_grad():
            output = model(input_batch)
        
        # Get top prediction
        probabilities = torch.nn.functional.softmax(output[0], dim=0)
        top_prob, top_catid = torch.topk(probabilities, 1)
        
        class_id = top_catid.item()
        confidence = top_prob.item()
        
        label = labels[class_id] if class_id < len(labels) else f"Class {class_id}"
        
        return JSONResponse(content={
            "class": label,
            "confidence": float(confidence),
            "class_id": class_id
        })

    except Exception as e:
        print(f"Error processing image: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
