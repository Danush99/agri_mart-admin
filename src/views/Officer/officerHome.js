import React, { useState, useEffect } from "react";
import {Link,useParams, useNavigate } from "react-router-dom";
import { Form, Input, Label} from 'reactstrap';
import {Navbar, Container, Nav} from 'react-bootstrap';
import profilepic from "./img/undraw_profile.svg";
import logo32x32 from "../../assets/logo/logo32x32.png";
import logo16x16 from "../../assets/logo/logo16x16.png";
import logo192x192 from "../../assets/logo/logo192x192.png";
import FarmerServices from "../../services/officerServices";
import "./vendor/fontawesome-free/css/all.min.css";
import "./css/sb-admin-2.min.css";
import 'bootstrap/dist/css/bootstrap.css';
require("jquery/dist/jquery.min.js");
require("bootstrap/dist/js/bootstrap.bundle.min.js");
require("jquery.easing/jquery.easing.min.js");
import {Vbarchart} from '../charts/verticalBarChart';
import {Linechart} from '../charts/linechart';
import {Doughnutt} from '../charts/doughnutChart';
import {Statchart} from '../charts/statsChart';

export function OfficerHome(){
    const { officerID } =useParams();
    const [officerDetails, setOfficerDetails] = useState([]);
    console.log("userID",officerID)
    let OfficerType=""
    if(officerDetails.prime_officer==="true"){
        OfficerType = "Prime Officer"
    }else{
        OfficerType = "Officer"
    }

    useEffect( ()=> {
        FarmerServices.getOfficer(officerID)
        .then((officer)=>{
            setOfficerDetails(officer[0]);
            console.log("officer : ",officer);
        })
        .catch((err)=>{
            console.log("error : ",err);
        })
      },[officerID]);

    useEffect(()=>{
        console.log("officerdetails: ",officerDetails)
    },[officerDetails])

    return(
<div>

<body id="page-top">
    <div id="wrapper">

        {/* SideBar */}
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                <div class="sidebar-brand-icon">
                    <img class="img-profile rounded-circle" src={logo32x32}/>
                </div>
                <div class="sidebar-brand-text mx-3">Agri-Mart</div>
            </a>

            <hr class="sidebar-divider my-0"/>

            <li class="nav-item active">
                <a class="nav-link">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>

            <hr class="sidebar-divider"/>

            <div class="sidebar-heading">
                Actions
            </div>

            <br/>

            <Link state={{officer:officerDetails}} to={"/officer/register"}>
            <li class="nav-item">
                <a class="nav-link">
                    <i class="fas fa-person-circle-plus"></i>
                    <span>Verify farmers</span>
                </a>
            </li>
            </Link>

            <hr class="sidebar-divider"/>

            <div class="sidebar-heading">
                Addons
            </div>

            <li class="nav-item">
                <a class="nav-link">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Charts</span></a>
            </li>

            <li class="nav-item">
                <a class="nav-link">
                    <i class="fas fa-fw fa-table"></i>
                    <span>Tables</span></a>
            </li>

            <hr class="sidebar-divider d-none d-md-block"/>

        </ul>

        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                {/*Header */}
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3"  type="button" data-bs-toggle="collapse" data-bs-target="#leftnavbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fa fa-bars"></i>
                    </button>
                    <div class="navbar-nav ml-auto text-xs font-weight-bold text-dark text-uppercase mb-1">
                        <h3>Dashboard</h3>
                    </div>

                    <ul class="navbar-nav ml-auto">


                        <div class="topbar-divider d-none d-sm-block"></div>

                        <li class="nav-item dropdown no-arrow">
                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="mr-2 d-none d-lg-inline text-gray-600 small">
                            <div>{officerDetails.firstname} {officerDetails.lastname}</div>
                            <div><span class="badge rounded-pill bg-info text-dark">{OfficerType}</span></div>
                        </span>
                        <img class="img-profile rounded-circle" src={profilepic}/>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="#"><i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Profile</a></li>
                            <li><a class="dropdown-item" href="#"><i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Profile</a></li>
                            <li><a class="dropdown-item" href="#"><i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Profile</a></li>
                            <li><a class="dropdown-item" href="#"><i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Profile</a></li>
                            <li><a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>Logout</a></li>
                        </ul>
                        </li>

                    </ul>

                </nav>
                {/*page content */}

                <div class="container-fluid">

                    <Statchart/>

                    <div class="row">

                        <div class="col-xl-7 col-lg-9">
                            <div class="card shadow mb-4">

                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between"> 
                                    <h6 class="m-0 font-weight-bold text-primary">Sri Lanka Harvesting progress 2022 and 2021</h6>
                                    {/* <div class="dropdown no-arrow">
                                    
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                            aria-labelledby="dropdownMenuLink">
                                            <div class="dropdown-header">Dropdown Header:</div>
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div> */}
                                </div>

                                <div class="card-body">
                                    <div class="chart-area">
                                    {/* <Vbarchart/> */}
                                    <Linechart/>
                                    </div>
                                    <div class="mt-4 text-center small">
                                        <span class="mr-2">
                                            <i class="fas fa-circle text-primary"></i> 2021
                                        </span>
                                        <span class="mr-2">
                                            <i class="fas fa-circle text-danger"></i> 2022
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="col-xl-6 col-lg-7">
                            <div class="card shadow mb-4">

                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between"> 
                                    <h6 class="m-0 font-weight-bold text-primary">Sri Lanka - Agricultural Land % Of Land Area</h6>
                                    {/* <div class="dropdown no-arrow">
                                    
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                            aria-labelledby="dropdownMenuLink">
                                            <div class="dropdown-header">Dropdown Header:</div>
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div> */}
                                </div>

                                <div class="card-body">
                                    <div class="chart-area">
                                    {/* <Vbarchart/> */}
                                    <Vbarchart/>
                                    </div>
                                    <div class="mt-4 text-center small">
                                        <span class="mr-2">
                                            <i class="fas fa-circle " style={{color: "#C24256"}}></i> Agricultural land Area
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="col-xl-3 col-lg-7">
                            <div class="card shadow mb-4">

                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">Agri-Mart Crops</h6>
                                    {/* <div class="dropdown no-arrow">
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                            aria-labelledby="dropdownMenuLink">
                                            <div class="dropdown-header">Dropdown Header:</div>
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>  */}
                                </div>

                                <div class="card-body">
                                    <div class="chart-pie pt-4 pb-2" >
                                        <Doughnutt/>
                                    </div>
                                    <div class="mt-4 text-center small">
                                        <span class="mr-2">
                                            <i class="fas fa-circle " style={{color: "#94A94B"}}></i> Rice
                                        </span>
                                        <span class="mr-2">
                                            <i class="fas fa-circle " style={{color: "#23894A"}}></i> Beets
                                        </span>
                                        <span class="mr-2">
                                            <i class="fas fa-circle " style={{color: "#452389"}}></i> Radish
                                        </span>
                                        <span class="mr-2">
                                            <i class="fas fa-circle " style={{color: "#851970"}}></i> Tomatoes
                                        </span>
                                        <span class="mr-2">
                                            <i class="fas fa-circle " style={{color: "#A63344"}}></i> Carrots
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6 mb-4">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Agri-Mart Crops</h6>
                                </div>
                                <div class="card-body">
                                    <h4 class="small font-weight-bold">Rice<span
                                            class="float-right">40%</span></h4>
                                    <div class="progress mb-4">
                                        <div class="progress-bar bg-danger" role="progressbar" style={{width: "40%", ariaValuenow:"40", ariaValuemin:"0", ariaValuemax:"100"}}></div>
                                    </div>
                                    <h4 class="small font-weight-bold">Beets<span
                                            class="float-right">10%</span></h4>
                                    <div class="progress mb-4">
                                        <div class="progress-bar bg-warning" role="progressbar" style={{width: "10%" ,ariaValuenow:"10", ariaValuemin:"0", ariaValuemax:"100"}}></div>
                                    </div>
                                    <h4 class="small font-weight-bold">Radish<span
                                            class="float-right">15%</span></h4>
                                    <div class="progress mb-4">
                                        <div class="progress-bar" role="progressbar" style={{width: "15%", ariaValuenow:"15", ariaValuemin:"0", ariaValuemax:"100"}}></div>
                                    </div>
                                    <h4 class="small font-weight-bold">Tomatoes<span
                                            class="float-right">25%</span></h4>
                                    <div class="progress mb-4">
                                        <div class="progress-bar bg-info" role="progressbar" style={{width: "25%", ariaValuenow:"25", ariaValuemin:"0", ariaValuemax:"100"}}></div>
                                    </div>
                                    <h4 class="small font-weight-bold">Carrots<span
                                            class="float-right">10</span></h4>
                                    <div class="progress">
                                        <div class="progress-bar bg-success" role="progressbar" style={{width: "10%", ariaValuenow:"10", ariaValuemin:"0", ariaValuemax:"100"}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>

</body>

</div>
    )
}