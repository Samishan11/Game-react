import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { toast } from 'react-toastify'
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.client.init({
                clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                plugin_name: "chat",
            });
        });
    }, []);

    const responseErrorGoogle = (result) => {
        console.log("this is error message", result);
    };

    const responseSuccessGoogle = (googleData) => {
        console.log(googleData);
        // you can see the available data on console
        const userData = {
            googleData: googleData.profileObj.googleId,
            firstname: googleData.profileObj.givenName,
            lastname: googleData.profileObj.familyName,
            email: googleData.profileObj.email,
            isVerifed: true
        };

        axios.post("http://localhost:5000/api/google-signin", userData).then((result) => {
            localStorage.setItem("token", result.data.accessToken)
            console.log(console.log(result.data.isVerified))

            if (result.data.isAdmin !== true && result.data.message === 'Login succesfully.') {
                toast.success("Login Sucessfully", { position: toast.POSITION.TOP_RIGHT })
                window.location = "/"
            } else if (result.data.isAdmin === true && result.data.message === 'Login succesfully.') {
                toast.success("Login Sucessfully", { position: toast.POSITION.TOP_RIGHT })
                window.location = "/admin-dashboard"
            } else {
                toast.error("Something wrong.");
            }

        }).catch(e => {
            toast.error("Something wrong");
        });
    };

    const loginUser = async (e) => {
        try {
            e.preventDefault();
            if (!formData.email || !formData.password) {
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    toast.error('Enter email and password', { position: toast.POSITION.TOP_RIGHT })
                }, 2000)
            } else {

                setLoading(true)
                const res = await axios.post('http://localhost:5000/api/login', formData)
                if (res.data) {
                    localStorage.setItem("token", res.data.accessToken)
                    console.log(res.data)
                    setTimeout(() => {
                        setLoading(false)
                        if (!res.data.isVerified) {
                            axios.post('http://localhost:5000/api/verify-link', {
                                email: formData.email
                            }).then(res => {
                                toast.success("A link has been send to your email please verify!!");
                            }).catch(e => {
                                toast.error("something went wrong");
                            })
                        } else {
                            if (res.data.isAdmin !== true && res.data.message === 'Login succesfully.') {
                                toast.success("Login Sucessfully", { position: toast.POSITION.TOP_RIGHT })
                                window.location = "/"
                            } else if (res.data.isAdmin === true && res.data.message === 'Login succesfully.') {
                                toast.success("Login Sucessfully", { position: toast.POSITION.TOP_RIGHT })
                                window.location = "/admin-dashboard"
                            }
                        }
                    }, 2000)
                }
            }
        } catch (error) {
            if (error.response.status === 401) {
                setTimeout(() => {
                    setLoading(false)
                    toast.error('email or password not match', { position: toast.POSITION.TOP_RIGHT })
                }, 2000)
            }

        }

    }

    return (
        <div className="container col-md-10 mx-auto">
            <div className="box py-3 px-5 col-md-4 mx-auto my-4 rounded shadow">
                <div>
                    <h5 className="fw-bold mb-2 text-center text-uppercase">Login into your account</h5>
                    <form>
                        <div className="form-group my-4">
                            <label
                                className="fw-bold"
                                htmlFor=""
                                style={{ fontSize: "0.8em" }}
                            >
                                Email
                            </label>
                            <div>
                                <input
                                    name='email'
                                    onChange={e => onInputChange(e)}
                                    className="form-control"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="form-group my-4">
                            <label
                                className="fw-bold"
                                htmlFor=""
                                style={{ fontSize: "0.8em" }}
                            >
                                Password
                            </label>
                            <div>
                                <input
                                    name='password'
                                    onChange={e => onInputChange(e)}
                                    className="form-control"
                                    type="password"
                                />
                            </div>

                            <div className="d-flex">
                                <Link to={`/forgot-password`} className="nav-link m-0 px-0 text-sm">Forgot Password?</Link>
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={loginUser}
                                className="btn btn-outline-primary w-100"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    {
                        loading && <div className='loadingDiv mt-4'>
                            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                        </div>
                    }

                    <div className="d-flex mt-4">
                        <hr className="container" />
                        <small className=" mx-2 mt-1">
                            <small className=''>or</small>
                        </small>
                        <hr className="container" />
                    </div>
                    <div className="d-flex justify-content-center text-center pt-1 my-3">
                        <div className="" id="google-login">
                            <GoogleLogin
                                className="mb-3 p-0 border shadow-sm text-center w-100 text-sm"
                                clientId="470860521011-6lqumeljssnl4m1t5sojfmodo70fv9bc.apps.googleusercontent.com"
                                // buttonText="Login with Google"
                                onSuccess={responseSuccessGoogle}
                                onFailure={responseErrorGoogle}
                                cookiePolicy={"single_host_origin"}
                                style={{ padding: "0px", margin: "0px" }}
                            >
                                {/* <span className="text-white fw-bold"> Login with Google</span> */}
                            </GoogleLogin>
                        </div>
                    </div>
                    <div>
                        <p className="mb-0">Don't have an account?
                            <Link to="/register" className="text-primary-50 fw-bold"> Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;