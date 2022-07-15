import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faAngleRight, faAngleLeft, faAngleDown, faPlus, faMinus, } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from "../../../../Helpers/API_URL.js"
import Swal from 'sweetalert2';
import './Tampilkan.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const Tampilkan = ({setOpenModal, id}) => {
    let [modalOpen, setModalOpen] = useState(false); 
    const [loading, setLoading] = React.useState(false);
    const [idProduk, setIdProduk]  = useState(id)
    console.log('dataProduk tampilkan', idProduk)
    // console.log('dataProduk tampilkan', idProduk.id)
    const [data, setData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
      
        axios.get(`${API_URL}/transaction/getdetailpesanan?id=${idProduk}`)
        .then((res) => {
            // console.log('detail pesanan atas', res.data.result)
            setData(res.data.result)
            setLoading(false)
           
        }).catch((err) => {
            console.log('ini err get',err)
            setLoading(false)
        })
    }, [])

    const printData = (props) => {
        return data.map((value, index) => {
            return (
              <div  key={index}>
                <div className='box-tampilkan-pesanan'>
              <div className="foto-tampilkan">
                <img src={`${API_URL + '/'}${value.gambar_produk}`} alt='Image Preview' className="foto-produk-semua" />
              </div>
             <div>
                <div className="nama-obat-tampilkan">{value.nama_produk}</div>
                <div className="jumlah-obat-tampilkan">{value.quantity} {value.satuan_produk}</div>
             </div>
              <div className="harga-obat-tampilkan">{`Rp ${value.harga_produk.toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</div>
              </div>
              </div>
            )
        })
    }
  return (
   <>
   {/* <div onClick={() => setModalOpen(true)} >Edit Obat</div>
     <Modal  toggle={() => setModalOpen(true)} isOpen={modalOpen}>
             <ModalBody>
             <div className="button-close-modal-admin-sukses">
                  <FontAwesomeIcon icon={faXmark}  style={{cursor: 'pointer', marginLeft: "100px"}} onClick={() => setOpenModal(false)}/>
                  </div>
                  <div className='box-modal-admin-sukses'>
                     {printData()}
                  </div>
             </ModalBody>
      </Modal> */}
    <div className='modal-background fixed-top' onClick={() => setOpenModal(false)}>
      <div className='modal-container-payment' onClick={e => e.stopPropagation()}>
        <FontAwesomeIcon icon={faXmark} className='close-icon' onClick={() => setOpenModal(false)} />
        <p className='modal-title' style={{marginBottom:'15px'}}>Tambah Obat</p>
        <div>
        {printData()}
        </div>
      </div>
  </div>
   </>
  );
};

export default Tampilkan;