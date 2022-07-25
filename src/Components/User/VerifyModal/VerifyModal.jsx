import React, {useState} from 'react';
import './VerifyModal.css';
import API_URL from "../../../Helpers/API_URL.js"
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
});

function VerifyModal({setOpenModal}) {    
    const [loading, setLoading] = useState(false)

    const handleClose = () => {
        let elems = document.getElementsByTagName('html');

        for (let i = 0; i < elems.length; i++) {
            elems[i].removeAttribute('style');
        }
        setOpenModal(false)
    }

    const onResendEmail = () => {
        let token = localStorage.getItem('myTkn');
        setLoading(true)
        axios.post(
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
            handleClose()
            Swal.fire({
              title: 'Sukses!',
              text: 'Silakan cek email untuk verifikasi',
              icon: 'success',
              confirmButtonText: 'Oke!',
            });
          })
          .catch((err) => {
            console.log(err);
            setLoading(false)
          });
      };
    
    return (
        <div className='modal-background fixed-top' onClick={() => handleClose()}>
            <div className='modal-container-verify' onClick={e => e.stopPropagation()}>
                <FontAwesomeIcon icon={faXmark} className='close-icon' onClick={() => handleClose()} />
                <FontAwesomeIcon icon={faTriangleExclamation} style={{height:'100px', margin:'20px 0px', color:'#ffc1d6'}} />
                <p className='modal-verify-text'>Akun Anda belum terverifikasi. Silakan periksa email Anda atau klik tombol di bawah ini untuk mengirimkan ulang link verifikasi.</p>
                <button className='button-bayar' disable={loading} onClick={() => {
                        onResendEmail()
                    }}>Kirim Link Verifikasi</button>
            </div>
        </div>
    )
}

export default VerifyModal;