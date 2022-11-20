import React, { useState, useEffect } from "react";
import {Link, useNavigate,useParams,useLocation } from "react-router-dom";
import {Farmer} from './farmer';
//import { farmers } from "./testData";
import {
    Button,
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    Alert,
  } from "reactstrap";
import { useGlobalFilter, useRowSelect, useTable } from "react-table";
import Badge from 'react-bootstrap/Badge';
import "./vendor/fontawesome-free/css/all.min.css";
import profilepic from "./img/undraw_profile.svg";
import FarmerServices from "../../services/officerServices";
import {Header} from '../../Components/header';
import {Sidebar} from '../../Components/sidebar';

function checkState(approval){
    var color="warning";
    if(approval=="Idle"){
        color="warning";
    }else if(approval=="Accepted"){
        color="success"
    }else if(approval=="Declined"){
        color="danger"
    }
    return color;
  }

export function VerifyFarmer() {
  const location = useLocation();
  const officerDetails = location.state.officer;
  const officerID = officerDetails._id;
  const officer_id = officerDetails._id;
  const dblink = "/officer/"+officerDetails._id
  console.log("officerDetails: ",officerDetails);
  const [approval, setapproval] = useState("");
  const [farmer_id, setfarmer_id] = useState("");
  const [farmersDetails, setfarmersDetails] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);


  const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmit(true);
    };

  const handleAccept = (e) => {
    const { id } = e.target;
    e.preventDefault();
    setapproval("Accepted");
    setfarmer_id(id);
    setIsSubmit(true);
  };

  const handleDecline = async (e) => {
    const { id } = e.target;
    e.preventDefault();
    setapproval("Declined");
    setfarmer_id(id);
    setIsSubmit(true);
  };
  
  useEffect( ()=> {
    FarmerServices.getFarmers(officerDetails._id)
    .then((farmers)=>{
      setfarmersDetails(farmers);
      console.log("getting farmers is success: ",farmers);
    })
    .catch((err)=>{
      console.log("error : ",err);
    })
    },[alertMessage]);

  useEffect(() => {
    if (isSubmit){
      console.log("update Values: ",approval,officerID);
      FarmerServices.verifyFarmer({"approval":approval,"officer":officerID,"_id":farmer_id})
      .then((msg)=>{
        setAlertType("alert alert-success");
        setAlertMessage(msg);
        setShow(true);
        console.log("success message: ",msg);
      })
      .catch((err)=>{
      setAlertType("alert alert-danger");
      setAlertMessage("");
      setShow(true);
      console.log(err.response.request.status);
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
      })
      }
      setIsSubmit(false);
    },[isSubmit,approval]);

  return(

  <div>
  <body id="page-top">
      <div id="wrapper">
          {/* SideBar */}
          <Sidebar link={dblink}/>
          <div id="content-wrapper" class="d-flex flex-column">
              <div id="content">
                  {/*Header */}
                  <Header userDetails={officerDetails} header={"Farmers"}/>
                  <div class="container-fluid">
                      {/*page content */}
                <div>
                  <br/><br/>
                  <div className="row">
                    <div className="form-group mb-3 col-6">
                    <div style={{  visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
                          {alertMessage}
                    </div>
                    </div>
                  </div>
                  <Table class="table">
                      <thead>
                          <tr>
                          <th scope="col">#</th>
                          <th scope="col">First Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">Approval</th>
                          <th scope="col">Action</th>
                          </tr>
                      </thead>
                      <tbody>
                    {farmersDetails.map(({_id,firstname, lastname,officer,approval}) => (
                          <tr key={_id}>
                            <td>
                              {_id}
                            </td>
                            <td>
                              {firstname} 
                            </td>
                            <td>
                              {lastname}
                            </td>
                            <td>
                              <Badge bg={checkState(approval)} style={{width:"70px", textTransform:"uppercase"}}>{approval}</Badge>
                            </td>
                            <td>
                              <button className="btn btn-outline-primary px-4" data-bs-toggle="modal" data-bs-target={'#farmerView' + _id}>Verify</button>
                            </td>
                          
                          </tr> 
                      ))}
                  </tbody>
                  </Table>

                  {farmersDetails.map((farmerdetails) => (
                  <div className="modal fade" id={'farmerView' + farmerdetails._id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-scrollable">
                      <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="staticBackdropLabel">Verify Farmer</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                          <img class="rounded mx-auto d-block" src={profilepic} style={{width : "60%" }}/>
                          <br/>
                          <form onSubmit={handleSubmit}>
                          <Farmer farmerdetails={farmerdetails} officer_name={officerDetails.firstname}/>
                          <div className="row ms-1">
                          <div class="col-sm-6" ><button className="btn btn-success" type="submit" data-bs-dismiss="modal" id={farmerdetails._id} onClick={handleAccept}>Accept</button></div>
                          <div class="col-sm-6" ><button className="btn btn-danger" type="submit" data-bs-dismiss="modal" id={farmerdetails._id} onClick={handleDecline}>Decline</button></div>
                          </div>
                          </form>
                      </div>
                      <div className="modal-footer">
                      </div>
                      </div>
                  </div>
                  </div>
                  ))}
                

                </div>
                  </div>
              </div>
          </div>
      </div>
  </body>
</div>

  )
}