const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-black-700/10 text-white z-50 shadow-md">
            <div className="max-w-8xl mx-auto px-11 py-4 flex justify-between items-center">
                <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
                    PneumoAI
                </h1>
                <div className="space-x-6 hidden md:block">
                    <a href="" className="hover:text-gray-300 font-mona">
                        Documentation
                    </a>
                    <a href="#" className="hover:text-gray-300 font-mona">
                        Source Code
                    </a>
                    <a
                        href="https://github.com/snatched11/"
                        className="hover:text-gray-300 font-mona"
                    >
                        Portfolio
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
