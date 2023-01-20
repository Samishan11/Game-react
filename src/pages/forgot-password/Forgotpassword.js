import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const Forgotpassword = () => {
    const [email, setEmail] = useState('');
    const [msg, setmsg] = useState('');
    const forgotpassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/forgot-password', {
                email
            }).then(d => {
                setmsg(d.data)
                console.log(d);
            }).catch(e => {
                console.log(e);
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="container login">
                <form onClick={forgotpassword} className='login-form bg-light py-4'>
                    <p>Forgot Password</p>
                    <div className="form-group my-2">
                        <input onChange={e => setEmail(e.target.value)}  autoComplete='on' type="email" className="text-center form-control d-block mx-auto input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email" />
                    </div>
                    <Link to={`/forgot-password`} className='d-block mx-5 text-center' style={{ fontSize: '.9rem', cursor: 'pointer' }}>Resend Link?</Link>
                    <button className='d-block mt-3 mx-auto btn btn-outline-primary h6 px-5'>Send</button>
                </form>
            </div>
        </>
    )
}

export default Forgotpassword;