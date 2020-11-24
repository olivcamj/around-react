import logo from "../images/logo.svg";
function Header() {
    return (
        <header className="header section">
                <img src={logo} alt="Around the U.S." className="header__logo" />
        </header>
    )
}


export  default Header;