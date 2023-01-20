import React, { useContext, useState, useEffect } from "react";
import Loading from "../../components/animation/Loading";
import Navbar from "../../components/navbar/Navbar";
import { SportContext } from "../../context/sportContext";
import { TeamContext } from "../../context/teamContext";
const Standing = () => {
  const [sport] = useContext(SportContext);
  const [team] = useContext(TeamContext);

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

  let defaultfilter = team?.filter((type) => {
    if (type.catagory === "football") {
      return type;
    }
  });

  const [filterCatagory, setFiltreCatagory] = useState(defaultfilter);
  useEffect(() => {
    setFiltreCatagory(defaultfilter);
  }, []);

  function filter(val) {
    let filterdata = team?.filter((type) => type.catagory === val);
    return filterdata;
  }
  function handleFiltercatagory(value) {
    let catagory = value;
    catagory
      ? setFiltreCatagory(filter(catagory))
      : setFiltreCatagory(defaultfilter);
  }

  const sorting = filterCatagory?.sort((a, b) => {
    return b?.teamResult?.point - a?.teamResult?.point;
  });

  console.log(sorting);

  return (
    <>
      <Navbar />
      <div className="container-fluid px-0 mx-0" style={{ marginTop: "100px" }}>
        <div className="container ">
          <div className="row">
            <div className="col-lg-3 col-md-5 mb-4">
              <div className="px-0 py-0 bg-light shadow-sm">
                <h6 className="text-secondary text-l py-3 px-3">
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
            <div className="col-lg-9 col-md-7 col-sm-12">
              <h6 className="text-secondary text-xl mb-4 text-uppercase text-center">
                Point Table
              </h6>
              <div className="bg-light col-12 p-0 mb-5">
                <div className="table-responsive">
                  <table class="table mb-0">
                    <thead className=" text-light" style={{ background: '#82b440' }}>
                      <tr>
                        <th scope="col">
                          <div class="py-2 px-3 text-sm">Pos</div>
                        </th>
                        <th scope="col">
                          <div class="py-2 px-3 text-sm">Team Name</div>
                        </th>
                        <th scope="col">
                          <div class="py-2 px-3 text-uppercase text-sm">p</div>
                        </th>
                        <th scope="col">
                          <div class="py-2 px-3 text-uppercase text-sm">w</div>
                        </th>
                        <th scope="col">
                          <div class="py-2 px-3 text-uppercase text-sm">D</div>
                        </th>
                        <th scope="col">
                          <div class="py-2 px-3 text-uppercase text-sm">L</div>
                        </th>
                        <th scope="col">
                          <div class="py-2 px-3 text-sm">Pts</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-light mb-0">
                      {sorting?.length > 0 ? (
                        sorting?.map((data, ind) => {
                          return (
                            <tr>
                              <td class="align-middle">
                                <div class="py-2 px-3 text-sm fw-bold">{ind + 1}</div>
                              </td>
                              <td class="align-middle">
                                <div class="py-2 px-3 text-sm fw-bold stats_team_box">
                                  <img
                                    src="https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Brazilian_Football_Confederation_logo.svg/800px-Brazilian_Football_Confederation_logo.svg.png"
                                    alt="Team Logo"
                                    className="stats_team_logo me-3"
                                  />
                                  <h6 className="text-dark text-m mb-0">
                                    {data.team}
                                  </h6>
                                </div>
                              </td>
                              <td class="align-middle">
                                <div class="py-2 px-3 text-sm fw-bold">
                                  {data?.matches?.matchPlay
                                    ? data?.matches?.matchPlay
                                    : 0}
                                </div>
                              </td>
                              <td class="align-middle">
                                <div class="py-2 px-3 text-sm fw-bold">
                                  {data?.matches?.matchwin
                                    ? data?.matches?.matchwin : 0}
                                </div>
                              </td>
                              <td class="align-middle">
                                <div class="py-2 px-3 text-sm fw-bold">
                                  {data?.matches?.matchdraw
                                    ? data?.matches?.matchdraw : 0}
                                </div>
                              </td>
                              <td class="align-middle">
                                <div class="py-2 px-3 text-sm fw-bold">
                                  {data?.matches?.matchloss
                                    ? data?.matches?.matchloss : 0}
                                </div>
                              </td>
                              <td class="align-middle">
                                <div class="py-2 px-3 text-sm fw-bold">
                                  {data?.teamResult?.point
                                    ? data?.teamResult?.point
                                    : 0}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <div className="div">
                          <Loading />
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Standing;
