import React, { useState } from "react";
import './MetodePembayaran.css';
import SidebarProfile2 from "../../../Components/User/SidebarProfile/SidebarProfile2.jsx";
import ModalEditPembayaran from './ModalEditPembayaran';
import ModalTambahRekening from './ModalTambahRekening';


const MetodePembayaranRekening  = () => {   
    let [modalOpen, setModalOpen] = useState(false); 
    
    const handleModalEdit = () => {
        setModalOpen(true);
    }

    return(
        <div className="container-metode-bayar">
            <SidebarProfile2/>
            <div className="box-metode-pembayaran">
                    <div className="d-lg-none d-md-none d-block"><span className="material-icons pinggiran-atas-pembayaran">chevron_left</span></div>
                    <div className="judul-metode-pembayaran">Metode Pembayaran</div>
                    <div className="garis-metode-pembayaran"></div>
                    <div className="tulisan-rekening-bank">Rekening Bank</div>
                    <div className="box-rekening-bank">
                        <div></div>
                        <div className="box-informasi-metode-pembayaran">
                            <div className="nama-bank-tujuan">BCA</div>
                            <div className="nama-lengkap-utama">Jane Done</div>
                            <div id="nomer-rekening-pembayaran">123456789</div>
                        </div>
                        {/* <div className="button-edit-rekening">Edit</div> */}
                        <div>
                        <ModalEditPembayaran
                            modalOpen={modalOpen}
                            handleModal={handleModalEdit}
                        />
                        </div>
                        <div className="button-hapus-rekening">Hapus</div>
                        <ModalTambahRekening
                            modalOpen={modalOpen}
                            handleModal={handleModalEdit}
                        />
                        {/* <div className="button-tambah-metode-pembayaran">Tambah Rekening Bank</div> */}
                        <div className="button-next-metode-pembayaran">1</div>

                    {/* CONTOH TAMPILAN MAPPING  */}
                        <div className="box-pembayaran-selanjutnya">
                            <div></div>
                            <div className="box-informasi-metode-pembayaran">
                                <div className="nama-bank-tujuan">Mandiri</div>
                                <div className="nama-lengkap-utama">Jane Done</div>
                                <div id="nomer-rekening-pembayaran">123456789</div>
                            </div>
                            <div className="button-edit-rekening">Edit</div>
                            <div className="button-hapus-rekening">Hapus</div>
                        </div>
                    </div>
            </div>
            
        </div>
    )
}

export default MetodePembayaranRekening