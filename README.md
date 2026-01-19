# Rice Type Classification using Computer Vision

This project classifies rice types from images using a deep learning model
(MobileNetV2) trained in PyTorch.

## Problem
Identifying rice varieties manually requires expertise and is time-consuming.
This project provides an automated image-based solution.

## Approach
- Image collection using smartphone
- Data preprocessing and augmentation
- Transfer learning with MobileNetV2
- Model evaluation and inference

## Dataset
Custom dataset collected using smartphone images.
(Not included in the repository)

## Model
- Architecture: MobileNetV2
- Input size: 320×320
- Framework: PyTorch

## Results
- Binary rice classification (e.g. white vs red/brown rice)
- Accuracy evaluated on held-out test set

## Mobile/Web Application
- Mobile application shows the predicted results for a given image using the model accessed in the backend. Two ways to input an image:
- 1. Upload image
- 2. Capture image from camera

## Future Work
- Add more rice varieties
- Detect insects or damaged grains

## Author
Vijani Alenthuge
MNLE, HU University of Applied Sciences, Utrecht, The Netherlands
