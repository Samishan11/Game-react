import axios from 'axios';
import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import img from '../../assets/section-title-vector.svg';
import { toast } from 'react-toastify';
export const Contact = () => {
    const [formdata, setFormdata] = useState({
        fullname: '',
        email: '',
        contact: ''
    })
    const onInputChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value || e.target.files[0] });
    };
    const postFeedback = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/post-contact', formdata)
            toast.success("Contact has been posted")
        } catch (error) {
            toast.error("Someting went wrong")
        }
    }
  
    return (
        <>
            <Navbar />
            <div className="asking-form-section" style={{ marginTop: "200px" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-9 col-md-10">
                            <div className="asking-form-wrap">
                                <div className="section-title1 my-5 sibling2 d-flex justify-content-center flex-column">
                                    <h2 className='text-center '>Feel Free To Ask</h2>
                                    <img
                                        className='mx-auto'
                                        src={img}
                                        alt="image"
                                    />
                                </div>
                                <form className="style-1">
                                    <div className="row g-5">
                                        <div className="col-md-6">
                                            <div className="form-inner">
                                                <input name='fullname' onChange={e => onInputChange(e)} type="text" placeholder="Full Name" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-inner">
                                                <input name='email' onChange={e => onInputChange(e)} type="email" placeholder="Your E-mail" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-inner">
                                                <textarea
                                                    onChange={e => onInputChange(e)}
                                                    name="contact"
                                                    rows={6}
                                                    placeholder="Write your message here.."
                                                    defaultValue={""} />
                                            </div>
                                        </div>
                                        <div className="col-md-12 text-center">
                                            <div className='discoverButton'>
                                                <button onClick={postFeedback}><label>Submit Now</label></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
