// components/AlertToast.jsx
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const AlertToast = ({ message, show, onClose }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed top-36 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md"
                    initial={{ opacity: 0, y: -30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                    <div className="flex items-start gap-4 bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded-lg shadow-xl">
                        <div className="pt-1">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm sm:text-base font-semibold">
                                {message}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-red-600 text-xl font-bold hover:text-red-800 transition"
                        >
                            ×
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AlertToast;
