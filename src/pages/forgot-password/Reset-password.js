import axios from 'axios';
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
const Resetpassword = () => {
    const tokenn = useParams().token
    const [newpassword, setPassowrd] = useState('');
    const [confirmpassword, setCpassowrd] = useState('');
    const [msg, setmsg] = useState('');
    const resetpassword = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/reset-password/${tokenn}`, {
                newpassword,
                confirmpassword
            }).then(d => {
                setmsg(d.data)
            }).catch(e => {
                console.log(e);
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container login">
            <form onSubmit={resetpassword} className='login-form bg-light py-4'>
                <p>Reset Password</p>
                <div className="form-group my-2">
                    <input onChange={e => setPassowrd(e.target.value)} autoComplete='off' type="password" className="text-center form-control d-block mx-auto input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="new password" />
                </div>
                <div className="form-group my-2">
                    <input onChange={e => setCpassowrd(e.target.value)} autoComplete='off' type="password" className="text-center form-control d-block mx-auto input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="confirm password" />
                </div>
                <Link to={`/forgot-password`} className='d-block mx-5 text-center' style={{ fontSize: '.7rem', cursor: 'pointer' }}>Resend Link?</Link>
                <button className='d-block mt-3 mx-auto btn btn-outline-primary h6 px-5'>send</button>
                <p className='text-center text-success h6'>{msg}</p>
            </form>
        </div>
    )
}

export default Resetpassword;