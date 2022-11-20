import React, { useState, useEffect } from "react";
import {Link, useParams,useNavigate } from "react-router-dom";
import Axios from 'axios';
import logo32x32 from "../assets/logo/logo32x32.png";

export function Sidebar(props) {
    const link = props.link;
    return ( 
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
            <div class="sidebar-brand-icon">
                <img class="img-profile rounded-circle" src={logo32x32}/>
            </div>
            <div class="sidebar-brand-text mx-3">Agri-Mart</div>
        </a>

        <hr class="sidebar-divider my-0"/>

        <Link to={link}>
        <li class="nav-item active">
            <a class="nav-link">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span></a>
        </li>
        </Link>

        <hr class="sidebar-divider"/>



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
    )}