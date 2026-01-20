# backend/app/model/predict.py

from PIL import Image
import torch
from torchvision import transforms
from .cnn import PneumoniaCNN
import os

# ----------------------------
# Device
# ----------------------------
device = torch.device("cpu")

# ----------------------------
# Resolve model path safely
# ----------------------------
# backend/app/model/predict.py -> backend/
BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)

MODEL_PATH = os.getenv(
    "MODEL_PATH",
    os.path.join(BASE_DIR, "saved_models", "pneumonia_cnn.pth")
)

# ----------------------------
# Load model ONCE (important)
# ----------------------------
model = PneumoniaCNN()
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model.to(device)
model.eval()

# ----------------------------
# Image preprocessing
# ----------------------------
def preprocess_image(image_bytes):
    image_bytes.seek(0)
    image = Image.open(image_bytes).convert("L")

    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5], std=[0.5]),
    ])

    tensor = transform(image).unsqueeze(0)
    return tensor

# ----------------------------
# Prediction
# ----------------------------
def predict_image(image_bytes):
    tensor = preprocess_image(image_bytes).to(device)
    with torch.no_grad():
        output = model(tensor)
        prediction = torch.sigmoid(output).item()
    return prediction
