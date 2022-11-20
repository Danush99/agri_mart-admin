import React, { useState, useEffect } from "react";
import Axios from 'axios';
import profilepic from "./img/undraw_profile.svg";


export function Header(props) {
    const userdetails = props.userDetails;
    const header_name = props.header;
    let userType = ""
    console.log("Header userdetails: ",userdetails);
    try{
        if(userdetails.prime_officer==="true"){
            userType = "Prime Officer"
        }else if(userdetails.prime_officer==="false"){
            userType = "Officer"
        }else{
            userType = "Admin"
        }
    }catch(err){
        userType = "Admin"
    }
    return ( 
    < div > 
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3"  type="button" data-bs-toggle="collapse" data-bs-target="#leftnavbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fa fa-bars"></i>
            </button>

            <div class="navbar-nav ml-auto text-xs font-weight-bold text-dark text-uppercase mb-1">
                <h3>{header_name}</h3>
            </div>

            <ul class="navbar-nav ml-auto">
                <div class="topbar-divider d-none d-sm-block"></div>

                <li class="nav-item dropdown no-arrow">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small">
                <div>{userdetails.firstname} {userdetails.lastname}</div>
                <div><span class="badge rounded-pill bg-info text-dark">{userType}</span></div>
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
    </div>
    )}