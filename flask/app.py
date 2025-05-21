from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import io
import flask_cors
import os
import gdown

app = Flask(__name__)
flask_cors.CORS(app)

# === DOWNLOAD MODEL DARI GOOGLE DRIVE ===
MODEL_PATH = "model_tumor_otak_v2.h5"
DRIVE_FILE_ID = "1Ovq0FBVziAcRSYn9MKuuBBjp2jWisteX"  # ← Ganti dengan ID dari Google Drive

if not os.path.exists(MODEL_PATH):
    print("📥 Mengunduh model dari Google Drive...")
    gdown.download(f"https://drive.google.com/uc?id={DRIVE_FILE_ID}", MODEL_PATH, quiet=False)

# === LOAD MODEL ===
model = load_model(MODEL_PATH)

# Label klasifikasi (urutkan sesuai class_indices saat training)
labels = ['glioma', 'meningioma', 'notumor', 'pituitary']

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image_file = request.files['image']
    try:
        image = Image.open(image_file).resize((224, 224)).convert("RGB")
        image = np.array(image) / 255.0
        image = np.expand_dims(image, axis=0)

        prediction = model.predict(image)[0]
        class_index = int(np.argmax(prediction))
        confidence = float(prediction[class_index]) * 100

        return jsonify({
            'result': labels[class_index],
            'confidence': round(confidence, 2)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
