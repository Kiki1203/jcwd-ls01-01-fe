import React from 'react';
import './Verification.css';
import Axios from 'axios'
import API_URL from "../../../Helpers/API_URL.js"
import VerifyPage from "../../../Assets/VerifyPage.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
// SweetAlert
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
})

const Verification = () => {
  const [isRedirect, setIsRedirect] = useState(false)

  let params = useParams();

  const [message, setMessage] = useState('')

  useEffect(() => {
      Verification()
  }, [])

  const Verification = () => {
    Axios.patch(`${API_URL}/user/verification`, {}, {headers: {
        'Authorization': params.token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }})
    .then((res) => {
        Toast.fire({
            icon: 'success',
            title: res.data.message
        })
        setIsRedirect(true)
        localStorage.setItem('myTkn', params.token)
    })
    .catch((err) => {
        setMessage(err.response.data.message)
        Toast.fire({
            icon: 'error',
            title: err.response.data.message
        })
    })
}

const onResendEmail = () => {
  let token = localStorage.getItem('myTkn')

  Axios.post(`${API_URL}/user/resend`, {}, {headers: {
      'Authorization': token,
      'Accept' : 'application/json',
      'Content-Type': 'application/json'
  }})
  .then((res) => {
      Swal.fire({
          title: 'Success!',
          text: 'Check Your Email',
          icon: 'success',
          confirmButtonText: 'Okay!'
      })
  })
  .catch((err) => {
      console.log(err)
  })
}

  return (
    <div className='container'>
      <div  className="d-lg-block d-md-block d-none" style={{position: 'absolute', height: '109px', left: '-2px',top: '-16px', border: "1px solid blue", width: "1200px"}}>NAVBAR</div>
        <div className="d-lg-none d-md-none d-block box-navbar-verify">
            <div className="logo-to-homepage"><FontAwesomeIcon icon={faAngleLeft} /></div>
            <div className="tulisan-verification">Verification</div>
        </div>
        <div className="logo-verify-page"><img src={VerifyPage} alt=""/></div>
        <div className="tulisan-oops">Oops...sorry, </div>
        <div className="tulisan-not-allowed">You are not allowed to access the homepage, don't forget to verify your account first via email or by clicking the button below:</div>
        <div className="button-resend-email" onClick={() => onResendEmail()}>Resend Email Verification</div>
      <div className="d-lg-block d-md-block d-none" style={{position: 'absolute', height: '480px', left: '0px',top: '1036px', border: "1px solid blue", width: "1200px"}}>FOOTER</div>
   </div>
  );
};

export default Verification;
