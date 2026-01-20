import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AlertToast from "./AlertToast";
import PredictionResult from "./PredictionResult";

const UploadCard = () => {
    const [file, setFile] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [label, setLabel] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = async () => {
        if (!file) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            const res = await axios.post(
                "http://127.0.0.1:8000/predict",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            const pred = res.data.prediction;
            setPrediction(pred);
            setLabel(pred > 0.5 ? "Pneumonia Detected" : "Normal");
        } catch (error) {
            console.error("Error:", error);
            setLabel("Prediction failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="bg-sky-200 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-md mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <AlertToast
                show={showAlert}
                message="Please upload a valid X-ray image to continue."
                onClose={() => setShowAlert(false)}
            />

            <label className="block text-lg text-center font-semibold text-gray-700 mb-2">
                Upload X-ray Image
            </label>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4 w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-2 px-4 rounded-xl transition text-white ${
                    loading
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
                {loading ? "Analyzing..." : "Submit"}
            </button>

            {prediction !== null && (
                <PredictionResult prediction={prediction} label={label} />
            )}
        </motion.div>
    );
};

export default UploadCard;
