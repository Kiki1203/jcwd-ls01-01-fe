import axios from 'axios';
import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './MetodePembayaran.css';

const ModalTambahRekening = (props) => {

    let [modalOpen, setModalOpen] = useState(false); 
    

    return (
        <>
        <div type="button"  onClick={() => setModalOpen(true)}  className="button-tambah-metode-pembayaran">
         Tambah Rekening Bank
        </div>
         <Modal className="box-modal-edit-pembayaran"  toggle={() => setModalOpen(false)} isOpen={modalOpen}>
            <ModalBody>
                <>
                <div className='d-flex'>
                <span className="material-icons" style={{marginRight: "10px", cursor:"pointer", fontSize: "14px"}}  onClick={() => setModalOpen(false)}>close</span>
                <div className='judul-edit-metode-pembayaran'>Tambah Metode Pembayaran</div>
                </div>
                  <div className="baris-edit-metode-pembayaran-1">
                    <input type="text" className="form-control input-edit-metode-pembayaran-1" placeholder="Nama Lengkap" />
                  </div>
                  <div className="form-group baris-edit-metode-pembayaran-2">
                      <input type="text" className="form-control input-edit-metode-pembayaran-2"  placeholder="Nomor Rekening" />
                  </div>
                  <div className="form-group baris-edit-metode-pembayaran-3">
                    {/* SEHARUSNYA DROP DOWN */}
                      <input type="text" className="form-control input-edit-metode-pembayaran-3"  placeholder="Nama Bank" />
                  </div>  
                  <button type="submit" className="button-batalkan-edit-metode-pembayaran"  onClick={() => setModalOpen(false)}>Batalkan</button>
                  <button type="submit" className="button-simpan-edit-metode-pembayaran">Simpan</button>
                </>
            </ModalBody>
        </Modal>
        </>
       
    )
}

export default ModalTambahRekening;