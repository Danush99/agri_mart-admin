import React, { useState, useEffect } from "react";
import Axios from 'axios';

export function Officer(props){
    const officerDetails = props.officerDetails;
    const [officerBiovalues, setValues] = useState({});
    const [toStringBirthday, settoStringBirthday] = useState("");

    useEffect( ()=> {
        setValues(officerDetails)
        const birthday = officerDetails.birthday
        settoStringBirthday(birthday.substring(0,10))
      }, [officerDetails]);

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
                <p class="text-muted mb-0">{officerBiovalues.firstname} {officerBiovalues.lastname}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">NIC number</p>
              </div>
              <div class="col-sm-9">
              <p class="text-muted mb-0">{officerBiovalues.nic_number}</p>
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
              <p class="text-muted mb-0">{officerBiovalues.phone_number}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">District</p>
              </div>
              <div class="col-sm-9">
              <p class="text-muted mb-0">{officerBiovalues.district}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Division</p>
              </div>
              <div class="col-sm-9">
              <p class="text-muted mb-0">{officerBiovalues.division}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Postal Code</p>
              </div>
              <div class="col-sm-9">
              <p class="text-muted mb-0">{officerBiovalues.postal_Code}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}