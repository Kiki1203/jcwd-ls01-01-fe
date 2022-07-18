import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faAngleRight, faAngleDown, faPlus, faMinus, } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import API_URL from "../../../Helpers/API_URL.js"
import Swal from 'sweetalert2';
import './ModalTambahObat.css';
import NoImage from '../../../Assets/NoImage.png';
import default1 from '../../../Assets/SuccessAP.svg';

const ModalTambahObat = ({setOpenModal, selected, setSelected}) => {
    const [loading, setLoading] = useState(false)
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
    const [errorMessage, setErrorMessage] = useState('')
 
    const onImagesValidation = (e) => {
        try {
            let file = [...e.target.files]
            setFile(file[0])
            if(file.length > 1) throw { message: 'Hanya Bisa Uploud 1 Image Saja' }
            if(file[0].size > 4000000) throw { message: 'File Tidak Boleh Lebih Dari 5 Mb' }
            if(!file[0].type.includes('image'))  throw { message: 'Jenis File Tidak Mendukung'}
            const reader = new FileReader()
            //   reader.readAsDataURL(e.target.files[0])
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
                setSelected(3)
                setNamaObat("")
                setNoBPOM("")
                setKategori("")
                setTanggalKadaluarsa("")
                setBeratObat("")
                setLokasiSimpan("")
                setKuantitas("")
                setSatuan("")
                setNilaiBarang("")
                setNilaiJual("")
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
  
      const backData = () => {
        setSelected(null)
        setOpenModal(false)
    }


  return (
    <div className='modal-background fixed-top' onClick={() => setOpenModal(false)}>
      <div className='modal-container-add' onClick={e => e.stopPropagation()}>
        {
            selected  === 3 ?
            <>
             <FontAwesomeIcon icon={faXmark} className='close-icon-add' style={{marginRight: '30px', marginTop: '10px'}} onClick={() => backData()} />
            </>
            :
            <>
           <FontAwesomeIcon icon={faXmark} className='close-icon-add' onClick={() => setOpenModal(false)} />
            <p className='modal-title-add' style={{marginBottom:'15px'}}>Tambah Obat</p>
            </>
        }
        <div>
            {
                selected === 3 ? 
                <>
                <div className="box-navbar-modal-3">
                    <div className='mt-4' style={{marginLeft: '-10px'}}> <img  src={default1} alt='Image Preview' id='adminImgSukses' /></div>
                     <div className='box-khusus-tulisan'>
                          <div className='tulisan-sukses-add-produk'>Obat Berhasil Ditambahkan!</div>
                          <div className='tulisan-sukses-add-produk-2'>Jumlah stok diperbarui secara otomatis</div>
                     </div>
                </div>
                </>
                :
                <>
                  {
                    selected === 1 ?
                    <>
                    <div className="box-navbar-modal">
                        <div className='button-no-2' style={{marginLeft: '-5px'}}>1</div>
                        <div className='tulisan-detail-dan-kuantitas'>Detail Obat</div>
                        <FontAwesomeIcon icon={faAngleRight} className='logo-slash mx-2'  />
                        <div className='button-no-1'>2</div>
                        <div  className='tulisan-detail-obat-modal'>Detail Kuantitas & Harga</div>
                    </div>
                    <div className="box-navbar-modal-2">
                        <div className='d-flex'>
                            <div className='nama-obat-info'>Kuantitas</div>  
                            <div className='inputan-obat-info-2'>
                                <button id="qty-add-button-left"  disabled={qty <= 1 ? true : false} onClick={() => setQty(qty - 1)}>
                                    <FontAwesomeIcon icon={faMinus} className="qty-add-icon" />
                                    </button>
                                    <input
                                    type="number"
                                    value={qty}
                                    id="qty-add-number"
                                    onChange={(e) => {
                                        if (e.target.value.length !== 0) {
                                        setQty(e.target.valueAsNumber);
                                        }
                                    }}
                                    />
                                    <button id="qty-add-button-right" 
                                    onClick={() => setQty(qty + 1)}>
                                    <FontAwesomeIcon icon={faPlus} className="qty-add-icon" />
                                </button>
                            </div>
                        </div>
                        <div className='d-flex mt-2'>
                            <div className='nama-obat-info'>Satuan</div>  
                            <select 
                            id="inputObatSatuan" 
                            name="satuanObat"
                            onChange={satuanChange} defaultValue={satuan}
                            className="form-control inputan-obat-info"  placeholder="Satuan"
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
                             <div className="input-group-text logo-input-group-text-4" ><FontAwesomeIcon icon={faAngleDown} /></div>  
                        </div>
                        <div className='d-flex mt-2'>
                            <div className='nama-obat-info'>Nilai Barang (Rp)</div>  
                            <input type="number" min="0" className='form-control inputan-obat-info' placeholder='Masukkan Nilai Barang'  onChange={nilaiBarangChange} defaultValue={nilaiBarang}/>
                        </div>
                        <div className='d-flex mt-2'>
                            <div className='nama-obat-info'>Nilai Jual (Rp)</div>  
                            <input type="number" min="0" className='form-control inputan-obat-info' placeholder='Masukkan Nilai Jual'  onChange={nilaiJualChange} defaultValue={nilaiJual}/>  
                        </div>
                        <div className='d-flex mt-2'>
                            <div className='nama-obat-info'>Foto Obat</div>  
                            <div  className='inputan-obat-info-3'>
                                {
                                    previewImage? 
                                    <img src={previewImage} alt='Image Preview' className='adminImgUploud2' /> 
                                    : 
                                    <img src={NoImage} alt='Image Preview' className='adminImgUploud2' /> 
                                } 
                            </div>
                        </div>
                        <div className='nama-obat-info-2'>
                                <form method="POST" action="/upload" encType='multipart/form-data'>
                                <input type="file" name='photo' accept="image/*" id="image-input" style={{display: 'none'}} onChange={(e) => onImagesValidation(e)} />
                                </form>
                                <label htmlFor='image-input' className="choose-file-produk">Choose image</label>
                        </div>  
                    </div>
                    <div className='error-msg'>
                        {
                            file ? 
                            <>
                            {
                                errorMessage === "Cannot read properties of undefined (reading 'size')" || errorMessage === "Failed to execute 'readAsDataURL' on 'FileReader': The object is already busy reading Blobs."?
                                <></>
                                :
                                <p style={{margin: '10px', color: '#E0004D;', fontSize:'14px'}}>{errorMessage}</p>
                            }
                            </>
                            :
                            <></>
                        }
                   
                    </div>
                    <div className='d-flex'>
                        <button className='pilih-metode-add-2 mx-2 w-50' onClick={() => setSelected(null)} >Kembali</button>
                        <button className='pilih-metode-add-2 w-50' disabled={loading} onClick={() => onBtnAddProduct ()}> Simpan </button>
                    </div>
                    </>
                    :
                    <>
                    <div className="box-navbar-modal">
                        <div className='button-no-1'>1</div>
                        <div className='tulisan-detail-obat-modal'>Detail Obat</div>
                        <FontAwesomeIcon icon={faAngleRight} className='logo-slash'  />
                        <div className='button-no-2'>2</div>
                        <div className='tulisan-detail-dan-kuantitas'>Detail Kuantitas & Harga</div>
                    </div>
                    <div className="box-navbar-modal-2">
                        <div className='d-flex'>
                            <div className='nama-obat-info'>Nama Obat</div>  
                            <input type="text" className='form-control inputan-obat-info' placeholder='Masukkan nama obat'  onChange={namaObatChange} defaultValue={namaObat}/>                  
                        </div>
                        <div className='d-flex mt-2'>
                            <div className='nama-obat-info'>Berat</div>  
                            <input type="number" min="0" className='form-control inputan-obat-info' placeholder='Masukkan berat obat (gram)'  onChange={beratObatChange} defaultValue={beratObat}/>               
                        </div>
                        <div className='d-flex mt-2'>
                            <div className='nama-obat-info'>No.BPOM</div>  
                            <input type="text" className='form-control inputan-obat-info' placeholder='Masukkan no. BPOM'  onChange={noBPOMChange} defaultValue={noBPOM}/>                  
                        </div>
                        <div className='d-flex mt-2'>
                            <div className='nama-obat-info'>Kategori</div>  
                            <select 
                            id="inputObatKategori" 
                            name="kategoriObat"
                            onChange={kategoriChange} defaultValue={kategori}
                            className="form-control inputan-obat-info"  placeholder="Kategori"
                            >
                                <option value="">Pilih Kategori</option>
                                <option value="1">Obat Keras</option>
                                <option value="2">Obat Bebas Terbatas</option>
                                <option value="3">Medical Device & Consumable</option>
                                <option value="4">Lain-lain</option>
                            </select>
                            <div className='input-group-text logo-input-group-text-2' ><FontAwesomeIcon icon={faAngleDown} /></div>  
                        </div>
                        <div className='d-flex mt-2'>
                            <div className='nama-obat-info' >Tgl. Kadaluarsa</div>  
                            <input type="date"  onChange={tanggalKadaluarsaChange} defaultValue={tanggalKadaluarsa}
                            placeholder="Tanggal Lahir" className="form-control inputan-obat-info"/>
                        </div>
                        <div className='d-flex mt-2'>
                            <div className='nama-obat-info' >Lokasi Simpan</div>  
                            <select 
                            id="inputObatLokasi" 
                            name="LokasiObat"
                            onChange={lokasiSimpanChange} defaultValue={lokasiSimpan}
                            className="form-control inputan-obat-info "  placeholder="Lokasi"
                            >
                                <option value="">Pilih Tempat</option>
                                <option value="Gudang 1">Gudang 1</option>
                                <option value="Gudang 2">Gudang 2</option>
                            </select>
                            <div className='input-group-text logo-input-group-text-3'><FontAwesomeIcon icon={faAngleDown} /></div>
                        </div>
                        
                    </div>
                    <button className='pilih-metode-add w-50' style={{marginTop: '10px'}} onClick={() => setSelected(1)} >Lanjutkan</button>
                    </>
                    } 
                </>
            
            }
      
        </div>
      </div>
  </div>
  );
};

export default ModalTambahObat;