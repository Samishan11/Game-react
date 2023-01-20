import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/animation/Loading";
import Navbar from "../../components/navbar/Navbar";
import { SportContext } from "../../context/sportContext";
const History = () => {
  const [sport] = useContext(SportContext);

  // var sportData;
  var participationData;
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  const token = localStorage.getItem("token");
  const user = parseJwt(token);
  var sportData = sport?.map((element) => {
    return {
      ...element,
      participations: element.participations.filter((subElement) => {
        if (subElement?.participation?.user === user?.data?.username) {
          //   sportData = element;
          participationData = subElement;
          return subElement;
        }
      }),
    };
  });
  return (
    <>
      <Navbar />
      <div className="container mx-auto" style={{ marginTop: "100px" }}>
        <div className="col-md-8 mx-auto">

          {/*  */}
          {
            sportData?.length > 0 ?
              sportData?.map((sportData, ind) => {
                return (
                  sportData?.participations?.length > 0 && <div
                    className="carouse text-dark bg-light shadow"
                    style={{ marginTop: "50px" }}
                  >
                    <div className="match_team_box mb-2">
                      <div className="match_data">
                        <div className="match_schedule text-center me-5 py-3">
                          <div className="logo_section mb-3">
                            <img
                              src={`http://localhost:5000/${sportData?.team1Image}`}
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
                          <h6 className="text-dark">{sportData?.team1}</h6>
                        </div>
                        <div className="vs_box">
                          <h6 className="text-dark text-uppercase text-l">VS</h6>
                        </div>
                        <div className="match_schedule text-center ms-5 py-3">
                          <div className="logo_section mb-3">
                            <img
                              src={`http://localhost:5000/${sportData?.team2Image}`}
                              className="logo"
                              style={{
                                width: "100px",
                                objectFit: "cover",
                                height: "100px",
                              }}
                              width={200}
                            />
                          </div>
                          <h6 className="text-dark">{sportData?.team2}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mb-2">
                      <h6 className="text-dark text-sm mb-2">Fifa World Cup</h6>
                      <p className="text-dark text-sm mb-2">
                        Playing as a {sportData?.participations[0]?.participation?.role}
                      </p>
                      <p className="text-dark text-sm mb-2">
                      Team: {sportData?.participations[0]?.participation?.team} {sportData?.participations[0]?.participation?.team === sportData?.team1? <img  className="logo"
                              style={{
                                width: "30px",
                                objectFit: "cover",
                                height: "30px",
                              }} src={`http://localhost:5000/${sportData?.team1Image}`}></img>: <img  className="logo"
                              style={{
                                width: "30px",
                                objectFit: "cover",
                                height: "30px",
                              }} src={`http://localhost:5000/${sportData?.team2Image}`}></img>}
                      </p>
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
                        state={{ data: sportData }}
                        to={`/detail/${sportData?._id}`}
                        className="btn button_bg px-4 my-4"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                )

              })
              : <Loading />
          }
        </div>
      </div>
    </>
  );
};

export default History;
