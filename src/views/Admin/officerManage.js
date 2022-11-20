import React, { useState, useEffect } from "react";
import {Link, useNavigate,useParams,useLocation } from "react-router-dom";
import {Officer} from './officer';
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
import AdminServices from "../../services/adminServices";

function checkState(officerType){
    var color="warning";
    if(officerType=="false"){
        color="warning";
    }else if(officerType=="true"){
        color="success"
    }
    return color;
  }

export function ManageOfficer() {
  const location = useLocation();
  const adminDetails = location.state.admin;
  const admin_ID = adminDetails._id;
  const dblink =  "/admin/"+admin_ID
  const [officerType, setofficerType] = useState("");
  const [officer_id, setofficer_id] = useState("");
  const [officersDetails, setOfficerDetails] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);


  const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmit(true);
    };

  const handlePO = (e) => {
    const { id } = e.target;
    e.preventDefault();
    setofficerType("true");
    setofficer_id(id);
    setIsSubmit(true);
  };

  const handleNO = async (e) => {
    const { id } = e.target;
    e.preventDefault();
    setofficerType("false");
    setofficer_id(id);
    setIsSubmit(true);
  };
  
  useEffect( ()=> {
    AdminServices.getOfficers()
    .then((officers)=>{
      setOfficerDetails(officers);
      console.log("getting officers is success: ",officers);
    })
    .catch((err)=>{
      console.log("error : ",err);
    })
    },[alertMessage]);


    //updation
  useEffect(() => {
    if (isSubmit){
      console.log("update Values: ",officerType,officer_id);
      AdminServices.convertOfficer({"officerType":officerType,"officer":officer_id})
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
    },[isSubmit,officerType]);

  return(

  <div>
  <body id="page-top">
      <div id="wrapper">
          {/* SideBar */}
          <Sidebar link={dblink}/>
          <div id="content-wrapper" class="d-flex flex-column">
              <div id="content">
                  {/*Header */}
                  <Header userDetails={adminDetails} header={"Farmers"}/>
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
                          <th scope="col">officerType</th>
                          <th scope="col">Action</th>
                          </tr>
                      </thead>
                      <tbody>
                    {officersDetails.map(({_id,firstname,lastname,prime_officer}) => (
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
                              <Badge bg={checkState(prime_officer)} style={{width:"115px", textTransform:"uppercase"}}>{prime_officer==="true"?"Prime Officer":"Normal Officer"}</Badge>
                            </td>
                            <td>
                              <button className="btn btn-outline-primary px-4" data-bs-toggle="modal" data-bs-target={'#farmerView' + _id}>Convert</button>
                            </td>
                          
                          </tr> 
                      ))}
                  </tbody>
                  </Table>

                  {officersDetails.map((officerdetails) => (
                  <div className="modal fade" id={'farmerView' + officerdetails._id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-scrollable">
                      <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="staticBackdropLabel">Officer Details</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                          <img class="rounded mx-auto d-block" src={profilepic} style={{width : "60%" }}/>
                          <br/>
                          <form onSubmit={handleSubmit}>
                          <Officer officerDetails={officerdetails}/>
                          <div className="row ms-1">
                          <div class="col-sm-6" ><button className="btn btn-success" type="submit" data-bs-dismiss="modal" id={officerdetails._id} onClick={handlePO}>Convert to a PrimeOfficer</button></div>
                          <br/><br/>
                          <div class="col-sm-6" ><button className="btn btn-warning" type="submit" data-bs-dismiss="modal" id={officerdetails._id} onClick={handleNO}>Convert to a normalOfficer</button></div>
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