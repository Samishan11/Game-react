import React, { useContext } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { SportContext } from "../../context/sportContext";
import { UserContext } from '../../context/userContext';
import { TeamContext } from '../../context/teamContext';

const Dashboardcontent = () => {
    const [sport] = useContext(SportContext);
    const [user] = useContext(UserContext);
    const [team] = useContext(TeamContext);
    return (
        <div className="container-fluid px-4">
            <div className="row g-3 my-2">
                <div className="col-md-3">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className="fs-2">{team?.length}</h3>
                            <p className="fs-5">Teams</p>
                        </div>
                        <i class="bi bi-people-fill primary-text border rounded-full h1 secondary-bg p-3"></i>
                        {/* <i className="fas fa-gift fs-1 primary-text border rounded-full secondary-bg p-3" /> */}
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className="fs-2">{user ? user?.length : 0}</h3>
                            <p className="fs-5">Users</p>
                        </div>
                        <i className="fas fa-user fs-1 primary-text border rounded-full secondary-bg p-3" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className="fs-2">{parseInt(sport?.length + 4 )}</h3>
                            <p className="fs-5">News</p>
                        </div>
                        <i class="fas fa-newspaper fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                        {/* <i className="fas fa-chart-line fs-1 primary-text border rounded-full secondary-bg p-3" /> */}
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className="fs-2">{sport?.length}</h3>
                            <p className="fs-5">Sports</p>
                        </div>
                        <i className="fas fa-chart-line fs-1 primary-text border rounded-full secondary-bg p-3" />
                    </div>
                </div>
            </div>
            <div className="row my-5">
                <h3 className="fs-4 mb-3">Recent Games</h3>
                <div className="col">
                    <table className="table bg-white rounded shadow-sm  table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Event Name</th>
                                <th scope="col">Team1 Name</th>
                                <th scope="col">Team2 Name</th>
                                <th scope="col">Team1 image</th>
                                <th scope="col">Team2 image</th>
                                <th scope="col">Catagory</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sport?.map((data, ind) => {
                                return (
                                    <tr key={ind + 1}>
                                        <td>{data.eventName}</td>
                                        <td>{data.team1}</td>
                                        <td>{data.team2}</td>
                                        <td>
                                            <img
                                                width={100}
                                                src={`http://localhost:5000/${data.team1Image}`}
                                            ></img>
                                        </td>
                                        <td>
                                            <img
                                                width={100}
                                                src={`http://localhost:5000/${data.team2Image}`}
                                            ></img>
                                        </td>
                                        <td>{data?.catagory}</td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboardcontent;