from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import io
import flask_cors

app = Flask(__name__)
flask_cors.CORS(app)

# Load model
model = load_model("model_tumor_otak_v2.h5")  # pastikan ini sesuai

# Label klasifikasi: urutkan sesuai train_gen.class_indices
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
