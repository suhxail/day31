import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Topbar from './Topbar';
import Dashboard from './Dashboard';
import { Link } from 'react-router-dom';



function Sidebar() {

    return (

        <div id="wrapper">

            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">


                <h1 className="sidebar-brand d-flex align-items-center justify-content-center">
                    <div className="sidebar-brand-icon ">
                        <i class="fas fa-chalkboard-teacher"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">Students & Teachers Management</div>
                </h1>


                <hr className="sidebar-divider my-0" />


                <li className="nav-item active">


                    <Link className="nav-link" to='/' >
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />

                <div className="sidebar-heading">
                    Interface
                </div>

                <li className="nav-item">
                    <Link to="/create-student" className="nav-link collapsed" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <span>Create Student</span>
                    </Link>
                </li>

                <li className="nav-item">

                    <Link to="/create-mentor" className="nav-link collapsed" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <span>Create Mentor</span>
                    </Link>

                </li>

                <li className="nav-item">

                    <Link className="nav-link collapsed" to="/assign-student" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <span>Assign student to mentor</span>
                    </Link>

                </li>

            </ul>
            <Topbar />

        </div>

    )
}

export default Sidebar