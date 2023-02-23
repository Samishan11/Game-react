import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Addteam from './Addteam';
import Dashboardcontent from './Dashboardhome';
import Addsport from './Addsport';
import Manageuser from './Manageuser';
import Newspost from './News.post';
import Contactget from './Contact.get';
const Dashboard = () => {
    const [navcollapse, setNavcollapse] = useState(false);
    const [dashboard, setDashboard] = useState(false);
    const [addteam, setAddteam] = useState(false);
    const [addsport, setAddsport] = useState(false);
    const [manageuser, setManageuser] = useState(false);
    const [managenews, setManagenews] = useState(false);
    const [managecontact, setManagecontact] = useState(false);
    function onclick() {
        setNavcollapse(!navcollapse)
        console.log('navcollapse');
    }

    return (
        <div className={navcollapse ? "d-flex toggled" : "d-flex"} id="wrapper">
            {/* Sidebar */}
            <div className="bg-white" id="sidebar-wrapper">
                <div className="sidebar-heading text-center py-4 primary-text fs-6 fw-bold text-uppercase border-bottom"><Link style={{ 'textDecoration': 'none' }} to={'/'}>Sport Management</Link></div>
                <div className="list-group list-group-flush my-3">
                    <Link onClick={() => {
                        setDashboard(true)
                        setAddteam(false)
                        setManageuser(false)
                        setManagenews(false)
                        setAddsport(false)
                        setManagecontact(false)
                    }} to="#" className="list-group-item list-group-item-action bg-transparent second-text active"><i className="fas fa-tachometer-alt me-2" />Dashboard</Link>
                    <Link onClick={() => {
                        setAddteam(true)
                        setDashboard(false)
                        setAddsport(false)
                        setManageuser(false)
                        setManagenews(false)
                        setManagecontact(false)
                    }} to="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i className="fas fa-project-diagram me-2" />Add Team</Link>
                    <Link onClick={() => {
                        setDashboard(false)
                        setAddteam(false)
                        setAddsport(true)
                        setManageuser(false)
                        setManagenews(false)
                        setManagecontact(false)
                    }} to="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i className="fas fa-paperclip me-2" />Add Sport</Link>
                    <Link onClick={() => {
                        setDashboard(false)
                        setAddteam(false)
                        setAddsport(false)
                        setManageuser(false)
                        setManagenews(true)
                        setManagecontact(false)
                    }} to="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i className="fas fa-paperclip me-2" />Add News</Link>
                    <Link onClick={() => {
                        setDashboard(false)
                        setAddteam(false)
                        setAddsport(false)
                        setManageuser(false)
                        setManagenews(false)
                        setManagecontact(true)
                    }} to="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i className="fas fa-gift me-2" />Contacts</Link>
                    <Link onClick={() => {
                        setDashboard(false)
                        setAddteam(false)
                        setAddsport(false)
                        setManageuser(true)
                        setManagenews(false)
                        setManagecontact(false)
                    }} to="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i className="fas fa-gift me-2" />Manage User</Link>
                    <button onClick={() => {
                        localStorage.clear()
                        window.location = '/login'
                    }} className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"><i className="fas fa-power-off me-2" />Logout</button>
                </div>
            </div>
            {/* /#sidebar-wrapper */}
            {/* Page Content */}
            <div id="page-content-wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                    <div className="d-flex align-items-center">
                        <i onClick={onclick} className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle" />
                        <h2 className="fs-2 m-0">Dashboard</h2>
                    </div>

                </nav>
                {
                    dashboard ? <Dashboardcontent></Dashboardcontent> : addteam ? <Addteam></Addteam> : addsport ? <Addsport /> : manageuser ? <Manageuser /> : managenews ? <Newspost /> : managecontact ? <Contactget /> : <Dashboardcontent></Dashboardcontent>
                }
            </div>
        </div>
    )
}

export default Dashboard;