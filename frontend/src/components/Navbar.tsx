import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="main-nav">
      <Link to="/">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link to="/" className="main-nav-item">
          <i className="fa fa-user-circle"></i> Sign In
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
