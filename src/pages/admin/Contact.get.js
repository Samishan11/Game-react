import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import Loading from '../../components/animation/Loading';
const Contactget = () => {

    // const [news] = useContext(NewsContext);
    const [loading, setLoading] = useState(false)

    const [contact, setContact] = useState([])
    const getContact = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/contact`);
            setContact(res.data)
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                // toast.success('News deleted Sucessfully', { position: toast.POSITION.TOP_RIGHT })
            }, 2000)
        } catch (error) {
            setTimeout(() => {
                setLoading(false)
                // toast.error('Something went wrong', { position: toast.POSITION.TOP_RIGHT })
            }, 2000)
        }
    };
    const deleteFeedback = async (id) => {
        try {
            const res = await axios.delete('http://localhost:5000/api/delete-contact/' + id)
            toast.success("Contact has been posted")
        } catch (error) {
            toast.error("Someting went wrong")
        }
    };

    useEffect(() => {
        getContact()
    }, [])

    return (
        <div className="container-fluid px-4">
            <div className="row my-5">
                <div className="col">
                    <h3 className="fs-4 mb-3">Recent Contact</h3>
                    <table className="table bg-white rounded shadow-sm  table-hover">
                        <thead>
                            <tr>
                                <th scope="col" width={50}>#</th>
                                <th scope="col">Fullname</th>
                                <th scope="col">Email</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contact?.length > 0 ?
                                contact?.map((data, ind) => {
                                    return (
                                        <tr key={ind + 1}>
                                            <th scope="row">{1}</th>
                                            <td>{data?.fullname}</td>
                                            <td>{data?.email}</td>
                                            <td>{data?.contact.slice(0, 50)}</td>
                                            <td><i onClick={() => deleteFeedback(data?._id)} className='fas btn fa-trash text-danger'></i></td>
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
        </div>
    )
}

export default Contactget;