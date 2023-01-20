import React from 'react'
import Style from "../../static/css/footer.module.css";
import img from "../../assets/icon.jpg"
const Footer = () => {
    return (
        <div className={`footer-section ${Style.footerContainer}`}>
            <div class="footer-top">
                <div class="container-xl container-lg-fluid container">
                    <div class="row justify-content-center gy-5">
                        <div class="col-lg-3 col-md-10 col-sm-6 col-11 order-sm-0 order-1">
                            <div class="footer-about">
                                <div class="footer1-logo">
                                    <p>Since: 2022</p>
                                </div>
                                <svg
                                    xmlns="http:/www.w3.org/2000/svg"
                                    xmlnsXlink="http:/www.w3.org/1999/xlink"
                                    version="1.1"
                                    viewBox="0 0 400 400"
                                >
                                    <defs>
                                        <path
                                            d="M0, 200a200, 200 0 1, 0 400, 0a200, 200 0 1, 0 -400, 0"
                                            id="txt-path"
                                            fill="white"
                                        ></path>
                                    </defs>
                                    <text
                                        fill="#DDDDDD"
                                        font-size="35.5"
                                        font-family="Helvetica Neue"
                                        font-weight="600"
                                    >
                                        <textPath startOffset="0" xlinkHref="#txt-path">
                                            Sport and Game Management
                                        </textPath>
                                    </text>
                                </svg>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-lg-center">
                            <div class="footer-item">
                                <h4>Information</h4>
                                <ul class="link-list">
                                    <li >
                                        <a href="/" id='a'>About System</a>
                                    </li>
                                    <li>
                                        <a href="/contact">Query</a>
                                    </li>
                                    <li>
                                        <a href="/contact">Become Member</a>
                                    </li>
                                    <li>
                                        <a href="/contact">Help &amp; Support</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-lg-center">
                            <div class="footer-item">
                                <h4>Sports</h4>
                                <ul class="link-list">
                                    <li>
                                        <a href="/">Football</a>
                                    </li>
                                    <li>
                                        <a href="/">Cricket</a>
                                    </li>
                                    <li>
                                        <a href="/">Table Tenish</a>
                                    </li>
                                    <li>
                                        <a href="/">Basketball</a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-lg-center">
                            <div class="footer-item">
                                <h4>Reach Us</h4>
                                <ul class="contact-list">
                                    <li>
                                        <div class="icon">
                                            <i class="bi bi-telephone"></i>
                                        </div>
                                        <div class="text">
                                            <a href="tel:+8801761111456">+977 9801234567</a>
                                            <a href="tel:+8801761111457">+977 9801234567</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="icon">
                                            <i class="bi bi-envelope"></i>
                                        </div>
                                        <div class="text">
                                            <a href="/">sportmanagement@gmail.com</a>
                                            <a href="/">
                                                support@example.com
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="icon">
                                            <i class="bi bi-geo-alt"></i>
                                        </div>
                                        <div class="text">
                                            Kathmandu, Nepal
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="row footer-meta">
                        <div class="col-lg-6 d-flex justify-content-lg-start justify-content-center align-items-center mb-lg-0 mb-5">
                            <h4>Stay Connected:</h4>
                            <ul class="footer-social">
                                <li>
                                    <a href="/">
                                        <i class="bx bi-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <i class="bx bi-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <i class="bx bi-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            <div class="container">
                <div class="footer-bottom">
                    <div class="row d-flex justify-content-center align-items-center g-3">
                        <div class="col-lg-6 text-center d-flex justify-content-center justify-content-center text-lg-start text-center px-1">
                            <p className='text-center'>
                                <span className='text-center'>Copyright 2022 all right reserve</span>

                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer