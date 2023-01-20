import React from 'react'
import Content from '../../components/home/Content';
import Navbar from '../../components/navbar/Navbar';
const Home = () => {
    return (
        <>
            <Navbar />
            <div id='containerPic' className='container-fluid' >
                <div className='pic' id='pic3' />
                <div className='pic' id='pic2' />
                <div className='pic' id='pic1' />
            </div>
            <section class="fag-video-area section_100 mt-1" style={{ 'background': '#0d0e1b'  }}>
                <div className='top-layer'></div>
                <div class="bottom-layer"></div>
                <div className="container">
                    <div className="row"><div className="col-lg-12">
                        <div className="fag-video-inn">
                            <img className="zooming" src="http://faf.themescare.com/static/media/video.b9818d06611635bcc8af.jpg"
                                alt="theater thumb" />
                            <a className="play-video" href="/">
                                <span>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 448 512" height="1em" width="1em"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
            <Content />
        </>
    )
}
export default Home;