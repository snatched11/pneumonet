const HeroSection = () => {
    return (
        <div className="text-center mt-2 text-white px-4 ">
            <h2 className="text-4xl sm:text-6xl font-bold drop-shadow-lg">
                <span className="text-black bg-clip-text ">
                    Detect Pneumonia
                </span>{" "}
                <span className="text-black bg-clip-text ">
                    from Chest X-rays
                </span>
            </h2>
            <p className="mt-7 text-black text-xl font-bold max-w-xl mx-auto ">
                Upload your X-ray and let our AI predict whether <br /> it's
                normal or pneumonia.
            </p>
        </div>
    );
};

export default HeroSection;
