import axios from "axios";
import token from "./Token";

//API endpoint
//const APIEndpoint = config.DOMAIN_NAME + '/auth';
const APIEndpoint = "https://agri-mart-web-server.onrender.com/";
//const APIEndpoint = process.env.backend

const getAdmin = (data) => 
  new Promise((resolve, reject) => {
    console.log("userID",data)
    const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const url = APIEndpoint+'admin/'+data;
    axios
    .get(url,headers)
    .then((res) => {
    if (res.request.status === 200 || res.request.status === 201){
        resolve(res.data.admin);
    } else {
        reject(res.data.message);
    }
    })
    .catch((err) => {
      reject(err);
    });
});

const getOfficers = () =>
  new Promise((resolve, reject) => {
    const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const url = APIEndpoint+'admin/getOfficers';
    axios
    .get(url,headers)
    .then((res) => {
    if (res.request.status === 200 || res.request.status === 201){
        resolve(res.data.officers);
    } else {
        reject(res.data.message);
    }
    })
    .catch((err) => {
      reject(err);
    });
});

const convertOfficer = (data) =>
  new Promise((resolve, reject) => {
    console.log("data to update ",data);
    const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const url = APIEndpoint+'admin/convertOfficer';
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

const getusersStats = () =>
new Promise((resolve, reject) => {
  const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
  const url = APIEndpoint+'admin/getUserStats';
  axios
  .get(url,headers)
  .then((res) => {
  if (res.request.status === 200 || res.request.status === 201){
      resolve(res.data.userDetails);
  } else {
      reject(res.data.message);
  }
  })
  .catch((err) => {
    reject(err);
  });
});

export default {
    getAdmin,
    getOfficers,
    convertOfficer,
    getusersStats
  }