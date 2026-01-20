from fastapi import FastAPI, UploadFile, File
import io
from app.model.predict import predict_image
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict it to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    prediction = predict_image(io.BytesIO(contents))  # ✅ Pass as BytesIO stream
    label = "Pneumonia" if prediction > 0.5 else "Normal"
    return {"prediction": prediction, "label": label}

