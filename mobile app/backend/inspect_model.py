import torch
import sys

try:
    checkpoint = torch.load('rice_classifier.pth', map_location='cpu')
    print(f"Type: {type(checkpoint)}")
    
    if isinstance(checkpoint, dict):
        print("Keys:", checkpoint.keys())
        if 'state_dict' in checkpoint:
            print("Found state_dict")
            sd = checkpoint['state_dict']
        else:
            sd = checkpoint
            
        # Try to find final layer weights to guess classes
        for key in list(sd.keys())[-2:]:
            print(f"Key: {key}, Shape: {sd[key].shape}")
            
    elif hasattr(checkpoint, 'state_dict'):
        print("It seems to be a full model object.")
        # Try to inspect last layer
        print(checkpoint)
    else:
        print("Unknown format")

except Exception as e:
    print(f"Error: {e}")
