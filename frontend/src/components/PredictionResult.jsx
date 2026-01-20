// components/PredictionResult.jsx
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";

const PredictionResult = ({ prediction, label }) => {
    const isPneumonia = label === "Pneumonia Detected";

    return (
        <AnimatePresence>
            {prediction !== null && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="mt-6 w-full max-w-md mx-auto bg-white bg-opacity-90 rounded-xl shadow-lg p-4 flex flex-col items-center space-y-4"
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        {isPneumonia ? (
                            <AlertCircle className="text-red-600 w-10 h-10" />
                        ) : (
                            <CheckCircle className="text-green-600 w-10 h-10" />
                        )}
                    </motion.div>

                    <p
                        className={`text-xl font-bold text-center ${
                            isPneumonia ? "text-red-600" : "text-green-600"
                        }`}
                    >
                        {label}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PredictionResult;
