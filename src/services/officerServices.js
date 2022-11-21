import axios from "axios";
import token from "./Token";

//API endpoint
//const APIEndpoint = config.DOMAIN_NAME + '/auth';
const APIEndpoint = "https://agri-mart-web-server.onrender.com/";
//const APIEndpoint = process.env.backend


const getFarmers = (data) => 
  new Promise((resolve, reject) => {
    const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const url = APIEndpoint+'officer/farmerbio/'+data;
    axios
    .get(url,headers)
    .then((res) => {
    if (res.request.status === 200 || res.request.status === 201){
        resolve(res.data.farmers);
    } else {
        reject(res.data.message);
    }
    })
    .catch((err) => {
      reject(err);
    });
});

const getOfficer = (data) => 
  new Promise((resolve, reject) => {
    const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const url = APIEndpoint+'officer/'+data;
    axios
    .get(url,headers)
    .then((res) => {
    if (res.request.status === 200 || res.request.status === 201){
        resolve(res.data.officer);
    } else {
        reject(res.data.message);
    }
    })
    .catch((err) => {
      reject(err);
    });
});

const verifyFarmer = (data) =>
  new Promise((resolve, reject) => {
    console.log("data to update ",data);
    const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const url = APIEndpoint+'officer/farmerVerify';
    axios
    .post(url,data,headers)
    .then((res) => {
    if (res.request.status === 200 || res.request.status === 201){
        resolve(res.data.message);
    } else {
        reject(res.data.message);
    }
    })
    .catch((err) => {
      reject(err);
    });
});


export default {
    getFarmers,
    getOfficer,
    verifyFarmer
  }