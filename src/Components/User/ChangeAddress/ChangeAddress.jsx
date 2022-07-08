import React from 'react';
import './ChangeAddress.css';
import API_URL from "../../../Helpers/API_URL.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function CartModal({addresses, setOpenModal, selected, setSelected, setSelectedKurir}) {
    const navigate = useNavigate()

    return (
        <div className='modal-background fixed-top' onClick={() => setOpenModal(false)}>
            <div className='modal-alamat-container' onClick={e => e.stopPropagation()}>
                <FontAwesomeIcon icon={faXmark} className='close-icon' onClick={() => setOpenModal(false)} />
                <p className='modal-alamat-header'>Pilih Alamat Pengiriman</p>
                <button className='tambah-alamat-baru'>Tambah Alamat Baru</button>
                <div className='alamat-rows-container'>
                {
                    addresses.map((a) => {
                        return <div className='alamat-row' style={{border:`${a.id === selected.id && '1px solid #E0004D'}`}}>
                            <div style={{width:'75%'}}>
                                <div className='d-flex align-items-center'>
                                    <p style={{fontSize:'14px', fontWeight:'700', color:'#213360', margin:'0px'}}>{`${a.nama_depan_penerima} ${a.nama_belakang_penerima}`}</p>
                                    <p style={{fontSize:'14px', color:'#213360', margin:'0 0 0 4px'}}>{`(${a.label_alamat})`}</p>
                                    {
                                        a.alamat_utama === 1 && <span className='alamat-utama'>Utama</span>
                                    }
                                </div>
                                <p style={{fontSize:'14px', color:'#4F618E', margin:'0px'}}>{a.no_hp}</p>
                                <p style={{fontSize:'14px', color:'#4F618E', margin:'0px'}}>{a.alamat}</p>
                                <p style={{fontSize:'14px', color:'#4F618E', margin:'0px'}}>{`${a.kecamatan}, ${a.kabupaten_kota}, ${a.provinsi}, ${a.kode_pos}`}</p>
                            </div>
                            {
                                a.id !== selected.id && <button className='pilih-alamat' onClick={() => {
                                    setSelected(a)
                                    setSelectedKurir(null)
                                    setOpenModal(false)
                                }}>Pilih Alamat</button>
                            }
                    </div>
                    } )
                }
                </div>
            </div>
        </div>
    )
}

export default CartModal;