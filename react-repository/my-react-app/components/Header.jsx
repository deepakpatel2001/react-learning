const Header = () => {
    return (
        <header className="header">
            <div className="heading">
                <h2>
                    <a href="./index.html" className="apiHome">
                        Where in the World!
                    </a>
                </h2>
            </div>
            <div className="dark-mode">
                <p>
                    🌒<span className="themeNameChanger">Dark Mode</span>
                </p>
            </div>
        </header>
    );
};

export default Header;
