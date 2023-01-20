import React, { useContext, useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { SportContext } from "../../context/sportContext";
import { Link } from "react-router-dom";
import Loading from "../animation/Loading";
const options = {
  margin: 5,
  responsiveClass: true,
  // nav: true,
  loop: false,
  dots: true,
  autoplay: true,
  // navText: ["Prev", "Next"],
  smartSpeed: 1000,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
};
const Content = () => {
  const [sport] = useContext(SportContext);

  // filter by not null
  const filetResult = sport?.filter((data) => {
    if (data.result.length > 0) {
      return data.finalResult != null;
    }
  });


  const catagory = [
    { catagory: "football", value: "football" },
    { catagory: "futsal", value: "futsal" },
    { catagory: "cricket", value: "cricket" },
    { catagory: "basketball", value: "basketball" },
    { catagory: "tabletenish", value: "tabletenish" },
  ];


  let defaultfilter = sport?.filter((type) => {
    if (type.catagory === 'football') {
      return type;
    }
  });


  const [filterCatagory, setFiltreCatagory] = useState(defaultfilter);

  useEffect(() => {
    setFiltreCatagory(defaultfilter);
  }, []);

  function filter(val) {
    let filterdata = sport?.filter((type) => type.catagory === val);
    return filterdata;
  }
  const [show, setShow] = useState(false);
  function handleFiltercatagory(value) {
    setShow(true)
    let catagory = value;
    catagory ? setFiltreCatagory(filter(catagory)) : setFiltreCatagory(defaultfilter);
  }
  // filter by catagory
  const filterByCatagory = sport?.filter((data) => {
    return data.finalResult != null;
  });

  const filtertLatestResult = filetResult?.sort((a, b) => {
    return new Date(b.eventStartDate) - new Date(a.eventStartDate);
  });

  const [data, setData] = useState(null);
  const onNaviget = (i) => {
    setData(filtertLatestResult[i]);
  };

  // random picker
  function shuffleArray(array) {
    let i = array?.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  return (
    <>
      <div className="container col-lg-11" style={{ marginTop: "100px" }}>
        <div className="row mb-4">
          <div className="col-lg-3 col-md-5 mb-4">
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
          </div>
          <div className="col-lg-4 col-md-7 mb-4">
            <div className="p-2 bg-light shadow-sm">
              <h6 className="text-dark text-l py-3">Today Matches</h6>
              <div class="tab-content" id="v-pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                  tabindex="0"
                >
                  {
                    !show ?
                      defaultfilter?.slice(0, 2)?.map((data, ind) => {

                        return (
                          <Link state={{ data: data }} to={`/detail/${data._id}`} className="text-decoration-none">
                            <div
                              className="game_box p-1 mb-2 rounded"
                              title="click here to view detail"
                            >
                              <div className="match_section">
                                <div className="today_match_section">
                                  <div className="px-3 py-1">
                                    <div className="mb-0">
                                      <div className="sport_team_logo_box mb-2">
                                        <img
                                          src="https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Brazilian_Football_Confederation_logo.svg/800px-Brazilian_Football_Confederation_logo.svg.png"
                                          alt="Sport Team Logo"
                                          className="sport_team_logo"
                                        />
                                      </div>
                                      <h6 className="text-dark text-l">
                                        {data.team1?.slice(0, 8)}
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                                <div className="today_match_section py-3">
                                  <div className="px-2 py-1">
                                    <div className="d-flex justify-content-center align-itmes-center flex-column text-center mb-0">
                                      <h6 className="text-danger text-sm mt-2">
                                        Streaming
                                      </h6>
                                      <h6 className="text-dark text-xl mb-0 fw600 ls-sm">
                                        {
                                          data?.finalResult?.team1finalresult
                                            ?.totalgoal1
                                        }{" "}
                                        -{" "}
                                        {
                                          data?.finalResult?.team2finalresult
                                            ?.totalgoal2
                                        }
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                                <div className="today_match_section">
                                  <div className="px-3 py-1">
                                    <div className="d-flex justify-content-between align-items-center mb-0">
                                      <div className="mb-0">
                                        <div className="sport_team_logo_box mb-2">
                                          <img
                                            src="https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Brazilian_Football_Confederation_logo.svg/800px-Brazilian_Football_Confederation_logo.svg.png"
                                            alt="Sport Team Logo"
                                            className="sport_team_logo"
                                          />
                                        </div>
                                        <h6 className="text-dark text-l">
                                          {data.team2?.slice(0, 8)}
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        )
                      })
                      :
                      filterCatagory?.length > 0 ?
                        filterCatagory?.slice(0, 2)?.map((data, ind) => {
                          return (
                            <Link state={{ data: data }} to={`/detail/${data._id}`} className="text-decoration-none">
                              <div
                                className="game_box p-1 mb-2 rounded"
                                title="click here to view detail"
                              >
                                <div className="match_section">
                                  <div className="today_match_section">
                                    <div className="px-3 py-1">
                                      <div className="mb-0">
                                        <div className="sport_team_logo_box mb-2">
                                          <img
                                            src="https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Brazilian_Football_Confederation_logo.svg/800px-Brazilian_Football_Confederation_logo.svg.png"
                                            alt="Sport Team Logo"
                                            className="sport_team_logo"
                                          />
                                        </div>
                                        <h6 className="text-dark text-l">
                                          {data.team1?.slice(0, 8)}
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="today_match_section py-3">
                                    <div className="px-2 py-1">
                                      <div className="d-flex justify-content-center align-itmes-center flex-column text-center mb-0">
                                        <h6 className="text-danger text-sm mt-2">
                                          Streaming
                                        </h6>
                                        <h6 className="text-dark text-xl mb-0 fw600 ls-sm">
                                          {
                                            data?.finalResult?.team1finalresult
                                              ?.totalgoal1
                                          }{" "}
                                          -{" "}
                                          {
                                            data?.finalResult?.team2finalresult
                                              ?.totalgoal2
                                          }
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="today_match_section">
                                    <div className="px-3 py-1">
                                      <div className="d-flex justify-content-between align-items-center mb-0">
                                        <div className="mb-0">
                                          <div className="sport_team_logo_box mb-2">
                                            <img
                                              src="https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Brazilian_Football_Confederation_logo.svg/800px-Brazilian_Football_Confederation_logo.svg.png"
                                              alt="Sport Team Logo"
                                              className="sport_team_logo"
                                            />
                                          </div>
                                          <h6 className="text-dark text-l">
                                            {data.team2?.slice(0, 8)}
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        })
                        : <Loading />
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 mb-4">
            <div className="p-2 bg-light shadow-sm">
              <h6 className="text-dark text-l pt-3 pb-1">Next Matches</h6>
              {/* Carousel Section */}
              <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade border"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner pt-1 pb-1">
                  {shuffleArray(sport)
                    ?.slice(0, 1)
                    ?.map((data, ind) => {
                      return (
                        <>
                          <div className="carousel-item active">
                            <div className="match_team_box mb-2">
                              <div className="match_data">
                                <div className="match_schedule text-center me-5 py-3">
                                  <div className="logo_section mb-3">
                                    <img
                                      src={`http://localhost:5000/${data.team1Image}`}
                                      alt=""
                                      className="logo"
                                      width={200}
                                      style={{ objectFit: "cover" }}
                                    />
                                  </div>
                                  <h6 className="text-dark">{data.team1}</h6>
                                </div>
                                <div className="vs_box">
                                  <h6 className="text-dark text-uppercase text-l">
                                    VS
                                  </h6>
                                </div>
                                <div className="match_schedule text-center ms-5 py-3">
                                  <div className="logo_section mb-3">
                                    <img
                                      width={200}
                                      style={{ objectFit: "cover" }}
                                      src={`http://localhost:5000/${data.team2Image}`}
                                      alt=""
                                      className="logo"
                                    />
                                  </div>
                                  <h6 className="text-dark">{data.team2}</h6>
                                </div>
                              </div>
                            </div>
                            <div className="text-center mb-2">
                              <h6 className="text-secondary text-sm mb-2">
                                Fifa World Cup
                              </h6>
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
                                to={`/detail/${data._id}`}
                                className="btn button_bg px-4"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  {/*  */}
                  {shuffleArray(sport)?.map((data, ind) => {
                    return (
                      <div className="carousel-item">
                        {/*  */}
                        <div className="match_team_box mb-2">
                          <div className="match_data">
                            <div className="match_schedule text-center me-5 py-3">
                              <div className="logo_section mb-3">
                                <img
                                  src={`http://localhost:5000/${data.team1Image}`}
                                  alt=""
                                  className="logo"
                                  width={200}
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                              <h6 className="text-dark">{data.team1}</h6>
                            </div>
                            <div className="vs_box">
                              <h6 className="text-dark text-uppercase text-l">
                                VS
                              </h6>
                            </div>
                            <div className="match_schedule text-center ms-5 py-3">
                              <div className="logo_section mb-3">
                                <img
                                  src={`http://localhost:5000/${data.team2Image}`}
                                  className="logo"
                                  width={200}
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                              <h6 className="text-dark">{data.team2}</h6>
                            </div>
                          </div>
                        </div>
                        <div className="text-center mb-2">
                          <h6 className="text-secondary text-sm mb-2">
                            Fifa World Cup
                          </h6>
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
                            to={`/detail/${data._id}`}
                            className="btn button_bg px-4"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                  {/*  */}
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleFade"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleFade"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              {/* End here */}
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="container col-lg-11">
        <div className="row mb-5 ">
          <div className="col-lg-11 p-0 mb-5 mx-auto">
            {filtertLatestResult?.slice(0, 1).map((data, ind) => {
              return (
                <div className="bg-light shadow-sm border">
                  <h6 className="text-dark text-xl py-3 text-center border-bottom">
                    Latest Results
                  </h6>
                  <div className="match_box px-3 mb-0">
                    <div className="match pt-5 pb-2">
                      <div className="team1 mx-lg-3 mx-md-3 mx-1">
                        <h4 className="text-dark text-uppercase me-3 fw-bold">
                          {data.team1}
                        </h4>
                        <img
                          src={`http://localhost:5000/${data.team1Image}`}
                          style={{
                            objectFit: "cover",
                            width: "200px",
                            height: "200px",
                          }}
                          alt=""
                          className="team_logo me-4 mb-2"
                        />
                      </div>
                      <div className="vs_box mx-lg-3 mx-1">
                        <div className="d-flex justify-content-start align-items-center">
                          <h6 className="text-dark text-uppercase h3">
                            {data?.finalResult?.team1finalresult?.totalgoal1}
                          </h6>
                          <i class="fas fa-swords text-warning mx-3"></i>
                          <h6 className="text-dark text-uppercase h3">
                            {data?.finalResult?.team2finalresult?.totalgoal2}
                          </h6>
                        </div>
                      </div>
                      <div className="team2 mx-lg-3 mx-md-3 mx-1">
                        <img
                          src={`http://localhost:5000/${data.team2Image}`}
                          style={{
                            objectFit: "cover",
                            width: "200px",
                            height: "200px",
                          }}
                          alt=""
                          className="team_logo ms-4 me-3 mb-2"
                        />
                        <h4 className="text-dark text-uppercase fw-bold">
                          {data.team2}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="col-md-8 mx-auto">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris euismod velit molestie, sagittis velit ut,
                        interdum tellus. Quisque cursus nibh porttitor purus
                        fringilla, vel accumsan dolor semper. In at risus
                        feugiat, convallis eros et, porttitor nisi. Mauris ipsum
                        quam, dapibus ut bibendum nec, efficitur quis lacus. Sed
                        consectetur nec sem nec pretium.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-centerpy-3 mb-3">
                    <Link
                      onClick={() => onNaviget(ind)}
                      to={`/detail/${data._id}`}
                      state={{ data: data }}
                      className="btn button_bg px-4"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/*  */}
      <div className="container-fluid px-0 mx-0 matches_box">
        <div className="container col-lg-11 col-md-12 py-3">
          <h2 className="text-white pt-3 pb-0">Match Schedule</h2>
          <OwlCarousel className="owl-theme py-3" {...options}>
            {sport?.map((data, ind) => {
              return (
                <div class="item">
                  <div className="p-2 bg-white m-1">
                    <div className="match_team_box mb-2">
                      <div className="match_data">
                        <div className="match_schedule text-center py-3">
                          <div className="logo_section mb-3">
                            <img
                              src={`http://localhost:5000/${data.team1Image}`}
                              alt=""
                              className="logo"
                              style={{ objectFit: "cover" }}
                              width={300}
                            />
                          </div>
                          <h6 className="text-dark">{data.team1}</h6>
                        </div>
                        <div className="vs_box mx-lg-5 mx-5">
                          <h6 className="text-dark text-uppercase text-l">
                            VS
                          </h6>
                        </div>
                        <div className="match_schedule text-center  py-3">
                          <div className="logo_section mb-3">
                            <img
                              style={{ objectFit: "cover" }}
                              src={`http://localhost:5000/${data.team2Image}`}
                              alt=""
                              className="logo"
                              width={300}
                            />
                          </div>
                          <h6 className="text-dark">{data.team2}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mb-2">
                      <h6 className="text-secondary text-sm mb-lg-2 mb-md-3">
                        Fifa World Cup
                      </h6>
                      <div className="d-flex justify-content-center align-items-center flex-wrap">
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
                  </div>
                </div>
              );
            })}
          </OwlCarousel>
        </div>
      </div>
    </>
  );
};
export default Content;
