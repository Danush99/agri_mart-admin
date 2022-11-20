import React, { useState,useEffect } from "react";
import {Link, useNavigate,useParams,useLocation } from "react-router-dom";
import Axios from 'axios';
import { dataJson,locations } from "./data";
import 'bootstrap/dist/css/bootstrap.css';
import AuthServices from "../../services/AuthServices";
import {Header} from '../../Components/header';
import {Sidebar} from '../../Components/sidebar';




export function Register() {
  const navigate = useNavigate();
  const [secErr,setSecErr] = useState(dataJson);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formValues, setformValues] = useState(dataJson);
  const [distSelect, setdistSelect] = useState(locations.districts);
  const [divSelect, setdivSelect] = useState([]);
  const location = useLocation();
  const adminDetails = location.state.admin;
  const dblink = "/admin/"+adminDetails._id

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]:value });
    if(name=="district"){
      const divisions = locations.divisions
      setdivSelect(divisions[value].cities)
    }
  };
  
  const handleSubmit = (e) => {
    console.log("submited.....");
    e.preventDefault();
    setIsSubmit(true);
  }

  const handlePrimeOfficer = (e) =>{
    console.log("switch pressed.....");
    if(formValues.prime_officer!=="true"){
      setformValues({ ...formValues, ["prime_officer"]:"true" });
    }else if(formValues.prime_officer!=="false"){
      setformValues({ ...formValues, ["prime_officer"]:"false" });
    }
  }

  useEffect( ()=>{
    console.log("fromValues: ",formValues);
    console.log("secErr: ",secErr);
  },[formValues,secErr])
  
  useEffect(() => {
    if (isSubmit) {
      AuthServices.register(formValues)
      .then((msg) => {
        console.log("backend msg: ",msg);
        navigate(`/admin/${adminDetails._id}`);
      })
      .catch((err) => {
        console.log(err.response.request.status);
        setAlertType("alert alert-danger");
        setAlertMessage("");
        switch (err.response.request.status) {
          case 400:
            const all_errs = err.response.data.message
            console.log("all errors",all_errs);
            all_errs.map(item => setSecErr({ ...secErr, [item.context.label]:item.message }) )
            break;
          case 401:
            const errorPW = err.response.data.message
            console.log("all errors",errorPW);
            setSecErr({ ...secErr, ["password1"]:errorPW })
            break;
          case 402:
            const errorEm = err.response.data.message
            console.log("all errors",errorEm);
            setSecErr({ ...secErr, ["email"]:errorEm })
            break;
          case 500:
            setAlertMessage("Server Error!");
            setShow(true);
            break;
          case 501:
            setAlertMessage("Server Error!");
            setShow(true);
            break;
          case 502:
            setAlertMessage("Server Error!");
            setShow(true);
            break;
          default:
            break;
        }
      });
      setIsSubmit(false);
  }
  },[isSubmit,formValues]);
  //console.log("All data: ",dataJson)

  return(

    <div>
    <body id="page-top">
        <div id="wrapper">
            {/* SideBar */}
            <Sidebar link={dblink}/>
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    {/*Header */}
                    <Header userDetails={adminDetails} header={"Officer Registration"}/>
                    <div class="container-fluid">
                        {/*page content */}
                        <div className="container ">
          


          <div className="Container-fluid background-reg">
            <div className="row justify-content-center ">
    
              <br/><br/><br/><br/>
    
              <form method="post" className="signin-form" onSubmit={handleSubmit}>
    
                <div className="row">
                  <div className="form-group mb-3 col-6">
                  <div style={{ color:"red" , visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
                  {alertMessage}
                  </div>
                  </div>
                </div>
    
                <div className="row">
                  <div className="form-group mb-3 col-6">
    
                    <label className="label" >Firstname</label>
                    <div style={{ color:"red" , visibility: secErr.firstname!=="" ? "visible":"hidden"}}  role="alert">{secErr.firstname}</div>
                    <input type="text" className="form-control" name="firstname" id="firstname" value={formValues.firstname} onChange={handleChange} required/>
                  </div>
                  <div className="form-group mb-3 col-6">
                  <label className="label" >Lastname</label>
                  <div style={{ color:"red" , visibility: secErr.lastname!=="" ? "visible":"hidden"}}  role="alert">{secErr.lastname}</div>
                  <input type="text" className="form-control" name="lastname" id="lastname" value={formValues.lastname} onChange={handleChange} required/>
                  </div>
                </div>
    
                <div className="row">
    
                  <div className="form-group mb-3 col-6">
                    <label className="label" >Birthday</label>
                    <div style={{ color:"red" , visibility: secErr.birthday!=="" ? "visible":"hidden"}}  role="alert">{secErr.birthday}</div>
                    <input type="date" className="form-control"  name="birthday" id="birthday" value={formValues.birthday} onChange={handleChange} required/>
                  </div>
                  <div className="form-group mb-3 col-6">
                    <label className="label" >nic_number</label>
                    <div style={{ color:"red" , visibility: secErr.nic_number!=="" ? "visible":"hidden"}}  role="alert">{secErr.nic_number}</div>
                    <input type="text" className="form-control"  name="nic_number" id="nic_number" value={formValues.nic_number} onChange={handleChange} required/>
                  </div>
    
                </div>
    
                <div className="row">
                  <div className="form-group mb-3 col-6">
                      <label className="label" >phone_number</label>
                      <div style={{ color:"red" , visibility: secErr.phone_number!=="" ? "visible":"hidden"}}  role="alert">{secErr.phone_number}</div>
                      <input type="text" maxLength="10" className="form-control"  name="phone_number" id="phone_number" value={formValues.phone_number} onChange={handleChange} required/>
                  </div>
                  <div className="form-group mb-3 col-6">
                    <label className="label" >Postal code</label>
                    <div style={{ color:"red" , visibility: secErr.postal_Code!=="" ? "visible":"hidden"}}  role="alert">{secErr.postal_Code}</div>
                    <input type="number" className="form-control"  name="postal_Code" id="postal_Code" value={formValues.postal_Code} onChange={handleChange} required/>
                  </div>
                </div>
                
                <br/>
    
                <div className="row">
    
                  <div className="form-group mb-3 col-6">
                    <label className="label" >District</label>
                    <div style={{ color:"red" , visibility: secErr.district!=="" ? "visible":"hidden"}}  role="alert">{secErr.district}</div>
                    {/* <input type="text" className="form-control"  name="district" id="district" value={formValues.district} onChange={handleChange} required/> */}
                    <select className="custom-select custom-select-lg mb-3" name="district" id="district" value={formValues.district} onChange={handleChange} >
                      <option >Select the District</option>
                      {distSelect.map(item=><option key={distSelect.indexOf(item)} value={item}>{item}</option>)}
                    </select>
                  </div>
    
                  <div className="form-group mb-3 col-6">
                    <label className="label" >Division</label>
                    <div style={{ color:"red" , visibility: secErr.division!=="" ? "visible":"hidden"}}  role="alert">{secErr.division}</div>
                    {/* <input type="text" className="form-control"  name="division" id="division" value={formValues.division} onChange={handleChange} required/> */}
                    <select className="custom-select custom-select-lg mb-3" name="division" id="division" value={formValues.division} onChange={handleChange} >
                      <option >Select the Division</option>
                      {divSelect.map(item=><option key={divSelect.indexOf(item)} value={item}>{item}</option>)}
                    </select>
                  </div>
                </div>

                <div className="row">
                <div className="form-group mb-3 col-6"></div>
                <div className="form-group mb-3 col-6">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={handlePrimeOfficer}/>
                    <label class="form-check-label" for="flexSwitchCheckChecked">Prime Officer</label>
                  </div>
                </div>
                </div>
    
                <br/><br/>
    
                <h3>Credentials</h3>
    
                {/* <div className="form-group mb-3">
                  <label className="label" >username</label>
                  <input type="text" className="form-control"  name="username" id="username" value={formValues.username} onChange={handleChange} required/>
                </div> */}
    
                <div className="form-group mb-3 col-6">
                    <label className="label" >Email</label>
                    <div style={{ color:"red" , visibility: secErr.email!=="" ? "visible":"hidden"}}  role="alert">{secErr.email}</div>
                    <input type="email" className="form-control"  name="email" id="email" value={formValues.email} onChange={handleChange} required/>
                </div>
    
                <div className="form-group mb-3 col-6">
                  <label className="label" >password</label>
                  <div style={{color:"red" , visibility: secErr.password1!=="" ? "visible":"hidden"}}  role="alert">{secErr.password1}</div>
                  <input type="password" className="form-control"  name="password1" id="password1" value={formValues.password1} onChange={handleChange} required/>
                </div>
    
                <div className="form-group mb-3 col-6">
                  <label className="label" >confimation password</label>
                  <div style={{ color:"red" , visibility: secErr.password2!=="" ? "visible":"hidden"}}  role="alert">{secErr.password2}</div>
                  <input type="password" className="form-control"  name="password2" id="password2" value={formValues.password2} onChange={handleChange} required/>
                </div>
    
                <div className="form-group mb-3 col-3">
                  <button type="submit" className="form-control btn btn-info rounded submit mb-3 px-3" >
                  Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>


                    </div>
                </div>
            </div>
        </div>
    </body>
</div>
  );
}