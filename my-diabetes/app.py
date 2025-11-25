from flask import Flask, request, jsonify, send_from_directory
import numpy as np
import pickle

app = Flask(__name__, static_folder="static")

# Load ML model and scaler
model = pickle.load(open("model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))

# Serve frontend
@app.route("/")
def home():
    return send_from_directory(app.static_folder, "index.html")

# API endpoint for prediction
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    features = np.array([[ 
        data.get("Pregnancies", 0),
        data.get("Glucose", 0),
        data.get("BloodPressure", 0),
        data.get("SkinThickness", 0),
        data.get("Insulin", 0),
        data.get("BMI", 0),
        data.get("DiabetesPedigreeFunction", 0),
        data.get("Age", 0)
    ]])

    scaled = scaler.transform(features)
    prediction = int(model.predict(scaled)[0])
    probability = float(model.predict_proba(scaled)[0][1])

    return jsonify({
        "prediction": prediction,
        "probability": probability,
        "message": "Diabetic" if prediction == 1 else "Not Diabetic"
    })

# Serve other static files (JS, CSS, images)
@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(app.static_folder, path)

if __name__ == "__main__":
    app.run(debug=True)
