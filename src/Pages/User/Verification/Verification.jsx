import React, {useState, useEffect} from 'react';
import './Verification.css';
import Axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import VerifyPage from '../../../Assets/VerifyPage.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import FooterMobile from '../../../Components/User/Footer/FooterMobile.jsx'
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
  const [verified, setVerified] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('')
  const navigate = useNavigate()

   const btnLogOut = () => {
    localStorage.removeItem('myTkn');
    navigate("/")
  }
  const onResendEmail = () => {
    let token = localStorage.getItem('myTkn');
    setLoading(true)
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
        setLoading(false)
        Swal.fire({
          title: 'Success!',
          text: 'Silahkan Check Email untuk Verifikasi',
          icon: 'success',
          confirmButtonText: 'Okay!',
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  };

  useEffect(() => {
    let tokens = localStorage.getItem('myTkn')
    const headers = {
        headers: { 
            'Authorization': `${tokens}`,
        }
    }
    Axios.get(`${API_URL}/user/checkuserverify`, headers)
    .then((res) => {
        setVerified(res.data.verified)
        setToken(res.data.token)
    }).catch((err) => {
        console.log('ini err get',err)
    })
  }, [verified])

  if(verified === 1 || !localStorage.getItem('myTkn')){
    return(
      <Navigate to='/' />
    )
  }

  return (
   <>
    <div className='container-verification'>
        <div className="d-lg-none d-md-none d-block navbar-pro">
            <FontAwesomeIcon icon={faAngleLeft} className="logove1" />
            <div className="tulisan-verification">Verification</div>
            <FontAwesomeIcon icon={faArrowRightFromBracket}  onClick={() => btnLogOut()} style={{textDecoration: "none", cursor:"pointer", marginLeft: "320px", marginTop: "50px"}} />
        </div>
        <div className='box-verification-page'>
            <div className="logo-verify-page"><img src={VerifyPage} alt=""/></div>
            <div className="tulisan-oops">Oops... Maaf, </div>
            <div className="tulisan-not-allowed">Anda tidak diizinkan mengakses halaman yang Anda tuju. Jangan lupa untuk menverifikasi akun Anda, atau klik tombol di bawah ini untuk mengirim ulang link verifikasi:</div>

            <button className="button-resend-email" disabled={loading} onClick={() => onResendEmail()}>
              {
                loading ?
                'Loading...'
                :
                'Resend Email Verification'
              }
            </button>
        </div>
   </div>
   <FooterMobile/>
   </>
  );
};

export default Verification;
