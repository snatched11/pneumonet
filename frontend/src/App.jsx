import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import UploadCard from "./components/UploadCard";
import Footer from "./components/Footer";
import Snowfall from "./components/3d/Snowfall";
import { motion } from "framer-motion";

const App = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center font-mona"
            style={{ backgroundImage: `url(/background.jpg)` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 z-0" />

            {/* Snow Particles Layer */}
            <Snowfall />

            {/* Page Content */}
            <motion.div
                className="relative z-10 flex flex-col min-h-screen"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            >
                <div className="relative z-10 flex flex-col min-h-screen">
                    <Navbar />
                    {/* Main Section */}
                    <main className="flex-grow flex items-center justify-center px-4 py-12">
                        <div className="bg-gray-300/50 rounded-2xl shadow-2xl w-full max-w-2xl mx-auto p-6 sm:p-10">
                            <HeroSection />
                            <div className="mt-8">
                                <UploadCard />
                            </div>
                        </div>
                    </main>

                    <Footer />
                </div>
            </motion.div>
        </div>
    );
};

export default App;
