# RiceScan: Automated Rice Variety Identification from Images

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

### User interface
![alt text](<ui/Screenshot 2026-01-20 at 03.24.33.png>)

![alt text](<ui/Screenshot 2026-01-20 at 03.24.23.png>)

## Future Work
- Improve dataset size and diversity​: add more rice varieties
- Extract deep features for clustering similar rice types​
- Compare multiple CNN architectures
- Extend the model to detect quality issues in rice grains​

* Identify: insects or larvae on rice​, damaged grains, rotten or discolored grains​, mold or fungal growth 

## Author
Vijani Alenthuge
MNLE, HU University of Applied Sciences, Utrecht, The Netherlands
