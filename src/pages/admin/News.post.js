import axios from 'axios';
import React, { useState, useContext } from 'react'
import { toast } from 'react-toastify';
import Loading from '../../components/animation/Loading';
import { NewsContext } from '../../context/newsContext';
const Newspost = () => {

    const [news] = useContext(NewsContext);

    const [formdata, setFormdata] = useState({
        title: '',
        image: '',
        description: ''
    })
    const [image, setImage] = useState('')


    const onInputChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value || e.target.files[0] });
    };

    const [loading, setLoading] = useState(false)

    const [newsdata, setNewsData] = useState({})

    const getTeamDataonclick = (i) => {
        const res = news[i];
        setNewsData(res);
        setFormdata({
            title: res.title,
            image: res.image,
            description: res.description
        })
    };


    const addNews = async (e) => {
        e.preventDefault()
        const fd = new FormData();
        fd.append("title", formdata.title)
        fd.append("description", formdata.description)
        fd.append("image", image)
        try {
            if (!formdata.title || !formdata.description || !image) {
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    toast.error('Please fill all fields!!!', { position: toast.POSITION.TOP_RIGHT })
                }, 2000)
            } else {
                const res = await axios.post('http://localhost:5000/api/post/news', fd)
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    toast.success('News Created Sucessfully', { position: toast.POSITION.TOP_RIGHT })
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

    const updateNews = async (e) => {
        e.preventDefault();
        try {
            const fd = new FormData();
            fd.append("title", formdata.title)
            fd.append("description", formdata.description)
            fd.append("image", image)
            const res = await axios.put(`http://localhost:5000/api/update-news/${newsdata._id}`, fd)
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                toast.success('News Update Sucessfully', { position: toast.POSITION.TOP_RIGHT })
            }, 2000)
        } catch (error) {
            setTimeout(() => {
                setLoading(false)
                toast.error('Something went wrong', { position: toast.POSITION.TOP_RIGHT })
            }, 2000)
        }
    }

    const deleteNews = async (id) => {
        try {
            const fd = new FormData();
            fd.append("title", formdata.title)
            fd.append("description", formdata.description)
            fd.append("image", image)
            const res = await axios.delete(`http://localhost:5000/api/delete-news/${id}`)
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                toast.success('News deleted Sucessfully', { position: toast.POSITION.TOP_RIGHT })
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
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-outline-dark my-4'>Chick here to Add News</button>
                    <h3 className="fs-4 mb-3">Recent News</h3>
                    <table className="table bg-white rounded shadow-sm  table-hover">
                        <thead>
                            <tr>
                                <th scope="col" width={50}>#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Image</th>
                                <th scope="col">Description</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            { news?.length > 0 ?
                                news?.map((data, ind) => {
                                    return (
                                        <tr key={ind + 1}>
                                            <th scope="row">{1}</th>
                                            <td>{data?.title}</td>
                                            <td>
                                                <img width={100} src={`http://localhost:5000/${data?.image}`}></img>
                                            </td>
                                            <td>{data?.description.slice(0, 50)}</td>
                                            <td><i data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => getTeamDataonclick(ind)} className='fas btn fa-pen text-success'></i></td>
                                            <td><i onClick={() => deleteNews(data?._id)} className='fas btn fa-trash text-danger'></i></td>
                                        </tr>
                                    )
                                })
                                :
                               <Loading />
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
                            <h1 className="modal-title" id="exampleModalLabel">Add News</h1>
                            <button type="button" className="btn-close text-danger fas fa-times" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <form id='contact-form' onSubmit={addNews} style={{ fontSize: '1rem' }} className="container validate-form">
                            <div className="modal-body">
                                <div className='container  pb-5'>
                                    <div className="container bg-white d-block mx-auto">
                                        <div className="row">
                                            <div className="col-12 col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Title</label>
                                                    <input onChange={e => onInputChange(e)} name='title' type="text" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter teamname" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group my-3">
                                            <label htmlFor="exampleInputEmail1">Image*</label>
                                            <input name='image' onChange={e => setImage(e.target.files[0])} type="file" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Team1 image" />
                                        </div>
                                        <div className="form-group my-3">
                                            <label htmlFor="exampleInputEmail1">Description*</label>
                                            <textarea onChange={e => onInputChange(e)} name='description' className="form-control input100"></textarea>
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
                        <form id='contact-form' onSubmit={updateNews} style={{ fontSize: '1rem' }} className="container validate-form">
                            <div className="modal-body">
                                <div className='container  pb-5'>
                                    <div className="container bg-white d-block mx-auto">
                                        <div className="row">
                                            <div className="col-12 col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Title</label>
                                                    <input value={formdata.title} onChange={e => onInputChange(e)} name='title' type="text" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter teamname" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group my-3">
                                            <label htmlFor="exampleInputEmail1">Team Image*</label>
                                            <input name='image' onChange={e => setImage(e.target.files[0])} type="file" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Team1 image" />
                                        </div>

                                        <div className="form-group my-3">
                                            <label htmlFor="exampleInputEmail1">Description*</label>
                                            <textarea value={formdata.description} onChange={e => onInputChange(e)} name='description' className="form-control input100"></textarea>
                                        </div>
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

export default Newspost;