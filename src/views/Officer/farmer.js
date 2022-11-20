import React, { useState, useEffect } from "react";
import Axios from 'axios';

export function Farmer(props){
    const farmerdetails = props.farmerdetails;
    const officer_name = props.offcier_name;
    const [farmerBiovalues, setValues] = useState({});
    const [toStringBirthday, settoStringBirthday] = useState("");


    useEffect( ()=> {
        setValues(farmerdetails)
        const birthday = farmerdetails.birthday
        settoStringBirthday(birthday.substring(0,10))
      }, [farmerdetails]);
    return(
    <div>
      <div class="col-lg-12">
        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Full Name</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{farmerBiovalues.firstname} {farmerBiovalues.lastname}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">NIC number</p>
              </div>
              <div class="col-sm-9">
              <p class="text-muted mb-0">{farmerBiovalues.nic_number}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Birthday</p>
              </div>
              <div class="col-sm-9">
              <p class="text-muted mb-0">{toStringBirthday}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Phone</p>
              </div>
              <div class="col-sm-9">
              <p class="text-muted mb-0">{farmerBiovalues.phone_number}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">District</p>
              </div>
              <div class="col-sm-9">
              <p class="text-muted mb-0">{farmerBiovalues.district}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Division</p>
              </div>
              <div class="col-sm-9">
              <p class="text-muted mb-0">{farmerBiovalues.division}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Postal Code</p>
              </div>
              <div class="col-sm-9">
              <p class="text-muted mb-0">{farmerBiovalues.postal_Code}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">growing crops</p>
              </div>
              <div class="col-sm-9">
              <p class="text-muted mb-0">{farmerBiovalues.crop}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Address</p>
              </div>
              <div class="col-sm-9">
              <p class="text-muted mb-0">{farmerBiovalues.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}