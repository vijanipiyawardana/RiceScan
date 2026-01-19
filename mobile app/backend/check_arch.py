import torch
try:
    checkpoint = torch.load('rice_classifier.pth', map_location='cpu')
    keys = list(checkpoint.keys())
    print(f"First 5 keys: {keys[:5]}")
except Exception as e:
    print(e)
