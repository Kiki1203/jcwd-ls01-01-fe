import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faAngleRight, faAngleLeft, faAngleDown, faPlus, faMinus, } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from "../../../Helpers/API_URL.js"
import Swal from 'sweetalert2';
import './Modal2.css';
import NoImage from '../../../Assets/NoImage.png';

const Modal2 = ({setOpenModal, selected, setSelected}) => {
  const [paymentMethods, setPaymentMethods] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [error, setError] = useState(false)
  const [transactionId, setTransactionId] = useState(null)
  const navigate = useNavigate()
    let [qty, setQty] = useState(1); 
    const [namaObat, setNamaObat] = React.useState("");
    const [beratObat, setBeratObat] = React.useState("");
    const [noBPOM, setNoBPOM] = React.useState("");
    const [kategori, setKategori] = React.useState("");
    const [tanggalKadaluarsa, setTanggalKadaluarsa] = React.useState("");
    const [lokasiSimpan, setLokasiSimpan] = React.useState("");
    const [kuantitas, setKuantitas] = React.useState("");
    const [satuan, setSatuan] = React.useState("");
    const [nilaiBarang, setNilaiBarang] = React.useState("");
    const [nilaiJual, setNilaiJual] = React.useState("");
    const [addImageFileName, setAddImageFileName] = React.useState('Select Image...');
    const [addImageFile, setAddImageFile] =  React.useState(undefined);
    const [previewImage, setpreviewImage] =  React.useState(null);
    const [imageURL, setImageURL] = useState('')
    const [file, setFile] = useState(null);

    const onImagesValidation = (e) => {
        try {
            let file = [...e.target.files]
            setFile(file[0])
            const reader = new FileReader()
            //   reader.readAsDataURL(e.target.files[0])
              reader.onload = () => {
                  if(reader.readyState === 2){
                      setpreviewImage(reader.result)
                  }
              }
            reader.readAsDataURL(file[0])
        } catch (error) {
            console.log(error.message)
        }
    }

  
      let namaObatChange = (event) => {
          setNamaObat(event.target.value)
      }
  
      let beratObatChange = (event) => {
          setBeratObat(event.target.value)
      }
  
      let noBPOMChange = (event) => {
          setNoBPOM(event.target.value)
      }
  
      let kategoriChange = (event) => {
          setKategori(event.target.value)
      }
      let tanggalKadaluarsaChange = (event) => {
          setTanggalKadaluarsa(event.target.value)
      }
  
      let lokasiSimpanChange = (event) => {
          setLokasiSimpan(event.target.value)
      }
  
      let kuantitasChange = (event) => {
          setKuantitas(event.target.value)
      }
  
      let satuanChange = (event) => {
          setSatuan(event.target.value)
      }
  
      let nilaiBarangChange = (event) => {
          setNilaiBarang(event.target.value)
      }
  
      let nilaiJualChange = (event) => {
          setNilaiJual(event.target.value)
      }
  
      const onAddImageFileChange = (e) => {
          if(e.target.files[0]) {
              setAddImageFileName(e.target.files[0].name)
              setAddImageFile(e.target.files[0])
              const reader = new FileReader()
              reader.readAsDataURL(e.target.files[0])
              reader.onload = () => {
                  if(reader.readyState === 2){
                      setpreviewImage(reader.result)
                  }
              }
          }
          else {
              setAddImageFileName('Select Image...')
              setAddImageFile("")
          }
      }
  
      const onBtnAddProduct = () => {
        setLoading(true)
          var formData = new FormData()
          let token = localStorage.getItem('token')
          var headers = {
              headers: {
                  'Authorization': `${token}`,
                  'Content-Type': 'multipart/form-data'
              }
          }
  
          let expired = tanggalKadaluarsa
          expired =expired.split('T')
          expired =expired.join(' ')
  
          if(beratObat.includes('.')){
              var berat = beratObat.split('.').join('')
          }else{
              var berat = beratObat
          }
  
          if(nilaiBarang.includes('.')){
              var nilai = nilaiBarang.split('.').join('')
          }else{
              var nilai = nilaiBarang
          }
  
          if(nilaiJual.includes('.')){
              var harga = nilaiJual.split('.').join('')
          }else{
              var harga = nilaiJual
          }
  
          console.log('ini berat', berat)
          console.log('ini nilai barang', nilai)
          console.log('ini hargajual', harga)
          
          var data = {
              nama_obat: namaObat,
              berat: berat,
              NIE: noBPOM,
              harga: harga,
              nilai_barang: nilai,
              SatuanObat_id: satuan,
              GolonganObat_id: kategori,
              tempat_penyimpanan: lokasiSimpan,
              stok: qty,
              expired: expired,   
          }
  
          formData.append('gambar', file)
          formData.append('data', JSON.stringify(data))
          
          axios.post(API_URL + "/admin/addproduct", formData, headers)
          .then((res) => {
  
              if(res.data.message === "Add Product Success"){
                //   setModalOpen3(true)
                //   setModalOpen(false)
                //   setModalOpen2(false)
              }
              setLoading(false)
          })
          .catch((err) =>{
              Swal.fire({
                  title: 'Error!',
                  text: err.response.data.message,
                  icon: 'error',
                  confirmButtonText: 'Okay!'
              })
              setLoading(false)
          })
      }
     
  
      const handleInc = () => {
          let temp = qty;
          temp += 1;
          setQty(temp);
      }
  
      const handleDec = () => {
          let temp = qty;
          temp -= 1;
          setQty(temp);
      }
  

  return (
    <div className='modal-background fixed-top' onClick={() => setOpenModal(false)}>
      <div className='modal-container-payment' onClick={e => e.stopPropagation()}>
        <FontAwesomeIcon icon={faXmark} className='close-icon' onClick={() => setOpenModal(false)} />
        <p className='modal-title' style={{marginBottom:'15px'}}>Tambah Obat</p>
        <div>
        {
            selected ?
            <>
             <div className='mx-3 d-flex'>
                <div className='button-no-2'>1</div>
                <div className='tulisan-detail-dan-kuantitas '>Detail Obat</div>
                <FontAwesomeIcon icon={faAngleRight} className='logo-slash'  />
                <div className='button-no-1'  style={{marginLeft: '10px'}}>2</div>
                <div className='tulisan-detail-obat-modal'>Detail Kuantitas & Harga</div>
             </div>
             <div className='box-isi-modal-add-product'>
                  <div  className='box-isi-modal-add-product-two'>
                  <div className='box-inside-all-info-product'>
                        <div className='nama-obat-info'>Kuantitas</div>  
                        <div className='inputan-obat-info-4' style={{marginLeft: '-5px'}}>
                            <button id="qty-button-left"  disabled={qty <= 1 ? true : false} onClick={() => setQty(qty - 1)}>
                                <FontAwesomeIcon icon={faMinus} className="qty-icon" />
                            </button>
                             <input
                            type="number"
                            value={qty}
                            id="qty-number"
                            onChange={(e) => {
                                if (e.target.value.length !== 0) {
                                setQty(e.target.valueAsNumber);
                                }
                            }}
                            />
                            <button id="qty-button-right" 
                            onClick={() => setQty(qty + 1)}>
                            <FontAwesomeIcon icon={faPlus} className="qty-icon" />
                            </button>
                            {/* <button className='input-group-text-logo-kuantitas' disabled={qty <= 1 ? true : false}  onClick={() => handleDec()} ><FontAwesomeIcon icon={faMinus} /></button>
                            <div className='form-control border-0 rounded-0 input-kuantitas-obat' style={{marginLeft: '-5px'}} defaultValue={qty}>
                            {qty}
                            </div>
                            <button className='input-group-text-logo-kuantitas' style={{marginTop: '-1.4px', marginLeft:'2px'}}  onClick={() => handleInc()}><FontAwesomeIcon icon={faPlus} /></button> */}
                        </div>                          
                    </div>
                    <div>
                    <div className='box-inside-all-info-product mt-3'>
                        <div className='nama-obat-info'>Satuan</div>  
                        <select 
                        id="inputObatSatuan" 
                        name="satuanObat"
                        onChange={satuanChange} defaultValue={satuan}
                        className="form-control  inputan-obat-info-2"  placeholder="Satuan"
                        >
                            <option value="">Pilih Satuan</option>
                            <option value="1">Strip</option>
                            <option value="2">Botol</option>
                            <option value="3">Tube</option>
                            <option value="4">Box</option>
                            <option value="5">Sachet</option>
                            <option value="6">Piece</option>
                            <option value="7">Kit</option>
                            <option value="8">Pack</option>
                            <option value="9">Kaleng</option>
                        </select>
                        <div className='input-group-text' id="logo-input-group-text-4" ><FontAwesomeIcon icon={faAngleDown} /></div>                 
                    </div>
                    <div className='box-inside-all-info-product mt-3'>
                        <div className='nama-obat-info'>Nilai Barang (Rp)</div>  
                        <input type="number" min="0" className='form-control inputan-obat-info' placeholder='Masukkan Nilai Barang'  onChange={nilaiBarangChange} defaultValue={nilaiBarang}/>
                    </div>
                    <div className='box-inside-all-info-product mt-3'>
                        <div className='nama-obat-info'>Nilai Jual (Rp)</div>  
                        <input type="number" min="0" className='form-control inputan-obat-info' placeholder='Masukkan Nilai Jual'  onChange={nilaiJualChange} defaultValue={nilaiJual}/>                  
                    </div>
                    <div className='box-inside-all-info-product mt-3'>
                        <div className='nama-obat-info'>Foto Obat</div>    
                        <div className='mx-2'>
                        {
                              previewImage? 
                              <img src={previewImage} alt='Image Preview' id='adminImgUploud' /> 
                              : 
                              <img src={NoImage} alt='Image Preview' id='adminImgUploud2' /> 
                          } 
                                
                        </div>
                    </div>
                    <form method="POST" action="/upload" encType='multipart/form-data'>
                        <input type="file" name='photo' accept="image/*" id="image-input" style={{display: 'none'}} onChange={(e) => onImagesValidation(e)} />
                        </form>
                        <label htmlFor='image-input' id="choose-file-produk">Choose image</label>
                </div>
                  </div>
                </div>
             <div className='d-flex mb-3'>
             <button className='btn btn-danger mx-2 w-50' onClick={() => setSelected(null)} >Kembali</button>
             <button className='btn btn-danger w-50'>Simpan</button>
             </div>
            </>
            :
            <>
            <div  className='mx-4 d-flex'>
                <div className='button-no-1'>1</div>
                <div className='tulisan-detail-obat-modal'>Detail Obat</div>
                <FontAwesomeIcon icon={faAngleRight} className='logo-slash'  />
                <div className='button-no-2'>2</div>
                <div className='tulisan-detail-dan-kuantitas'>Detail Kuantitas & Harga</div>
            </div>
            <div className='box-isi-modal-add-product'>
                   <div className='box-isi-modal-add-product-two'>
                   <div className='box-inside-all-info-product'>
                        <div className='nama-obat-info'>Nama Obat</div>  
                        <input type="text" className='form-control inputan-obat-info' placeholder='Masukkan nama obat'  onChange={namaObatChange} defaultValue={namaObat}/>                  
                    </div>
                    <div>
                    <div className='box-inside-all-info-product mt-3'>
                        <div className='nama-obat-info'>Berat</div>  
                        <input type="number" min="0" className='form-control inputan-obat-info' placeholder='Masukkan berat obat (gram)'  onChange={beratObatChange} defaultValue={beratObat}/>                  
                    </div>
                    <div className='box-inside-all-info-product mt-3'>
                        <div className='nama-obat-info'>No.BPOM</div>  
                        <input type="text" className='form-control inputan-obat-info' placeholder='Masukkan no. BPOM'  onChange={noBPOMChange} defaultValue={noBPOM}/>                  
                    </div>
                    <div className='box-inside-all-info-product mt-3'>
                        <div className='nama-obat-info'>Kategori</div>  
                        <select 
                        id="inputObatKategori" 
                        name="kategoriObat"
                        onChange={kategoriChange} defaultValue={kategori}
                        className="form-control  inputan-obat-info-2"  placeholder="Kategori"
                        >
                            <option value="">Pilih Kategori</option>
                            <option value="1">Obat Keras</option>
                            <option value="2">Obat Bebas Terbatas</option>
                            <option value="3">Medical Device & Consumable</option>
                            <option value="4">Lain-lain</option>
                        </select>
                        <div className='input-group-text' id="logo-input-group-text-2" ><FontAwesomeIcon icon={faAngleDown} /></div>
                    </div>
                    <div className='box-inside-all-info-product mt-3'>
                        <div className='nama-obat-info-2' >Tgl. Kadaluarsa</div>  
                        <input type="datetime-local"  onChange={tanggalKadaluarsaChange} defaultValue={tanggalKadaluarsa}
                         placeholder="Tanggal Lahir" className="form-control inputan-obat-info"/>
                    </div>
                    <div className='box-inside-all-info-product mt-3'>
                        <div className='nama-obat-info-3'>Lokasi Penyimpanan</div>  
                        <select 
                        id="inputObatLokasi" 
                        name="LokasiObat"
                        onChange={lokasiSimpanChange} defaultValue={lokasiSimpan}
                        className="form-control inputan-obat-info-3 "  placeholder="Lokasi"
                        >
                            <option value="">Pilih Tempat</option>
                            <option value="Gudang 1">Gudang 1</option>
                            <option value="Gudang 2">Gudang 2</option>
                        </select>
                        <div className='input-group-text' id="logo-input-group-text-3" ><FontAwesomeIcon icon={faAngleDown} /></div>
                    </div>
                </div>
                   </div>
                </div>
            <button className='pilih-metode' onClick={() => setSelected(1)} >Lanjutkan</button>
            </>
            } 
        </div>
      </div>
  </div>
  );
};

export default Modal2;