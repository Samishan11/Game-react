import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import Loading from "../../components/animation/Loading";
import { TeamContext } from '../../context/teamContext';
const Addteam = () => {
    const [formdata, setFormdata] = useState({
        team: '',
        image: '',
        catagory: '',
        isVerified: false
    })
    const [image, setImage] = useState('')

    const [team] = useContext(TeamContext)

    const onInputChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value || e.target.files[0] });
        console.log(formdata)
    };

    const [loading, setLoading] = useState(false)

    const addTeam = async (e) => {
        e.preventDefault()
        const fd = new FormData();
        fd.append("team", formdata.team)
        fd.append("catagory", formdata.catagory)
        fd.append("image", image)
        try {
            if (!formdata.team || !formdata.catagory || !image) {
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    toast.error('Please fill all fields!!!', { position: toast.POSITION.TOP_RIGHT })
                }, 2000)
            } else {
                const res = await axios.post('http://localhost:5000/api/post-team', fd)
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    toast.success('Team Created Sucessfully', { position: toast.POSITION.TOP_RIGHT })
                }, 2000)
            }
        } catch (error) {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                toast.error('Something went wrong', { position: toast.POSITION.TOP_RIGHT })
            }, 2000)
        }
    }
    const [teamdata, setTeamData] = useState({})

    const getTeamDataonclick = (i) => {
        const res = team[i];
        console.log(res)
        setTeamData(res);
        setFormdata({
            team: res.team,
            image: res.image,
            catagory: res.catagory,
            isVerified: res.isVerified
        })
    };


    const [modelclose, setModelClose] = useState(false)

    const updateTeam = async (e) => {
        e.preventDefault()
        try {
            const _res = await axios.put(`http://localhost:5000/api/update-team/${teamdata._id}`, formdata)
            toast.success('Team Updated', { position: toast.POSITION.TOP_RIGHT })
        } catch (error) {
            toast.error('Something went wrong', { position: toast.POSITION.TOP_RIGHT })
        }
    }
    const deleteTeam = async (id) => {
        try {
            const _res = await axios.delete(`http://localhost:5000/api/delete-team/${id}`)
            toast.success('Team Deleted', { position: toast.POSITION.TOP_RIGHT })
        } catch (error) {

            toast.error('Something went wrong', { position: toast.POSITION.TOP_RIGHT })
        }
    }

    return (
        <div className="container-fluid px-4">
            <div className="row my-5">

                <div className="col">
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-outline-dark my-4'>Chick here to add Team</button>
                    <h3 className="fs-4 mb-3">Recent Teams</h3>
                    <table className="table bg-white rounded shadow-sm  table-hover">
                        <thead>
                            <tr>
                                <th scope="col" width={50}>#</th>
                                <th scope="col">Team Name</th>
                                <th scope="col">Team image</th>
                                <th scope="col">Team Catagory</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                team?.map((data, ind) => {
                                    return (
                                        <tr key={ind + 1}>
                                            <th scope="row">{1}</th>
                                            <td>{data?.team}</td>
                                            <td>
                                                <img width={100} src={`http://localhost:5000/${data?.image}`}></img>
                                            </td>
                                            <td>{data?.catagory}</td>
                                            <td><i data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => getTeamDataonclick(ind)} className='fas btn fa-pen text-success'></i></td>
                                            <td><i onClick={() => deleteTeam(data?._id)} className='fas btn fa-trash text-danger'></i></td>
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
                            <h1 className="modal-title" id="exampleModalLabel">Add Team</h1>
                            <button type="button" className="btn-close text-danger fas fa-times" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <form id='contact-form' onSubmit={addTeam} style={{ fontSize: '1rem' }} className="container validate-form">
                            <div className="modal-body">
                                <div className='container  pb-5'>
                                    <div className="container bg-white d-block mx-auto">
                                        <div className="row">
                                            <div className="col-12 col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Team Name</label>
                                                    <input onChange={e => onInputChange(e)} name='team' type="text" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter teamname" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group my-3">
                                            <label htmlFor="exampleInputEmail1">catagory*</label>
                                            <select name='catagory' onChange={e => onInputChange(e)} class="form-select form-control input100" aria-label="Default select example">
                                                <option selected>Open this select menu</option>
                                                <option value="football">Football</option>
                                                <option value="cricket">Cricket</option>
                                                <option value="tabletennis">Table Tennis</option>
                                                <option value="footsal">Footsal</option>
                                                <option value="vollyball">Vollyball</option>
                                            </select>
                                        </div>
                                        <div className="form-group my-3">
                                            <label htmlFor="exampleInputEmail1">Team Image*</label>
                                            <input name='image' onChange={e => setImage(e.target.files[0])} type="file" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Team1 image" />
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
            {/* update */}
            <div className="modal fade" id="exampleModal1" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title" id="exampleModalLabel">Add Team</h1>
                            <button type="button" className="btn-close text-danger fas fa-times" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <form id='contact-form' onSubmit={updateTeam} style={{ fontSize: '1rem' }} className="container validate-form">
                            <div className="modal-body">
                                <div className='container  pb-5'>
                                    <div className="container bg-white d-block mx-auto">
                                        <div className="row">
                                            <div className="col-12 col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Team Name</label>
                                                    <input value={formdata.team} onChange={e => onInputChange(e)} name='team' type="text" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter teamname" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group my-3">
                                            <label htmlFor="exampleInputEmail1">catagory*</label>
                                            <select name='catagory' onChange={e => onInputChange(e)} class="form-select form-control input100" aria-label="Default select example">
                                                <option value={formdata.catagory} selected>{formdata.catagory}</option>
                                                <option value="football">Football</option>
                                                <option value="cricket">Cricket</option>
                                                <option value="tabletennis">Table Tennis</option>
                                                <option value="footsal">Footsal</option>
                                                <option value="vollyball">Vollyball</option>
                                            </select>
                                        </div>
                                        <div className="form-group my-3">
                                            <label htmlFor="exampleInputEmail1">Team Image*</label>
                                            <input name='image' onChange={e => setImage(e.target.files[0])} type="file" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Team1 image" />
                                        </div>
                                    </div>
                                    <div className="form-group my-3">
                                        <label htmlFor="exampleInputEmail1">Verify</label>
                                        <select name='isVerified' onChange={e => onInputChange(e)} class="form-select form-control input100" aria-label="Default select example">
                                            <option selected>{teamdata.isVerified ? "True" : "False"}</option>
                                            {
                                                !teamdata?.isVerified ? <option value={false}>True</option>
                                                    :
                                                    <option value={true}>False</option>
                                            }
                                        </select>
                                    </div>
                                    {
                                        loading && <Loading />
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                                <button type="sumbit" className="btn btn-outline-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addteam