import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../../components/animation/Loading';
import { useRef } from 'react';

const Manageuser = () => {
    const [user] = useContext(UserContext);
    const ref = useRef(null);

    const [userData, setUserData] = useState({});
    const [click, setClick] = useState(false)

    // checkbox 
    const [isAdmin, setIsAdmin] = useState(false);

    const [formdata, setFormdata] = useState({
        username: "",
        email: "",
        isAdmin: false
    });
    const getUserDataonclick = (i) => {
        const res = user[i];
        setUserData(res);

        setFormdata({
            username: user[i]?.username,
            email: user[i]?.email,
            isAdmin: user[i]?.isAdmin
        });
    }

    const onInputChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };


    const [loading, setLoading] = useState(false);


    // manage user api integrate 
    const manageUsers = async (e) => {
        e.preventDefault()
        const fd = new FormData();
        fd.append("username", formdata.username)
        fd.append("email", formdata.email)
        fd.append("isAdmin", isAdmin)
        try {
            const res = await axios.put(`http://localhost:5000/api/update-user/${userData._id}`, formdata)
            console.log(formdata)
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                toast.success('User Updated Sucessfully', { position: toast.POSITION.TOP_RIGHT })
            }, 2000)
        } catch (error) {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                toast.error('Something went wrong', { position: toast.POSITION.TOP_RIGHT })
            }, 2000)
        }
    }

    const deleteUser = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/delete-user/${id}`);
            setTimeout(() => {
                setLoading(false)
                toast.success('User Deleted Sucessfully', { position: toast.POSITION.TOP_RIGHT })
            }, 2000)

        } catch (error) {
            setTimeout(() => {
                setLoading(false)
                toast.error('Something went wrong', { position: toast.POSITION.TOP_RIGHT })
            }, 2000)
        }
    }

    return (
        <div className="container-fluid px-4">
            <div className="row my-5">
                <div className="col">
                    <h3 className="fs-4 mb-3">Manage Users</h3>
                    <table className="table bg-white rounded shadow-sm  table-hover">
                        <thead>
                            <tr>
                                <th scope="col" width={50}>#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user?.map((data, ind) => {
                                    return (
                                        <tr key={ind + 1}>
                                            <th scope="row">{ind + 1}</th>
                                            <td>{data.username}</td>
                                            <td>{data.email}</td>
                                            <td><i data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => getUserDataonclick(ind)} className='btn fas fa-pen text-success'></i></td>
                                            <td><i onClick={() => deleteUser(data._id)} className='fas btn fa-trash text-danger'></i></td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title" id="exampleModalLabel">Add User</h1>
                            <button type="button" className="btn-close text-danger fas fa-times" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <form id='contact-form' onSubmit={manageUsers} style={{ fontSize: '1rem' }} className="container validate-form">
                            <div className="modal-body">
                                <div className='container  pb-5'>
                                    <div className="container bg-white d-block mx-auto">
                                        <div className="row">
                                            <div className="col-12 col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Username</label>
                                                    <input onChange={e => onInputChange(e)} value={formdata.username} name='username' type="text" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter teamname" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col-12 col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Email</label>
                                                    <input onChange={e => onInputChange(e)} value={formdata.email} name='email' type="email" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter teamname" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group my-3">
                                            <label htmlFor="exampleInputEmail1">Admin</label>
                                            <select name='isAdmin' onChange={e => onInputChange(e)} class="form-select form-control input100" aria-label="Default select example">
                                                <option selected>{userData.isAdmin ? "True" : "False"}</option>
                                                {
                                                    !userData?.isAdmin ? <option value={true}>True</option>
                                                        :
                                                        <option value={false}>False</option>
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    {
                                        loading && <Loading />
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                                <button type="sumbit" className="btn btn-outline-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manageuser;