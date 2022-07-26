import React, { useState, useEffect } from "react";
import './UploadSuccess.css';
import uploadsuccess from '../../../Assets/uploadSuccess.svg';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';

const UploadSuccess = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
    const [verified, setVerified] = useState('')
    const [tokenUser, setTokenUser] = useState("");
    useEffect(() => {
      setLoading(true)
      let tokens = localStorage.getItem('myTkn')
      const headers = {
          headers: { 
              'Authorization': `${tokens}`,
          }
      }
      axios.get(`${API_URL}/user/checkuserverify`, headers)
      .then((res) => {
        setLoading(false)
          setVerified(res.data.verified)
          setTokenUser(res.data.token)
      }).catch((err) => {
          console.log('ini err get',err)
          setLoading(false)
      })
    }, [tokenUser, verified])

 const uploudSukses = () => {
  return (
    <div className="container-fluid container-upload-success">
      <div className="row justify-content-center">
        <div className="mb-4 col-12 mb-5 text-center">
          {' '}
          <img src={uploadsuccess} alt="" />
        </div>
        <div className="mb-2 col-12 text-center mkm">Upload Recipe Successful!</div>
        <div className="mb-5 col-12 text-center spa">You will get a notification if your doctor's prescription is confirmed by the admin</div>
        <div className="row justify-content-center">
          <div className="mb-2 col-6 text-center ">
            <button class="btn btn-danger button-au w-100" onClick={() => navigate(`/menunggukonfirmasi`)}>
              Order Progress
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className=" col-6 text-center">
            <button class="btn btn-outline-danger button-au w-100 " onClick={() => navigate(`/`)}>
              Back To Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
 }

  if(localStorage.getItem('myTkn')){
    if(verified === 0){
      return(
        <Navigate to='/verification' />
      )
    }else{
      return(
        <>{uploudSukses()}</>
      )
    }
  }else{
    if(localStorage.getItem('token') === tokenUser){
      if(verified === 0){
        return(
          <Navigate to='/verification' />
        )
      }else{
        return(
          <>{uploudSukses()}</>
        )  
      }
    }else{
      return(
        <Navigate to='/' />
      ) 
    }
  }
};

export default UploadSuccess;
