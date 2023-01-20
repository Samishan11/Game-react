import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { toast } from 'react-toastify';


const Register = () => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        checkpassword: ""
    })

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [loading, setLoading] = useState(false)



    const registerUser = async (e) => {
        try {
            e.preventDefault();
            setLoading(true)
            if (!formData.email || !formData.password || !formData.username || !formData.checkpassword) {
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
                toast.warning('Please all the fields!!', { position: toast.POSITION.TOP_RIGHT })
            }
            else if (formData.password.length < 6) {
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
                toast.warning('Password must be more than 6 character!!', { position: toast.POSITION.TOP_RIGHT })
            }
            else if (formData.password !== formData.checkpassword) {
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
                toast.warning('Password not match!!', { position: toast.POSITION.TOP_RIGHT })
            }
            else {
                const res = await axios.post('http://localhost:5000/api/register', formData)
                console.log('check')
                console.log(res.status)
                if (res.data) {
                    setTimeout(() => {
                        setLoading(false)
                    }, 2000)
                    toast.success('User Register Sucessfully', { position: toast.POSITION.TOP_RIGHT })
                    window.location = "/login"
                }
            }
        } catch (error) {
            if (error.response.status === 406) {
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
                toast.error('User already exists !!', { position: toast.POSITION.TOP_RIGHT })
            }
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }
    }

    return (
        // <section className="vh-100 gradient-custom">
        //     <div className="container h-100">
        //         <div className="row d-flex justify-content-center align-items-center h-100">
        //             <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        //                 <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
        //                     <div className="card-body text-center">
        //                         <form onSubmit={registerUser}>
        //                             <div className="md-5 mt-md-4">
        //                                 <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
        //                                 <p className="text-white-50 mb-5">Please fill the form to register!</p>
        //                                 <div className="form-outline form-white mb-4">
        //                                     <input onChange={(e) => onInputChange(e)} name="username" type="text" id="username" className="form-control form-control-lg" />
        //                                     <label className="form-label" htmlFor="typeEmailX">Username</label>
        //                                 </div>
        //                                 <div className="form-outline form-white mb-4">
        //                                     <input onChange={(e) => onInputChange(e)} name='email' type="email" id="email" className="form-control form-control-lg" />
        //                                     <label className="form-label" htmlFor="typeEmailX">Email</label>
        //                                 </div>
        //                                 <div className="form-outline form-white mb-4">
        //                                     <input onChange={(e) => onInputChange(e)} name="password" type="password" id="password" className="form-control form-control-lg" />
        //                                     <label className="form-label" htmlFor="typePasswordX">Password</label>
        //                                 </div>
        //                                 <div className="form-outline form-white mb-4">
        //                                     <input onChange={(e) => onInputChange(e)} name="checkpassword" type="password" id="checkpassword" className="form-control form-control-lg" />
        //                                     <label className="form-label" htmlFor="typePasswordX">Confirm Password</label>
        //                                 </div>
        //                                 <button className="btn btn-outline-light btn-lg mb-5 px-5" type="submit">Register</button>
        //                             </div>
        //                         </form>
        //                         {
        //                             loading && <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        //                         }
        //                         <div>
        //                             <p className="mb-0">Already have an account?
        //                                 <Link to="/login" className="text-white-50 fw-bold"> Sign In</Link>
        //                             </p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>
        <div className="container col-md-10 mx-auto">
            <div className="box py-3 px-5 col-md-4 mx-auto my-4 rounded shadow">
                <div>
                    <h5 className="fw-bold mb-2 text-center text-uppercase">Register your account</h5>
                    <form>
                        <div className="form-group my-4">
                            <label
                                className="fw-bold"
                                htmlFor=""
                                style={{ fontSize: "0.8em" }}
                            >
                                username
                            </label>
                            <div>
                                <input
                                    name='username'
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
                        </div>
                        <div className="form-group my-4">
                            <label
                                className="fw-bold"
                                htmlFor=""
                                style={{ fontSize: "0.8em" }}
                            >
                                Confirm Password
                            </label>
                            <div>
                                <input
                                    name='checkpassword'
                                    onChange={e => onInputChange(e)}
                                    className="form-control"
                                    type="password"
                                />
                            </div>


                            <div className="d-flex">
                                <Link to={`/reset-password-link`} className="nav-link m-0 px-0 text-sm">Forgot Password?</Link>
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={registerUser}
                                className="btn btn-outline-primary w-100"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    {
                        loading && <div className='loadingDiv mt-4'>
                            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                        </div>
                    }

                    <div>
                        <p className="my-4">Already have an account?
                            <Link to="/login" className="text-primary-50 fw-bold"> Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Register;