import React, {useState, useEffect} from 'react';
import './PaymentMethod.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from "../../../Helpers/API_URL.js"

const PaymentMethod = ({total, setOpenModal, selected, setSelected}) => {
  const [paymentMethods, setPaymentMethods] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('myTkn')

  useEffect(() => {
    setLoading(true)
    setError(false)
    axios.get(`${API_URL}/transaction/getpaymentmethod`, {headers: {authorization: token}})
    .then(res => {
      setLoading(false)
      setPaymentMethods([...res.data])
    })
    .catch(e => {
      setLoading(false)
      setError(true)
    })
  }, [])

  return (
    <div className='modal-background fixed-top' onClick={() => setOpenModal(false)}>
      <div className='modal-container-payment' onClick={e => e.stopPropagation()}>
        {
          selected &&  <FontAwesomeIcon icon={faAngleLeft} className='back-icon' onClick={() => setSelected(null)} />
        } 
        <FontAwesomeIcon icon={faXmark} className='close-icon' onClick={() => setOpenModal(false)} />
        <p className='modal-title' style={{marginBottom:'15px'}}>Metode Pembayaran</p>
        <div className='total-harga-container-modal'>
          <div>
            <p className='total-harga'>Total Harga</p>
            <p className='rp-total-harga'>{`Rp${total.toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</p>
          </div>
          <p className='lihat-detail'>Lihat Detail</p>
        </div>
        {
          selected ?
          <div className='metode-detail-container'>
            <div className='d-flex align-items-center justify-content-between'>
              <p className='payment-method-name-header'>{selected.metode_pembayaran}</p>
              <img className='payment-method-logo-corner' src={`${API_URL}/${selected.logo}`} alt="" />
            </div>
            <p style={{color:'#213360', fontSize:'13px', fontWeight:'700', margin:'5px 0px'}}>Perhatian:</p>
            <ul>
              {
                selected.cara_bayar_modal.split(',').map((item) => {
                  return <li style={{color:'#4F618E', fontSize:'12px', margin:'0 10px 5px -18px'}}>{item}</li>
                })
              }
            </ul>
          </div> :
          <div className='metode-container'>
            {
              paymentMethods.map((p) => {
                return <div className='payment-method-row' key={p.id} onClick={() => setSelected(p)}>
                  <div className='d-flex align-items-center'>
                    <img className='payment-method-logo' src={`${API_URL}/${p.logo}`} alt="" />
                    <p className='payment-method-name'>{p.metode_pembayaran}</p>
                  </div>
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              })
            }
          </div>
        }
        <button className='pilih-metode' disabled={selected === null} onClick={() => {
                // navigate('/')
                setOpenModal(false)
            }}>Pilih Metode</button>
      </div>
  </div>
  );
};

export default PaymentMethod;
