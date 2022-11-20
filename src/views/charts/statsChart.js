import React, { useState, useEffect } from "react";
import {Link, useParams,useNavigate } from "react-router-dom";
import AdminServices from "../../services/adminServices";

export function Statchart() {

    const [farmersCount, setfarmerCount] = useState(0);
    const [buyersCount, setbuyersCount] = useState(0);
    const [officersCount, setofficersCount] = useState(0);
    const [primeofficerPerc, setprimeofficerPerc] = useState(0);


    useEffect( ()=> {
        AdminServices.getusersStats()
        .then((userDetails)=>{
            const percentageValue = Math.floor( userDetails.primeofficerPerc )
            const string_value = percentageValue.toString()
            const value = string_value.concat("%")
            setfarmerCount(userDetails.farmerCount)
            setbuyersCount(userDetails.buyersCount)
            setofficersCount(userDetails.officersCount)
            setprimeofficerPerc(value)
        })
        .catch((err)=>{
            console.log("error : ",err);
        })
      },[]);

    return(
    <div class="row" role="chart">

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1 Farmers">
                                Farmers</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{farmersCount}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-people-group fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1 Buyers">
                                Buyers</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{buyersCount}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-users fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1 Officers">
                                Officers</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{officersCount}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-user-secret fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1 POfficer">Prime Officer's percentage
                            </div>
                            <div class="row no-gutters align-items-center">
                                <div class="col-auto">
                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{primeofficerPerc}</div>
                                </div>
                                <div class="col">
                                    <div class="progress progress-sm mr-2">
                                        <div class="progress-bar bg-info" role="progressbar" style={{width : primeofficerPerc , ariaValuenow:primeofficerPerc , ariaValuemin:"0" , ariaValuemax:"100"}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-arrow-up-wide-short fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}