import React from 'react';
import { useState, useEffect, useContext } from 'react';import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import {NewsContext} from "../../context/newsContext";
import Loading from "../../components/animation/Loading"
export default function News() {

    const [news] = useContext(NewsContext);

    return (
        <>
        <Navbar />
        <div className="container mt-5 mb-3">
            {/* <h3 className='mx-2'>Posts</h3> */}
            <div className="row">
            
                    {
                        news?.length > 0 ?
                            news?.map((data, ind) => {
                                return (
                                    <div className="col-md-4" key={ind + 1}>
                                        <div className="profile-card-4 ">
                                            <img src={`http://localhost:5000/${data.image}`} className="img img-responsive" />
                                            <div className="profile-content">
                                                <div className="profile-name">
                                                    <p className="text-center">{data.title}</p>
                                                </div>
                                                <div className="profile-description">{data.description}</div>
                                            </div>
                                            <div className="read-more my-3">
                                                <Link to={'#'} className="mx-3 p-2 text-light rounded text-start" style={{ textDecoration: 'none', background: 'rgb(81, 141, 177)' }}>Readmore</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <Loading />
                    }
            </div>
        </div>
    </>
    );
}