import React, {useState, useEffect} from 'react';
import './PaymentProof.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faImage, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from "../../../Helpers/API_URL.js"
import Swal from 'sweetalert2';

const PaymentProof = ({transactionId, setOpenModal}) => {
    const [previewImage, setpreviewImage] =  useState(null)
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const token = localStorage.getItem('myTkn')

    const onImagesValidation = (e) => {
        try {
            let file = [...e.target.files]
            setFile(file[0])
            if(file.length > 1) throw { message: 'You can only upload 1 image' }
            if(file[0].size > 5000000) throw { message: 'Your file size is too big (>5mb)' }
            if(!file[0].type.includes('image'))  throw { message: 'This file type is not supported'}
            const reader = new FileReader()
              reader.onload = () => {
                  if(reader.readyState === 2){
                      setpreviewImage(reader.result)
                  }
              }
            reader.readAsDataURL(file[0])
            setErrorMessage('')
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const onSubmit = () => {
        var formData = new FormData()
        var headers = {
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        formData.append('image', file)
        var data = {id: transactionId}
        formData.append('data', JSON.stringify(data))
      
        axios.patch(API_URL + "/transaction/uploadpaymentproof", formData, headers)
        .then((res) => {
            setOpenModal(false)
            navigate('/semuapesanan')
            Swal.fire({
                title: 'Berhasil!',
                text: 'Bukti pembayaran Anda berhasil diunggah.',
                icon: 'success',
                confirmButtonText: 'Oke'
            })
        })
        .catch((err) =>{
            setOpenModal(false)
            Swal.fire({
                title: 'Error',
                text: 'Ada yang salah nih :(',
                icon: 'error',
                confirmButtonText: 'Oke'
            })
        })
    }

  return (
    <div className='modal-background fixed-top' onClick={() => setOpenModal(false)}>
      <div className='modal-container-payment' onClick={e => e.stopPropagation()}>
        <FontAwesomeIcon icon={faXmark} className='close-icon' onClick={() => setOpenModal(false)} />
        <p className='modal-title' style={{marginBottom:'15px'}}>Upload Bukti Pembayaran</p>
        {
            previewImage ? 
            <div className='payment-proof-image-container'>
                <img src={previewImage} alt='Image Preview' id='preview-bukti-pembayaran' /> 
            </div>
            : 
            <div className='pre-upload-container'>
                <FontAwesomeIcon icon={faImage} className='image-icon' />
                <form method="POST" action="/upload" encType='multipart/form-data'>
                    <input type="file" name='photo' accept="image/*" id="image-input" style={{display: 'none'}} onChange={(e) => onImagesValidation(e)} />
                </form>
                <label htmlFor='image-input' className='choose-image-button'>Pilih file (maks 5mb)</label>
                {
                    errorMessage && <p style={{margin: '10px', color: '#E0004D;', fontSize:'14px'}}>{errorMessage}</p>
                }
            </div>  
        }
        <button className='pilih-metode' disabled={previewImage === null} onClick={() => {
          onSubmit()
          setOpenModal(false)
            }}>Upload</button>
      </div>
  </div>
  );
};

export default PaymentProof;
