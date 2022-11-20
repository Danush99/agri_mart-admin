import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { Form, Input, Label} from 'reactstrap';
import {Navbar, Container, Nav} from 'react-bootstrap';
import AuthServices from "../../services/AuthServices";
import 'bootstrap/dist/css/bootstrap.css';
import "./styles/login.css";
import "../../assets/logo.png";


//common password - Abc12345@A

//Admin - agrimart2@am.com

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const datta = {}


  const [secErr,setSecErr] = useState({email:"",password:""});
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const loginData = {email:"",password:"",usertype:""};
  const [formValues, setformValues] = useState(loginData);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setformValues({ ...formValues, [name]:value });
  }
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  useEffect(() => {
  if (isSubmit){
    const allData = Object.assign({}, formValues, {mobile:false});
    AuthServices.login(allData)
      .then((user) => {
        //const level = sessionStorage.getItem("paygrade");
        console.log("successfully login: ",user.userType,user._id);
        if (user.userType === 'admin'){
          navigate(`/admin/${user.typeId}`);
        } else if(user.userType === 'officer'){
          navigate(`/officer/${user.typeId}`);
          //navigate('/officer');
        } else {
          console.log("Invalid userType");
          navigate('/');
        }
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
            const errorEm = err.response.data.message
            console.log("all errors",errorEm);
            setSecErr({ ...secErr, ["email"]:errorEm })
            break;
          case 402:
            const errorpw = err.response.data.message
            console.log("all errors",errorpw);
            setSecErr({ ...secErr, ["password"]:errorpw })
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
    }
    setIsSubmit(false);
  },[isSubmit,formValues]);

  return(
      <section class="vh-100">
      <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-9 col-lg-6 col-xl-5">
              <img src={require(`../../assets/logo.png`)} class="img-fluid" alt="Logo image"/>
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form method="post" className="signin-form">

              <div className="row">
                <div className="form-group mb-3 col-6">
                <div style={{ color:"red" , visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
                {alertMessage}
                </div>
                </div>
              </div>

              <div class="form-outline mb-4">
                  <label class="form-label" for="email">Email address</label>
                  <div style={{ color:"red" , visibility: secErr.email!=="" ? "visible":"hidden"}}  role="alert">{secErr.email}</div>
                  <input type="email" class="form-control form-control-lg action-email" placeholder="Enter a valid email address" name="email" id="email" value={formValues.email} onChange={handleChange} required/>
              </div>

              <div class="form-outline mb-4">
                  <label class="form-label" for="password">Password</label>
                  <div style={{ color:"red" , visibility: secErr.password!=="" ? "visible":"hidden"}}  role="alert">{secErr.password}</div>
                  <input type="password" class="form-control form-control-lg action-focus focus" placeholder="Enter the correct password" name="password" id="password" value={formValues.password} onChange={handleChange} required/>
              </div>

              <div class="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" class="btn btn-primary btn-lg" onClick={handleSubmit} style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>Login</button>
              </div>
      
              </form>
          </div>
          </div>
      </div>
      </section>
  )
}