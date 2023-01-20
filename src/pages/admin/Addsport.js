import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import Loading from "../../components/animation/Loading";
import { TeamContext } from "../../context/teamContext";
import { SportContext } from "../../context/sportContext";
import DatePicker from "react-datepicker";
import FormData from "form-data";

import "react-datepicker/dist/react-datepicker.css";
const Addsport = () => {
  const [resultForm, setResult] = useState({
    goal1: "",
    user1: "",
    time1: "",
  });
  const [resultForm1, setResult1] = useState({
    goal2: "",
    user2: "",
    time2: "",
  });

  //
  const [eventStartDate, seteventStartDate] = useState(new Date());
  const [catagory, setCatagory] = useState("");
  const [formdata, setFormdata] = useState({
    eventName: "",
    team1: "",
    team2: "",
    eventPlace: "",
    eventDescription: "",
    eventStartDate: eventStartDate,
    catagory: "",
    // result:[],
    // goal1: resultForm.goal1,
    // team1: resultForm.time1,
    // user1: resultForm.user1,
    // goal2: resultForm1.goal2,
    // team2: resultForm1.time2,
    // user2: resultForm1.user2,
  });

  //

  const [sporrtData, setSportData] = useState({});
  // const [matchdata, setMatchData] = useState();
  const [matchResult, setMatchResult] = useState([]);
  const onInputChange1 = (e) => {
    // setFormdata({
    //   result: setMatchData,
    // });
    setResult({ ...resultForm, [e.target.name]: e.target.value });
    setResult1({ ...resultForm1, [e.target.name]: e.target.value });
    console.log(resultForm)
  };
  const [team] = useContext(TeamContext);
  const [sport] = useContext(SportContext);



  const getSportDataonclick = (i) => {
    const res = sport[i];
    setSportData(res);
    setMatchResult(sport[i]?.result);

    setFormdata({
      eventName: sport[i]?.eventName,
      team1: sport[i]?.team1,
      team2: sport[i]?.team2,
      eventPlace: sport[i]?.eventPlace,
      eventDescription: sport[i]?.eventDescription,
      eventStartDate: eventStartDate,
      catagory: sport[i]?.catagory,
    });
  };

  const onInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  const filterteam = team?.filter((data) => {
    if (data.catagory === catagory) {
      return data;
    } else {
      return null;
    }
  });

  const Addsport = async (e) => {
    e.preventDefault();
    try {
      if (
        !formdata.eventName ||
        !formdata.eventDescription ||
        !formdata.eventPlace ||
        !catagory ||
        !formdata.team1 ||
        !formdata.team2 ||
        !eventStartDate
      ) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          toast.error("Please fill all fields!!!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }, 2000);
      } else {
        const res = await axios.post("http://localhost:5000/api/post-sport", {
          eventStartDate: formdata.eventStartDate,
          result: matchResult,
          eventPlace: formdata.eventPlace,
          eventDescription: formdata.eventDescription,
          eventName: formdata.eventName,
          team1: formdata.team1,
          team2: formdata.team2,
          catagory: catagory,
          isApproved: true
        });
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          toast.success("Team Created Sucessfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }, 2000);
      }
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


  const [isUpdate, setIsUpdate] = useState(false);
  console.log(isUpdate)
  // update sport data
  const Updatesport = async (e) => {
    e.preventDefault();
    console.log(formdata);

    const fd = new FormData();
    // fd.append("eventName", formdata.eventName);
    // fd.append("catagory", formdata.catagory);
    // fd.append("eventDescription", formdata.eventDescription);
    // fd.append("eventStartDate", formdata.eventStartDate);
    // fd.append("eventPlace", formdata.eventPlace);
    // fd.append("goal2", resultForm1.goal2);
    // fd.append("user2", resultForm1.user2);
    // fd.append("time2", resultForm1.time2);
    // fd.append("goal1", resultForm.goal1);
    // fd.append("user1", resultForm.user1);
    // fd.append("time1", resultForm.time1);

    try {
      const _res = await axios.put(
        `http://localhost:5000/api/update-sport/${sporrtData._id}`,
        {
          eventStartDate: formdata.eventStartDate,
          result: matchResult,
          eventPlace: formdata.eventPlace,
          eventDescription: formdata.eventDescription,
          eventName: formdata.eventName,
          team1: formdata.team1,
          team2: formdata.team2,
          catagory: formdata.catagory,
        }
      );

      console.log(_res);
      setLoading(true);
      setTimeout(() => {
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

  const deleteSport = async (id) => {
    try {
      var _res = await axios.delete(`http://localhost:5000/api/deletesport/${id}`)
      if (_res) {
        setTimeout(() => {
          setLoading(false);
          toast.success("Sport Deleted Sucessfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }, 2000);
      }
    } catch (error) {
      if (error) {
        setTimeout(() => {
          setLoading(false);
          toast.error("Something went wrong", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }, 2000);
      }
    }
  }

  // on add result click
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const clickResult = () => {
    setClick(true);
    setClick1(true);
  };

  // filter participate by team
  const fiterParticipationteam1 = sporrtData?.participations?.filter((data) => {
    if (data?.participation?.team === sporrtData.team1) {
      return data
    }
  });

  const fiterParticipationteam2 = sporrtData?.participations?.filter((data) => {
    if (data?.participation?.team === sporrtData.team2) {
      return data
    }
  });

  return (
    <div className="container-fluid px-4">
      <div className="row my-5">
        <div className="col">
          <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-outline-dark my-4"
          >
            Chick here to add Game
          </button>
          <h3 className="fs-4 mb-3">Recent Games</h3>
          <table className="table bg-white rounded shadow-sm  table-hover">
            <thead>
              <tr>
                <th scope="col" width={50}>
                  #
                </th>
                <th scope="col">Event Name</th>
                <th scope="col">Team1 Name</th>
                <th scope="col">Team2 Name</th>
                <th scope="col">Team1 image</th>
                <th scope="col">Team2 image</th>
                <th scope="col">Catagory</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {sport?.map((data, ind) => {
                return (
                  <tr key={ind + 1}>
                    <th scope="row">{1}</th>
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
                    <td>
                      <i
                        onClick={() => getSportDataonclick(ind)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal1"
                        className="btn fas fa-pen text-success"
                      ></i>
                    </td>
                    <td>
                      <i onClick={() => deleteSport(data._id)} className="fas btn fa-trash text-danger"></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="exampleModalLabel">
                Add Team
              </h1>
              <button
                type="button"
                className="btn-close text-danger fas fa-times"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form
              id="contact-form"
              onSubmit={Addsport}
              style={{ fontSize: "1rem" }}
              className="container validate-form"
            >
              <div className="modal-body">
                <div className="container  pb-5">
                  <div className="container bg-white d-block mx-auto">
                    <div className="form-group my-3">
                      <label htmlFor="exampleInputEmail1">
                        Choose catagory*
                      </label>
                      <select
                        name="catagory"
                        onChange={(e) => setCatagory(e.target.value)}
                        class="form-select form-control input100"
                        aria-label="Default select example"
                      >
                        <option selected>Open this select catagory</option>
                        <option value="football">Football</option>
                        <option value="cricket">Cricket</option>
                        <option value="tabletennis">Table Tennis</option>
                        <option value="footsal">Footsal</option>
                        <option value="vollyball">Vollyball</option>
                      </select>
                    </div>

                    <div className="form-group my-3">
                      <label htmlFor="exampleInputEmail1">Team1*</label>
                      <select
                        name="team1"
                        onChange={(e) => onInputChange(e)}
                        class="form-select form-control input100"
                        aria-label="Default select example"
                      >
                        {!catagory ? (
                          <option selected>Please choose catagory first</option>
                        ) : filterteam.length === 0 ? (
                          <option selected>
                            Catagory has no team please add
                          </option>
                        ) : (
                          <option selected>Open this select team</option>
                        )}
                        {filterteam?.map((data, ind) => {
                          return <option value={data.team}>{data.team}</option>;
                        })}
                      </select>
                    </div>

                    <div className="form-group my-3">
                      <label htmlFor="exampleInputEmail1">Team2*</label>
                      <select
                        name="team2"
                        onChange={(e) => onInputChange(e)}
                        class="form-select form-control input100"
                        aria-label="Default select example"
                      >
                        {filterteam.length === 0 ? (
                          <option selected>
                            Catagory has no team please add
                          </option>
                        ) : !catagory ? (
                          <option selected>Please choose catagory first</option>
                        ) : (
                          <option selected>Open this select team</option>
                        )}
                        {filterteam?.map((data, ind) => {
                          return <option value={data.team}>{data.team}</option>;
                        })}
                      </select>
                    </div>

                    <div className="row">
                      <div className="col-12 col-md-12">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Event Name</label>
                          <input
                            onChange={(e) => onInputChange(e)}
                            name="eventName"
                            type="text"
                            className="form-control input100"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter event name"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row my-3">
                      <div className="col-12 col-md-12">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Event Place
                          </label>
                          <input
                            onChange={(e) => onInputChange(e)}
                            name="eventPlace"
                            type="text"
                            className="form-control input100"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter event name"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-12 my-3">
                      <label htmlFor="exampleInputEmail1">
                        Event Start Date
                      </label>
                      <DatePicker
                        name="eventStartDate"
                        className="mx-auto"
                        selected={formdata.eventStartDate}
                        onChange={(date) => seteventStartDate(date)}
                      />
                    </div>

                    <div className="row my-3">
                      <div className="col-12 col-md-12">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Event Description
                          </label>
                          <textarea
                            onChange={(e) => onInputChange(e)}
                            name="eventDescription"
                            type="text"
                            className="form-control input100"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter event description"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {loading && <Loading />}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="sumbit" className="btn btn-outline-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* update model */}
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="exampleModalLabel">
                Upate Team
              </h1>
              <button
                type="button"
                className="btn-close text-danger fas fa-times"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form
              id="contact-form"
              onSubmit={(e) => {
                Updatesport(e)
                setTimeout(() => {
                  Updatesport(e)
                }, 1000)
              }}
              style={{ fontSize: "1rem" }}
              className="container validate-form"
            >
              <div className="modal-body">
                <div className="container  pb-5">
                  <div className={`container bg-white d-block mx-auto`}>
                    <div
                      className={`container  ${click1 ? "d-none" : "d-block"}`}
                    >
                      <div className="form-group my-3">
                        <label htmlFor="exampleInputEmail1">
                          Choose catagory*
                        </label>
                        <select
                          name="catagory"
                          onChange={(e) => {
                            setCatagory(e.target.value);
                            setFormdata({
                              catagory: catagory,
                            });
                          }}
                          class="form-select form-control input100"
                          aria-label="Default select example"
                        >
                          <option value={formdata.catagory} selected>
                            {formdata.catagory}
                          </option>
                          <option value="football">Football</option>
                          <option value="cricket">Cricket</option>
                          <option value="tabletennis">Table Tennis</option>
                          <option value="footsal">Footsal</option>
                          <option value="vollyball">Vollyball</option>
                        </select>
                      </div>

                      <div className="form-group my-3">
                        <label htmlFor="exampleInputEmail1">Team1*</label>
                        <select
                          name="team1"
                          onChange={(e) => onInputChange(e)}
                          class="form-select form-control input100"
                          aria-label="Default select example"
                        >
                          {!catagory ? (
                            <option value={formdata.team1} selected>
                              {formdata.team1}
                            </option>
                          ) : filterteam.length === 0 ? (
                            <option selected>
                              Catagory has no team please add
                            </option>
                          ) : (
                            <option value={formdata.team1} selected>
                              {formdata.team1}
                            </option>
                          )}
                          {filterteam?.map((data, ind) => {
                            return (
                              <option value={data.team}>{data.team}</option>
                            );
                          })}
                        </select>
                      </div>

                      <div className="form-group my-3">
                        <label htmlFor="exampleInputEmail1">Team2*</label>
                        <select
                          name="team2"
                          onChange={(e) => onInputChange(e)}
                          class="form-select form-control input100"
                          aria-label="Default select example"
                        >
                          {filterteam.length === 0 ? (
                            <option value={formdata.team2} selected>
                              {formdata.team2}
                            </option>
                          ) : !catagory ? (
                            <option selected>
                              Please choose catagory first
                            </option>
                          ) : (
                            <option value={formdata.team2} selected>
                              {formdata.team2}
                            </option>
                          )}
                          {filterteam?.map((data, ind) => {
                            return (
                              <option value={data.team}>{data.team}</option>
                            );
                          })}
                        </select>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Event Name
                            </label>
                            <input
                              onChange={(e) => onInputChange(e)}
                              name="eventName"
                              value={formdata.eventName}
                              type="text"
                              className="form-control input100"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Enter event name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row my-3">
                        <div className="col-12 col-md-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Event Place
                            </label>
                            <input
                              onChange={(e) => onInputChange(e)}
                              name="eventPlace"
                              type="text"
                              value={formdata.eventPlace}
                              className="form-control input100"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Enter event name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-md-12 my-3">
                        <label htmlFor="exampleInputEmail1">
                          Event Start Date
                        </label>
                        <DatePicker
                          name="eventStartDate"
                          className="mx-auto"
                          selected={formdata.eventStartDate}
                          onChange={(date) => seteventStartDate(date)}
                        />
                      </div>

                      <div className="row my-3">
                        <div className="col-12 col-md-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Event Description
                            </label>
                            <textarea
                              value={formdata.eventDescription}
                              onChange={(e) => onInputChange(e)}
                              name="eventDescription"
                              type="text"
                              className="form-control input100"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Enter event description"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*  */}
                    <div className="row">
                      <button
                        type="button"
                        onClick={clickResult}
                        className={`btn btn-outline-dark btn-sm my-4 ${click ? "d-none" : "d-block"
                          }`}
                      >
                        Chick here to add result
                      </button>

                      <div
                        className={`col-md-12 ${click ? "d-flex" : "d-none"}`}
                      >
                        <div className="col-12 col-md-6">
                          <h6> {formdata?.team1}</h6>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Add Score
                            </label>
                            <input
                              onChange={(e) => onInputChange1(e)}
                              name="goal1"
                              type="text"
                              className="form-control input100"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Enter score"
                            />
                          </div>
                          <div className="form-group my-3">
                            <label htmlFor="exampleInputEmail1">
                              Choose Player*
                            </label>
                            <select
                              name="user1"
                              onChange={(e) => onInputChange1(e)}
                              class="form-select form-control input100"
                              aria-label="Default select example"
                            >
                              <option selected>Open this select catagory</option>
                              {
                                fiterParticipationteam1?.map((data, ind) => {
                                  return (
                                    <option value={data?.participation?.user}>{data?.participation?.user}</option>
                                  )
                                })
                              }
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Time</label>
                            <input
                              onChange={(e) => onInputChange1(e)}
                              name="time1"
                              type="time"
                              className="form-control input100"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="toal goal"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <h6>{formdata?.team2}</h6>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Add Score
                            </label>
                            <input
                              onChange={(e) => onInputChange1(e)}
                              name="goal2"
                              type="text"
                              className="form-control input100"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Enter score"
                            />
                          </div>
                          <div className="form-group my-3">
                            <label htmlFor="exampleInputEmail1">
                              Choose Player*
                            </label>
                            <select
                              name="user2"
                              onChange={(e) => onInputChange1(e)}
                              class="form-select form-control input100"
                              aria-label="Default select example"
                            >
                              <option selected>Open this select catagory</option>
                              {
                                fiterParticipationteam2?.map((data, ind) => {
                                  return (
                                    <option value={data?.participation?.user}>{data?.participation?.user}</option>
                                  )
                                })
                              }
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Time</label>
                            <input
                              onChange={(e) => onInputChange1(e)}
                              name="time2"
                              type="time"
                              className="form-control input100"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="toal goal"
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div className='my-2'>
                        <h6>RECENT APPLICANTS</h6>
                        <div className='border rounded shadow bg-light px-3 py-3 text-secondary' style={{ width: "100%", overflowX: "hidden" }}>
                          <table class="table table-borderless">
                            <thead className='text-secondary'>
                              <tr>
                                <td className=""></td>
                                <td className="">NAME</td>
                                <td className="">APPLY FOR</td>
                                <td className="">DATE</td>
                                <td className=""></td>
                              </tr>
                            </thead>
                            <tbody>

                              <tr className=''>
                                <td><div className='sq-avatar-sm rounded d-flex align-items-center justify-content-center text-secondary'>MN</div></td>
                                <td>
                                  <p className='m-0 text-s'>{'val?.user?.firstName + val?.user?.lastName'}</p>
                                  <p className='m-0 text-xs'>{'val?.user?.email'}</p>
                                </td>
                                <td className='text-s'>{'val?.vacancy?.vacancyTitle'}</td>
                                <td className='text-s'>{'val?.applied_at'}</td>
                                <td><span className={`badge ${'val?.isHired' ? ' badge-muted-success' : ' badge-muted-warning'} fw-light py-2`}>{'val?.isHired' ? 'INTERVIEWED' : 'PENDING'}</span></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div> */}
                      {!click &&
                        matchResult?.map((data, ind) => {
                          console.log(data);
                          return (
                            <table className="table rounded shadow-sm  table-hover border rounded shadow bg-light px-3 py-3 text-secondary">
                              <thead>
                                <tr>
                                  <th scope="col" width={50}>
                                    {ind + 1}
                                  </th>
                                  <th scope="col">Player</th>
                                  <th scope="col">Score</th>
                                  <th scope="col">Time</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="" key={1}>
                                  <th scope="row"> <p className="text-sm rounded-circle d-flex justify-content-center align-items-center" style={{ height: '35px', width: '35px', background: 'rgb(220, 220, 220)' }}>{formdata?.team1?.slice(0, 2)?.toUpperCase()}</p> </th>
                                  <td> <p className="badge bg-info">{data?.team1result?.user1}</p> </td>
                                  <td>{data?.team1result?.goal1}</td>
                                  <td>{data?.team1result?.time1}</td>
                                </tr>
                                <tr className="" key={1}>
                                  <th scope="row"> <p className="text-sm rounded-circle d-flex justify-content-center align-items-center" style={{ height: '35px', width: '35px', background: 'rgb(220, 220, 220)' }}>{formdata?.team2?.slice(0, 2)?.toUpperCase()}</p> </th>
                                  <td><p className="badge bg-info">{data?.team2result?.user2}</p> </td>
                                  <td>{data?.team2result?.goal2}</td>
                                  <td>{data?.team2result?.time2}</td>
                                </tr>
                              </tbody>
                            </table>
                          );
                        })}
                      <p
                        type="buttton"
                        onClick={() => {
                          setClick(false);
                          setClick1(false);
                          // console.log(resultForm.goal1);
                          setMatchResult((data) => [
                            ...data,
                            {
                              team1result: {
                                goal1: resultForm.goal1,
                                user1: resultForm.user1,
                                time1: resultForm.time1,
                              },
                              team2result: {
                                goal2: resultForm1.goal2,
                                user2: resultForm1.user2,
                                time2: resultForm1.time2,
                              },
                            },
                          ]);
                        }}
                        className={`btn btn-sm btn-outline-success col-6 mx-auto mt-4 ${click ? "d-block" : "d-none"
                          }`}
                      >
                        save
                      </p>
                      <p
                        type="buttton"
                        onClick={() => {
                          setClick(false);
                          setClick1(false);
                        }}
                        className={`btn btn-sm btn-outline-danger col-6 mx-auto mt-4 ${click ? "d-block" : "d-none"
                          }`}
                      >
                        Close
                      </p>
                    </div>
                  </div>
                  {loading && <Loading />}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="sumbit" className="btn btn-outline-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addsport;
