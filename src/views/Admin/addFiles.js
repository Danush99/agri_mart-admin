import React, { useState, useEffect } from "react";
import {Link, useNavigate,useParams,useLocation } from "react-router-dom";
import {Header} from '../../Components/header';
import {Sidebar} from '../../Components/sidebar';

export function AddFiles(){
    const location = useLocation();
    const adminDetails = location.state.admin;
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






    <div class="col-md-6 offset-md-3 mt-5">
        <h4>Upload Your Agricultural Data files Here</h4>
        <br/>
        <form accept-charset="UTF-8" action="https://getform.io/f/{your-form-endpoint-goes-here}" method="POST" enctype="multipart/form-data" target="_blank">
          <div class="form-group">
            <label for="exampleInputName">File Name</label>
            <input type="text" name="fullname" class="form-control" id="exampleInputName" placeholder="" required="required"/>
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Description</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Chart Type</label>
            <select class="form-control" id="exampleFormControlSelect1" name="platform" required="required">
              <option>Line Chart</option>
              <option>Bar chart</option>
              <option>Circle Chart</option>
            </select>
          </div>
          <hr/>
          <div class="form-group mt-3">
            <label class="mr-2">Upload</label>
            <input type="file" name="file"/>
          </div>
          <hr/>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div> 
    
                    </div>
                </div>
            </div>
        </div>
    </body>
</div>
    )
}