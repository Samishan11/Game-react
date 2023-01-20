import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { SportContext } from "../../context/sportContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../../components/animation/Loading";
import { userAuthToken } from "../../utils/user.token";
const Sport = () => {
  const [sport] = useContext(SportContext);

  const [pagination, setPagination] = useState(4);

  const sports = sport?.slice(0, pagination);

  function loadMore() {
    setPagination(pagination + 2);
  }

  const catagory = [
    { catagory: "football", value: "football" },
    { catagory: "futsal", value: "futsal" },
    { catagory: "cricket", value: "cricket" },
    { catagory: "basketball", value: "basketball" },
    { catagory: "tabletenish", value: "tabletenish" },
  ];
  const [filterCatagory, setFiltreCatagory] = useState(sport);
  useEffect(() => {
    setFiltreCatagory(sport);
  }, []);

  function filter(val) {
    let filterdata = sport.filter((type) => type.catagory === val);
    return filterdata;
  }
  function handleFiltercatagory(value) {
    let catagory = value;
    catagory ? setFiltreCatagory(filter(catagory)) : setFiltreCatagory(sport);
  };

  const [formdata, setFormdata] = useState({
    team: '',
    image: '',
    catagory: ''
})
const [image, setImage] = useState('')
  const onInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value || e.target.files[0] });
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


  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="col">
          {
            userAuthToken?.data &&
          <button data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-outline-dark mb-5'>Create your own team and participate</button>
          }
          <h3 className="fs-4 mb-3">Recent Teams</h3>
        </div>
        <div className="row">
          {/* <div className="col-lg-3 col-md-5 mb-4">
            <div className="px-0 py-0 bg-light shadow-sm">
              <h6 className="text-dark text-l py-3 px-3">
                Top Sport Categories
              </h6>
              <div
                class="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                {catagory?.map((data, ind) => {
                  return (
                    <button
                      onClick={() => handleFiltercatagory(data.catagory)}
                      class="nav-link active mb-2 me-0"
                      id="v-pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                    >
                      <div className="d-flex justify-content-start align-items-center">
                        <div className="icon me-3">
                          {data.catagory === "football" ? (
                            <i class="far fa-futbol"></i>
                          ) : data.catagory === "cricket" ? (
                            <i class="far fa-cricket"></i>
                          ) : data.catagory === "basketball" ? (
                            <i class="fad fa-basketball-ball"></i>
                          ) : data.catagory === "futsal" ? (
                            <i class="fad fa-futbol"></i>
                          ) : data.catagory === "tabletenish" ? (
                            <i class="fad fa-table-tennis"></i>
                          ) : null}
                        </div>
                        <div className="info">
                          <h6 className="mb-0 text-s">{data?.catagory}</h6>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div> */}
          {
          sport?.length > 0 ?
          sports?.map((data, ind) => {
            return (
              <div className="col-lg-6 mb-4">
                <div className="carouse text-dark bg-light shadow">
                  {/*  */}
                  <div className="match_team_box mb-2">
                    <div className="match_data">
                      <div className="match_schedule text-center me-5 py-3">
                        <div className="logo_section mb-3">
                          <img
                            src={`http://localhost:5000/${data?.team1Image}`}
                            alt=""
                            style={{
                              width: "100px",
                              objectFit: "cover",
                              height: "100px",
                            }}
                            className="logo"
                            width={200}
                          />
                        </div>
                        <h6 className="text-dark">{data?.team1}</h6>
                      </div>
                      <div className="vs_box">
                        <h6 className="text-dark text-uppercase text-l">VS</h6>
                      </div>
                      <div className="match_schedule text-center ms-5 py-3">
                        <div className="logo_section mb-3">
                          <img
                            src={`http://localhost:5000/${data?.team2Image}`}
                            className="logo"
                            style={{
                              width: "100px",
                              objectFit: "cover",
                              height: "100px",
                            }}
                            width={200}
                          />
                        </div>
                        <h6 className="text-dark">{data?.team2}</h6>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mb-2">
                    <h6 className="text-dark text-sm mb-2">Fifa World Cup</h6>

                    <div className="d-flex justify-content-center align-items-center">
                      <div className="d-flex justify-content-start align-items-center me-4">
                        <i className="fa fa-calendar text-small me-2"></i>
                        <p className="text-dark mb-0 text-small">
                          December 20, 2022
                        </p>
                      </div>
                      <div className="d-flex justify-content-start align-items-center">
                        <i className="fa fa-map-marker text-small me-2"></i>
                        <p className="text-dark mb-0 text-small">
                          Goku Stadium
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center mt-3 mb-2">
                    <Link
                      state={{ data: data }}
                      to={`/detail/${data?._id}`}
                      className="btn button_bg px-4 my-4"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          }) :

          <Loading />
        
        }
        </div>
        <div className="container d-flex justify-content-center align-items-center">
          {sport?.length !== sports?.length ? (
            <button
              onClick={loadMore}
              className="btn button_bg_alt btn-sm my-2 mx-auto"
            >
              Load More
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
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
    </>
  );
};

export default Sport;
