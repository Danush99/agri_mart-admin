import React, { useState, useEffect } from "react";
import {Link, useNavigate,useParams,useLocation } from "react-router-dom";
import {Header} from '../../Components/header';
import {Sidebar} from '../../Components/sidebar';

export function AddFiles(){
    const location = useLocation();
    const adminDetails = location.state.admin;
    console.log("adminDetails :",adminDetails)
    const dblink = "/admin/"+adminDetails._id
    return(
<div>
    <body id="page-top">
        <div id="wrapper">
            {/* SideBar */}
            <Sidebar link={dblink}/>
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    {/*Header */}
                    <Header userDetails={adminDetails} header={"Add Agricultural Data"}/>
                    <div class="container-fluid">
                        {/*page content */}
                        <h1>file adding</h1>
                    </div>
                </div>
            </div>
        </div>
    </body>
</div>
    )
}