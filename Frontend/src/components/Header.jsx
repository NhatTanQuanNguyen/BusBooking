import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../public/logo.png";
import "../styles/Header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isBlackHeader = location.pathname !== "/" ;
  const contactLink = "https://www.facebook.com/";

  const [isLogin,setIsLogin] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={`header-wrapper ${isBlackHeader ? "header-login-wrapper header-white" : ""}`}>
      <header
        className={`header d-flex align-items-center justify-content-between
        ${scrolled ? "header-white" : "header-transparent"}
        ${isBlackHeader ? "header-login" : ""}`}
      >
        {/* LOGO */}
        <div className={`d-flex align-items-center gap-2 ${open ? "hidden" : ""}`}>
          <img src={Logo} alt="ThanhTanBus" height={70} />
          <span className="fw-bold fs-5">ThanhTanBus</span>
        </div>

        {/* MENU DESKTOP */}
        <ul className={`nav header-menu ${isBlackHeader ? "header-login-menu" : ""}`}>
          <li><Link className="nav-link" to="/">Home</Link></li>
          <li><Link className="nav-link" to="/about">Giới thiệu</Link></li>
          <li><Link className="nav-link" to="/pricing">Bảng giá</Link></li>
          <li><Link className="nav-link" to="/career">Tuyển dụng</Link></li>
          <li>
            <a
              className="nav-link"
              href={contactLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Liên hệ
            </a>
          </li>
        </ul>

        {/* ACTION DESKTOP */}
        {
          !isLogin && 
            <div className="header-action">
              <button
                className="btn btn-outline-primary"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/register")}
              >
                Sign-up
              </button>
          </div>
        }

        {
          isLogin && 
            <div className="header-action d-flex flex-column align-items-center">
              <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" className="rounded-circle mb-3" style={{ width: "60px", height: "60px" }}
                alt="Avatar" />
          </div>
        }


        {/* HAMBURGER */}
        <div
          className={`header-toggle ${open ? "black-color" : ""} ${scrolled ? "toggle-scrolled" : ""}`}
          onClick={toggleMenu}
        >
          ☰
        </div>
      </header>

      {/* MENU MOBILE */}
      {open && (
        <div className="mobile-menu">
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/about" onClick={toggleMenu}>Giới thiệu</Link>
          <Link to="/pricing" onClick={toggleMenu}>Bảng giá</Link>
          <Link to="/career" onClick={toggleMenu}>Tuyển dụng</Link>
          <a
            href={contactLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Liên hệ
          </a>

          {
            !isLogin && 
              <div className="mobile-action">
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  toggleMenu();
                  navigate("/login");
                }}
              >
                Login
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  toggleMenu();
                  navigate("/register");
                }}
              >
                Sign-up
              </button>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default Header;
