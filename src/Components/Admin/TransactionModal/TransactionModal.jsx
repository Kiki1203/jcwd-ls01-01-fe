import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import successImg from './../../../Assets/check-mark-illust.svg';
import cancelledImg from './../../../Assets/x-mark-illust.svg';

function TransactionModal({jenis, setOpenModal, setRerender}) {
    const handleClose = () => {
        let elems = document.getElementsByClassName('admin-page-container');
        for (let i = 0; i < elems.length; i++) {
            elems[i].style.overflow = "auto";
        }
        setOpenModal(false)
        setRerender(true)
    }

    return (
        <div className='modal-background fixed-top' onClick={() => handleClose()}>
            <div className='modal-container' style={{height:'440.7px'}} onClick={e => e.stopPropagation()}>
                <FontAwesomeIcon icon={faXmark} className='close-icon' onClick={() => handleClose()} />
            {
                jenis === 'kirim' ? <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <img src={successImg} style={{height:'200px', marginBottom:'20px'}} alt="" />
                    <p className='berhasil-ditambahkan'>Berhasil!</p>
                    <p className='confirm-payment-detail'>Pesanan sedang dalam perjalanan</p>
                </div> :
                jenis === 'tolak' ? <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <img src={cancelledImg} style={{height:'200px', marginBottom:'20px'}} alt="" />
                    <p className='berhasil-ditambahkan'>Pesanan Berhasil Ditolak</p>
                    <p className='confirm-payment-detail'>Pesanan otomatis dipindahkan ke tab 'Pesanan Dibatalkan'</p>
                </div> : ''
            }
            </div>
        </div>
    )
}

export default TransactionModal;