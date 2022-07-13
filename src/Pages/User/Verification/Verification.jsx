import React, {useState, useEffect} from 'react';
import './Verification.css';
import Axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import VerifyPage from '../../../Assets/VerifyPage.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams, Navigate } from 'react-router-dom'
// SweetAlert
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
});

const Verification = () => {
  const [verified, setVerified] = useState(false);

  const onResendEmail = () => {
    let token = localStorage.getItem('myTkn');

    Axios.post(
      `${API_URL}/user/resend`,
      {},
      {
        headers: {
          Authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        Swal.fire({
          title: 'Success!',
          text: 'Please Check Your Email to Verify',
          icon: 'success',
          confirmButtonText: 'Okay!',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='container-verification'>
        <div className="d-lg-none d-md-none d-block box-navbar-verify">
            <div className="logo-to-homepage"><FontAwesomeIcon icon={faAngleLeft} /></div>
            <div className="tulisan-verification">Verification</div>
        </div>
        <div className='box-verification-page'>
            <div className="logo-verify-page"><img src={VerifyPage} alt=""/></div>
            <div className="tulisan-oops">Oops...sorry, </div>
            <div className="tulisan-not-allowed">You are not allowed to access the homepage, don't forget to verify your account first via email or by clicking the button below:</div>
            <div className="button-resend-email" onClick={() => onResendEmail()}>Resend Email Verification</div>
        </div>
   </div>
  );
};

export default Verification;
