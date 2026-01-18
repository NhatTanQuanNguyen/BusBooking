import { useEffect, useState } from 'react'
import Logo from '../../public/logo.png'
import "../styles/Header.css"
import { useLocation } from 'react-router-dom'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hidden,setHidden] = useState(false)
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`header-wrapper ${isLoginPage?'header-login-wrapper header-white':''}`}>
      <header
        className={`header d-flex align-items-center justify-content-between
        ${scrolled ? 'header-white' : 'header-transparent'} ${isLoginPage?'header-login':''}`}
      >

        {/* LOGO */}
        <div className = {`d-flex align-items-center gap-2 ${hidden?'hidden':''}`}>
          <img src={Logo} alt="ThanhTanBus" height={70}/>
          <span className="fw-bold fs-5">ThanhTanBus</span>
        </div>

        {/* MENU DESKTOP */}
        <ul className={`nav header-menu ${isLoginPage?'header-login-menu':''}`}>
          <li><a className="nav-link">Home</a></li>
          <li><a className="nav-link">Giới thiệu</a></li>
          <li><a className="nav-link">Bảng giá</a></li>
          <li><a className="nav-link">Tuyển dụng</a></li>
          <li><a className="nav-link">Liên hệ</a></li>
        </ul>

        {/* ACTION DESKTOP */}
        <div className={`header-action ${isLoginPage?'hidden':''}`}>
          <button className={`btn btn-outline-primary`}>Login</button>
          <button className={`btn btn-primary`}>Sign-up</button>
        </div>

        {/* HAMBURGER (MOBILE) */}
        <div className={`header-toggle ${open?'black-color':''} ${scrolled?'toggle-scrolled':''}`} onClick={() => {
          setOpen(!open)
          setHidden(!hidden)
        }}>
          ☰
        </div>

      </header>

      {/* MENU MOBILE */}
      {open && (
        <>
          <div className="mobile-menu">
            <a href='/'>Home</a>
            <a>Giới thiệu</a>
            <a>Bảng giá</a>
            <a>Tuyển dụng</a>
            <a>Liên hệ</a>
            <div className="mobile-action">
              <button className="btn btn-outline-primary"><a href='/login'>Login</a></button>
              <button className="btn btn-primary">Sign-up</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Header
