import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/animation/Loading';
import Navbar from '../../components/navbar/Navbar';
import Countdown from 'react-countdown';
import Moment from 'react-moment';

const Detail = () => {

    const locataion = useLocation();
    const data = locataion.state.data;
    const ddata = data;

    const [loading, setLoading] = useState(false);

    const [formdata, setFormdata] = useState({
        team: "",
        role: ""
    });

    const onInputChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    const token = localStorage.getItem('token')
    const user = parseJwt(token);
    // console.log(data?.participations)

    const [hide, setHide] = useState(false)
    const filterParticipation = data?.participations?.find(data => {
        if (data?.participation?.user === user?.data?.username) {
            if (!hide) {
                setHide(true)
            }
            return data;
        }
    })

    const Updatesport = async (e) => {
        e.preventDefault();

        try {
            const _res = await axios.put(
                `http://localhost:5000/api/update-sport/${data._id}`, {
                team: formdata.team,
                role: formdata.role,
                user: user?.data?.username
            });
            setLoading(true);
            setTimeout(() => {
                if (!hide) {
                    setHide(true)
                }
                setLoading(false);
                toast.success("Team Created Sucessfully", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }, 2000);
        } catch (error) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                toast.error("Something went wrong", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }, 2000);
        }
    };


    // filter user by teams 
    const filterParticipateTeam1 = data?.participations?.filter(res => {
        if (res?.participation?.team === data.team1) {
            return res;
        }
    });
    const filterParticipateTeam2 = data?.participations?.filter(res => {
        if (res?.participation?.team === data.team2) {
            return res;
        }
    });

    // 


    return (
        <>
            <Navbar />
            <div className="container col-lg-11" style={{ marginTop: "100px" }}>
                <div className="d-flex justify-content-end align-items-center mb-2">
                    {
                        data?.result?.length === 0 && localStorage.getItem("token") && !filterParticipation ?
                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-outline-dark my-2 px-3'>Participant</button> :
                            hide ?
                                <button data-bs-target="#exampleModal" className='btn btn-outline-warning my-2 px-3'>Alreay Participated</button> : null
                    }
                </div>
                {/*  */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title" id="exampleModalLabel">Add Participant</h3>
                                <button type="button" className="btn-close text-danger fas fa-times" data-bs-dismiss="modal" aria-label="Close" ></button>
                            </div>
                            <form onSubmit={Updatesport} id='contact-form' style={{ fontSize: '1rem' }} className="container validate-form">
                                <div className="modal-body">
                                    <div className='container pb-5'>
                                        <div className="container bg-white d-block mx-auto">
                                            <div className="row mb-3">
                                                <div className="col-12 col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1" className='mb-2 h5'>Select your team</label>
                                                        <div className="d-flex justify-content-start align-items-center">
                                                            <div class="form-check me-5">
                                                                <input class="form-check-input me-2" type="checkbox" name='team' onChange={e => onInputChange(e)} value={data.team1} id="team1" />
                                                                <label class="form-check-label mt-1" for="team1">
                                                                    {data.team1}
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input class="form-check-input me-2" type="checkbox" name='team' onChange={e => onInputChange(e)} value={data.team2} id="tean2" />
                                                                <label class="form-check-label mt-1" for="tean2">
                                                                    {data.team2}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1" className='mb-1'>Role</label>
                                                        <input onChange={e => onInputChange(e)} name='role' type="text" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter user role" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    loading &&
                                    <Loading />
                                }
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                                    <button type="sumbit" className="btn btn-outline-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="row">
                    <div className="bg-light col-12 p-0">
                        <div className="title_box py-2 green-bg px-3 mb-3">
                            <h6 className="text-light text-xl mb-0 text-uppercase">{data?.team1} VS {data?.team2}</h6>
                        </div>
                        <div className="match_details_section p-3 mb-2">
                            <div className="match_details mb-3">
                                <div className="team1">
                                    <h4 className="text-dark text-uppercase me-4 fw-bold">{data?.team1}</h4>
                                    <img
                                        src={`http://localhost:5000/${data.team1Image}`}
                                        style={{
                                            objectFit: "cover",
                                            width: "200px",
                                            height: "200px",
                                        }} />
                                </div>
                                <div className="vs_box mx-lg-5 mx-3">
                                    <h6 className="text-dark text-uppercase h1 ls-sm"><Countdown date={Date.now() + Math.floor(new Date(data?.eventStartDate)?.getTime() / 100000)} /></h6>
                                </div>
                                <div className="team2">
                                    <img
                                        className='me-4'
                                        src={`http://localhost:5000/${data.team2Image}`}
                                        style={{
                                            objectFit: "cover",
                                            width: "200px",
                                            height: "200px",
                                        }} />
                                    <h4 className="text-dark text-uppercase fw-bold">{data?.team2}</h4>
                                </div>
                            </div>
                            <div className="venue_time_section">
                                <i class="fas fa-location-circle me-2"></i>
                                <h6 className="text-dark text-sm mb-0">{data.eventPlace}</h6>
                            </div>
                        </div>
                        <hr className='mb-4' />
                        {
                            data?.participations?.length > 0 &&
                            <>
                                <div className="title_box py-1 border_left px-3 mb-4 mx-3">
                                    <h6 className="text-dark text-l mb-0 text-uppercase">Participants</h6>
                                </div>
                                <div className="table-responsive mx-3 mb-4">
                                    <table class="table table-bordered mb-0">
                                        <thead className='text-dark'>
                                            <tr>
                                                <th scope="col">
                                                    <div class="py-2 px-3 text-uppercase text-sm fw-bold">Player Name</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-light mb-0'>
                                            {
                                                filterParticipateTeam1?.map((data, ind) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td class="align-middle d-inline">
                                                                    <div class="py-1 px-3  text-sm fw-bold">{data?.participation?.user}
                                                                        <img width={50} src={`http://localhost:5000/${ddata?.team1Image}`} className='mx-3' />
                                                                        <span>-{data?.participation?.role}</span>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                        </>
                                                    )
                                                })
                                            }
                                            {
                                                filterParticipateTeam2?.map((data, ind) => {
                                                    return (
                                                        <tr>
                                                            <td class="align-middle">
                                                                <div class="py-1 px-3 text-sm fw-bold">{data?.participation?.user}
                                                                    <img width={50} src={`http://localhost:5000/${ddata?.team2Image}`} className='mx-3' />
                                                                    <span>-{data?.participation?.role}</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        }
                        {/*  */}
                        {
                            data?.result.length > 0 &&
                            <>
                                <div className="title_box py-1 border_left px-3 mb-4 mx-3">
                                    <h6 className="text-dark text-l mb-0 text-uppercase">Details</h6>
                                </div>
                                <div className="table-responsive mx-3 mb-4">
                                    <table class="table table-bordered mb-0">
                                        <thead className='text-dark'>
                                            <tr>
                                                <th scope="col">
                                                    <div class="py-2 px-3 text-uppercase text-sm fw-bold">Match Date</div>
                                                </th>
                                                <th scope="col">
                                                    <div class="py-2 px-3 text-uppercase text-sm fw-bold">Time</div>
                                                </th>
                                                <th scope="col">
                                                    <div class="py-2 px-3 text-uppercase text-sm fw-bold">League</div>
                                                </th>
                                                <th scope="col">
                                                    <div class="py-2 px-3 text-uppercase text-sm fw-bold">Season</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-light mb-0'>
                                            <tr>
                                                <td class="align-middle">
                                                    <div class="py-1 px-3 text-sm fw-bold">{data.eventPlace}</div>
                                                </td>
                                                <td class="align-middle">
                                                    <div class="py-1 px-3 text-sm fw-bold">{new Date(data.eventStartDate)?.toDateString()}</div>
                                                </td>
                                                <td class="align-middle">
                                                    <div class="py-1 px-3 text-sm fw-bold">{data.eventName}</div>
                                                </td>
                                                <td class="align-middle">
                                                    <div class="py-1 px-3 text-sm fw-bold">2022</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        }
                        <hr className='mb-4' />
                        {
                            data?.result?.length > 0 &&
                            <>
                                <div className="title_box py-1 border_left px-3 mb-4 mx-3">
                                    <h6 className="text-dark text-l mb-0 text-uppercase">Results</h6>
                                </div>
                                <div className="table-responsive mx-3">
                                    <table class="table table-bordered mb-0">
                                        <thead className='text-dark'>
                                            <tr>
                                                <th scope="col">
                                                    <div class="py-2 px-3 text-uppercase text-sm">Team Name</div>
                                                </th>
                                                <th scope="col">
                                                    <div class="py-2 px-3 text-uppercase text-sm">Result</div>
                                                </th>
                                                <th scope="col">
                                                    <div class="py-2 px-3 text-uppercase text-sm">{
                                                        data.catagory === "cricket" ? "Run" : data.catagory === "football" ? "Goal" :
                                                            data.catagory === "basketball" ? "Basket" : data.catagory === "futsal" ? "Goal" :
                                                                data.catagory === "tabletenish" ? "Point" :
                                                                    null
                                                    }</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-light mb-0'>
                                            <tr>
                                                <td class="align-middle">
                                                    <div class="py-1 px-3 text-sm fw-bold">{data.team1}</div>
                                                </td>
                                                <td class="align-middle">
                                                    <div class="py-1 px-3 text-sm fw-bold">{data.finalResult?.team1finalresult?.totalgoal1 > data.finalResult?.team2finalresult?.totalgoal2 ? 'Win' : data.finalResult?.team1finalresult?.totalgoal1 === data.finalResult?.team2finalresult?.totalgoal2 ? "Draw" : 'Loss'}</div>
                                                </td>
                                                <td class="align-middle">
                                                    <div class="py-1 px-3 text-sm fw-bold">{data.finalResult?.team1finalresult?.totalgoal1}</div>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td class="align-middle">
                                                    <div class="py-2 px-3 text-sm fw-bold">{data?.team2}</div>
                                                </td>
                                                <td class="align-middle">
                                                    <div class="py-1 px-3 text-sm fw-bold">{data.finalResult?.team1finalresult?.totalgoal1 < data.finalResult?.team2finalresult?.totalgoal2 ? 'Win' : data.finalResult?.team1finalresult?.totalgoal1 === data.finalResult?.team2finalresult?.totalgoal2 ? "Draw" : 'Loss'}</div>
                                                </td>
                                                <td class="align-middle">
                                                    <div class="py-2 px-3 text-sm fw-bold">{data.finalResult?.team2finalresult?.totalgoal2}</div>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row mx-3">
                                    {/*  */}
                                    <div className="col-lg-6 p-0 my-5">
                                        <div className="p-1">
                                            <div className="title_box py-2 green-bg px-3">
                                                <h6 className="text-light text-xl mb-0 ">{data?.team1}</h6>
                                            </div>
                                            <div className="table-responsive">
                                                <table class="table table-bordered mb-0">
                                                    <thead className='text-dark'>
                                                        <tr>
                                                            <th scope="col">
                                                                <div class="py-1 px-3 text-uppercase text-sm">Time</div>
                                                            </th>
                                                            <th scope="col">
                                                                <div class="py-1 px-3 text-uppercase text-sm">Player Name</div>
                                                            </th>
                                                            <th scope="col">
                                                                <div class="py-1 px-3 text-uppercase text-sm">
                                                                    <div class="py-2 px-3 text-uppercase text-sm">{
                                                                        data.catagory === "cricket" ? "Run" : data.catagory === "football" ? "Goal" :
                                                                            data.catagory === "basketball" ? "Basket" : data.catagory === "futsal" ? "Goal" :
                                                                                data.catagory === "tabletenish" ? "Point" :
                                                                                    null
                                                                    }</div>
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className='bg-light mb-0'>
                                                        {
                                                            data.result?.map((data, ind) => {
                                                                return (
                                                                    <>
                                                                        <tr>
                                                                            <td class="align-start">
                                                                                <div class="py-1 px-3 text-sm fw-bold">{data?.team1result?.time1}</div>
                                                                            </td>
                                                                            <td class="align-start">
                                                                                <div class="py-1 px-3 fw-bold">
                                                                                    <h6 className="text-sm mb-0">{data?.team1result?.user1}</h6>
                                                                                    <small className="text-small fw-normal">Midfielder</small>
                                                                                </div>
                                                                            </td>
                                                                            <td class="align-start">
                                                                                <div class="py-1 px-3 text-sm fw-bold">
                                                                                    <i className="fa fa-futbol-o">{data?.team1result?.goal1}</i>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    {/*  */}
                                    <div className="col-lg-6 p-0 my-5">
                                        <div className="p-1">
                                            <div className="title_box py-2 green-bg px-3">
                                                <h6 className="text-light text-xl mb-0 ">{data?.team2}</h6>
                                            </div>
                                            <div className="table-responsive">
                                                <table class="table table-bordered mb-0">
                                                    <thead className='text-dark'>
                                                        <tr>
                                                            <th scope="col">
                                                                <div class="py-1 px-3 text-uppercase text-sm">Time</div>
                                                            </th>
                                                            <th scope="col">
                                                                <div class="py-1 px-3 text-uppercase text-sm">Player Name</div>
                                                            </th>
                                                            <th scope="col">
                                                                <div class="py-1 px-3 text-uppercase text-sm">
                                                                    <div class="py-2 px-3 text-uppercase text-sm">{
                                                                        data.catagory === "cricket" ? "Run" : data.catagory === "football" ? "Goal" :
                                                                            data.catagory === "basketball" ? "Basket" : data.catagory === "futsal" ? "Goal" :
                                                                                data.catagory === "tabletenish" ? "Point" :
                                                                                    null
                                                                    }</div>
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className='bg-light mb-0'>

                                                        {
                                                            data.result?.map((data, ind) => {
                                                                return (
                                                                    <>
                                                                        <tr>
                                                                            <td class="align-start">
                                                                                <div class="py-1 px-3 text-sm fw-bold">{data?.team2result?.time2}</div>
                                                                            </td>
                                                                            <td class="align-start">
                                                                                <div class="py-1 px-3 fw-bold">
                                                                                    <h6 className="text-sm mb-0">{data?.team2result?.user2}</h6>
                                                                                    <small className="text-small fw-normal">Midfielder</small>
                                                                                </div>
                                                                            </td>
                                                                            <td class="align-start">
                                                                                <div class="py-1 px-3 text-sm fw-bold">
                                                                                    <i className="fa fa-futbol-o">{data?.team2result?.goal2}</i>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                            })
                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    {/*  */}
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Detail;