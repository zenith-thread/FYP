from flask import Flask, request, jsonify
import joblib
import os

app = Flask(__name__)

# Load Model and Scaler
current_dir = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(os.path.join(current_dir, 'SELU_Habitable.h5'))
scaler = joblib.load(os.path.join(current_dir, 'habitability_scaler.pkl'))

@app.route('/predict', methods=['POST'])

def predict():
    data = request.json['features']
    scaled_data = scaler.transform([data])
    prediction = model.predict(scaled_data)
    predicted_class = prediction.argmax(axis=1).tolist()
    return jsonify({'prediction': predicted_class})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
