import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import React, { Redirect } from "react";
import {Login} from "../views/Login/login"
import { Register } from "../views/Register/register";
import { AddFiles } from "../views/Admin/addFiles";
import { ManageOfficer } from "../views/Admin/officerManage";
import { AdminHome } from "../views/Admin/adminHome";
import { OfficerHome } from "../views/Officer/officerHome";
import { VerifyFarmer } from "../views/Officer/farmerVerify";
import { Farmer } from "../views/Officer/farmer";

export function Router(){
    return(
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/register" element={<Register />}/>
          <Route path="/admin/addfiles" element={<AddFiles />}/>
          <Route path="/admin/manageOffficers" element={<ManageOfficer />}/>
          <Route path="/admin/:adminID" element={<AdminHome />}/>
          <Route path="/officer/register" element={<VerifyFarmer />}/>
          <Route path="/officer/:officerID" element={<OfficerHome />}/>
          <Route path="/officer/register/farmerview" element={<Farmer />}/>
          <Route path="*" element={<Error/>} />  
        </Routes>
      </BrowserRouter>
    );
}