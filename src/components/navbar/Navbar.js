import React, { useState } from 'react'
import Style from '../../static/css/navbar.module.css'
import { Link } from 'react-router-dom'
import image from '../../assets/icon.jpg';
import { token } from '../../utils/user.token';
const Navbar = () => {
    const [active, setActive] = useState(`${Style.items}`)
    const [toggleIcon, setToggleIcon] = useState(`${Style.hamburger}`)
    const [onhover, setOnhover] = useState(false)

    const hoverShow = () => {
        setOnhover(true)
    }

    const navToggle = () => {
        active === `${Style.items}`
            ? setActive(`${Style.items} ${Style.activeMenu}`)
            : setActive(`${Style.items}`)

        toggleIcon === `${Style.hamburger}`
            ? setToggleIcon(`${Style.hamburger} ${Style.toggleIcon}`)
            : setToggleIcon(`${Style.hamburger}`)
    }

    return (
        <div className={Style.container}>
            <nav className={Style.navbar}>
                <div className={Style.logoContainer}>
                    <ul>
                        <a href="/">
                            <img className='rounded'
                                src={image}
                                id="logo"
                                width="120px"
                                height="70px"
                            />
                        </a>
                    </ul>
                </div>

                <div className={Style.right}>
                    <ul className={active}>
                        <li className={Style.item}>
                            <Link to="/" onClick={navToggle} smooth={true}>
                                Home
                            </Link>
                        </li>
                        <li className={Style.item}>
                            <Link to="/sport" onClick={navToggle} smooth={true}>
                                Sports
                            </Link>
                        </li>
                        {
                            token &&
                            <li className={Style.item}>
                                <Link to="/history" onClick={navToggle} smooth={true}>
                                    History
                                </Link>
                            </li>
                        }
                        <li className={Style.item}>
                            <Link to="/news" onClick={navToggle} smooth={true}>
                                News
                            </Link>
                        </li>
                        <li className={Style.item}>
                            <Link to="/contact" onClick={navToggle} smooth={true}>
                                Contact
                            </Link>
                        </li>
                        <li className={Style.item}>
                            <Link to="/standing" onClick={navToggle} smooth={true}>
                                Standing
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={`${Style.startProject} ${active}`}>
                    {
                        token ?
                            <>
                            <li className={`me-3 }`}>
                                <Link to='/profile' className='btn btn-outline-dark rounded-cricle d-flex justify-content-center' smooth={true} style={{ 'textDecoration': 'none' , width:'30px', height:'30px' , borderRadius:'50%' }}>
                                    <i className='fas fa-user'></i>
                                </Link>
                            </li>
                            <li className={`me-3 }`}>
                                <button onClick={() => {
                                    localStorage.clear()
                                    window.location = '/'
                                }} className='btn btn-outline-danger' smooth={true} style={{ 'textDecoration': 'none' }}>
                                    Logout
                                </button>
                            </li>
                            </>
                            :
                            <>
                                <li className={`me-3 ${Style.startProjectButtonoutline}`}>
                                    <Link to="/register" className='' onClick={navToggle} smooth={true} style={{ 'textDecoration': 'none', 'color': "#82b440" }}>
                                        Sign Up
                                    </Link>
                                </li>
                                <li className={` ${Style.startProjectButton}`}>
                                    <Link to="/login" className='text-light rounded' onClick={navToggle} smooth={true} style={{ 'textDecoration': 'none' }}>
                                        Sign In
                                    </Link>
                                </li>
                            </>
                    }
                </div>

                <div className={toggleIcon} onClick={navToggle}>
                    <div className={`${Style.hamItem} ${Style.line1}`}></div>
                    <div className={`${Style.hamItem} ${Style.line2}`}></div>
                    <div className={`${Style.hamItem} ${Style.line3}`}></div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar