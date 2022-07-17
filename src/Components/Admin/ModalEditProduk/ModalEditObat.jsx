import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './ModalEditObat.css';
import API_URL  from '../../../Helpers/API_URL.js';
import NoImage from '../../../Assets/NoImage.png';
import Swal from 'sweetalert2';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import default1 from '../../../Assets/SuccessAP.svg';
import { faAngleRight, faXmark, faAngleDown, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';

const ModalEditObat = ({setOpenModal, selected, setSelected, id}) => {
    let [modalOpen, setModalOpen] = useState(false); 
    let [modalOpen2, setModalOpen2] = useState(false); 
    let [modalOpen3, setModalOpen3] = useState(false); 
    const [loading, setLoading] = React.useState(false);
    let [qty, setQty] = useState(1); 
    const [idProduk, setIdProduk]  = useState(id)
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
    const [gambar, setGambar]  = React.useState("");
    const [addImageFile, setAddImageFile] =  React.useState(undefined);
    const [previewImage, setpreviewImage] =  React.useState(null);
    const [imageURL, setImageURL] = useState('')
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        let token = localStorage.getItem('token')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
    
        axios.get(`${API_URL}/admin/getprodukID?id=${idProduk}`, headers)
        .then((res) => {
            setNamaObat(res.data[0].nama_obat)
            setBeratObat(res.data[0].berat)
            setNoBPOM(res.data[0].NIE)
            setKategori(res.data[0].golonganObat_id)
            setTanggalKadaluarsa(res.data[0].expired)
            setLokasiSimpan(res.data[0].tempat_penyimpanan)
            setQty(res.data[0].stok)
            setSatuan(res.data[0].satuanObat_id)
            setNilaiBarang(res.data[0].nilai_barang)
            setNilaiJual(res.data[0].harga)
            setGambar(res.data[0].gambar)

        }).catch((err) => {
            console.log('ini err get',err)
        })
        }, [])

     
    

  
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

      const onImagesValidation = (e) => {
        try {
            let file = [...e.target.files]
            setFile(file[0])
            if(file.length > 1) throw { message: 'Hanya Bisa Uploud 1 Image Saja' }
            if(file[0].size > 4000000) throw { message: 'File Tidak Boleh Lebih Dari 5 Mb' }
            if(!file[0].type.includes('image'))  throw { message: 'Jenis File Tidak Mendukung'}
            const reader = new FileReader()
              reader.readAsDataURL(e.target.files[0])
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
  
      const onAddImageFileChange = (e) => {

          if(e.target.files[0]) {
            if(e.target.files[0].length > 1){
                setErrorMessage('Hanya Bisa Uploud 1 Image Saja')
            }else if(e.target.files[0].length > 4000000){
                setErrorMessage('File Tidak Boleh Lebih dari 5 Mb')
            }else if(!e.target.files[0].length.includes('image')){
                setErrorMessage('File Tidak Mendukung')
            }
              setAddImageFileName(e.target.files[0].name)
              setAddImageFile(e.target.files[0])
              const reader = new FileReader()
            //   reader.readAsDataURL(e.target.files[0])
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
  
      const onBtnEditProduct = () => {
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
          
          var data = {
              nama_obat: namaObat,
              berat: beratObat,
              NIE: noBPOM,
              harga: nilaiJual,
              nilai_barang: nilaiBarang,
              SatuanObat_id: satuan,
              GolonganObat_id: kategori,
              tempat_penyimpanan: lokasiSimpan,
              stok: qty,
              expired: expired,   
          }
  
          formData.append('gambar', file)
          formData.append('data', JSON.stringify(data))
          axios.patch(API_URL + `/admin/editproduct?id=${idProduk}`, formData, headers)
          .then((res) => {
              if(res.data.message === "Update Product Success"){
                setSelected(3)
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
             console.log('err edit', err)
              setLoading(false)
          })
      }
     
  
      const btnLanjutkan = () => {
          setModalOpen(false)
          setModalOpen2(true)
      }
  
      const btnKembali = () => {
          setModalOpen(true)
          setModalOpen2(false)
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

      const klikOpenMOdal = () => {
        if(idProduk.modalOpen === true){
            setModalOpen(true)
        }
       
        
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
                <p className='modal-title-add' style={{marginBottom:'15px'}}>Edit Obat</p>
                </>
            }
            <div>
                {
                    selected === 3 ? 
                    <>
                    < div className='box-navbar-modal-edit-2' style={{marginTop: '30px'}}>
                        <div className='mt-4' style={{marginLeft: '20px'}}> <img  src={default1} alt='Image Preview' id='adminImgSukses' /></div>
                         <div className='box-khusus-tulisan' style={{marginLeft: '70px'}}>
                          <div className='tulisan-sukses-add-produk' style={{marginLeft: '20px'}}>Obat Berhasil Diedit!</div>
                          <div className='tulisan-sukses-add-produk-2'>Jumlah stok diperbarui secara otomatis</div>
                     </div>
                    </div>
                    </>
                    :
                    <>
                      {
                        selected === 1 ?
                        <>
                         <div className='box-navbar-modal-edit'>
                            <div className='button-no-2' style={{marginLeft: '-5px'}}>1</div>
                            <div className='tulisan-detail-dan-kuantitas'>Detail Obat</div>
                            <FontAwesomeIcon icon={faAngleRight} className='logo-slash mx-2'  />
                            <div className='button-no-1'>2</div>
                            <div  className='tulisan-detail-obat-modal'>Detail Kuantitas & Harga</div>
                        </div>
                        <div className='box-navbar-modal-edit-2'>
                            <div className='d-flex'>
                                <div className='nama-obat-info-edit'>Kuantitas</div>  
                                <div className='inputan-obat-info-edit-2'>
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
                            <div className='nama-obat-info-edit'>Satuan</div>  
                            <select 
                            id="inputObatSatuan" 
                            name="satuanObat"
                            onChange={satuanChange} defaultValue={satuan}
                            className="form-control inputan-obat-info-edit"  placeholder="Satuan"
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
                            <div className="input-group-text logo-input-group-text-5" ><FontAwesomeIcon icon={faAngleDown} /></div>  
                        </div>
                            <div className='d-flex mt-2'>
                                <div className='nama-obat-info-edit'>Nilai Barang (Rp)</div>  
                                <input type="number" min="0" className='form-control inputan-obat-info-edit' placeholder='Masukkan Nilai Barang'  onChange={nilaiBarangChange} defaultValue={nilaiBarang}/>
                            </div>
                            <div className='d-flex mt-2'>
                                <div className='nama-obat-info-edit'>Nilai Jual (Rp)</div>  
                                <input type="number" min="0" className='form-control inputan-obat-info-edit' placeholder='Masukkan Nilai Jual'  onChange={nilaiJualChange} defaultValue={nilaiJual}/>  
                            </div>
                            <div className='d-flex mt-2'>
                                <div className='nama-obat-info-edit'>Foto Obat</div>  
                                <div  className='inputan-obat-info-edit-3'>
                                    {
                                        previewImage? 
                                        <img src={previewImage} alt='Image Preview'  id="file-edit" className='adminImgUploud2' /> 
                                        : 
                                        gambar?
                                        <img src={`${API_URL + '/'}${gambar}`} alt='Image Preview' id='adminImgUploud' />
                                        :
                                        <img  src={NoImage} alt='Image Preview'  id='adminImgUploud2' />
                                    } 
                                </div>
                            </div>
                            <div className='nama-obat-info-2'>
                                <input id="button-edit-foto-produk" type="file" onChange={(e) => onImagesValidation(e)} /> 
                            </div>  
                        </div>
                        <div className='error-msg'>
                            {
                                errorMessage === "Cannot read properties of undefined (reading 'size')" || errorMessage === "Failed to execute 'readAsDataURL' on 'FileReader': The object is already busy reading Blobs."?
                                <></>
                                :
                                <p style={{margin: '10px', color: '#E0004D;', fontSize:'14px'}}>{errorMessage}</p>
                            }
                        </div>

                        <div className='d-flex' style={{marginTop: '-17px'}}>
                            <button className='pilih-metode-add-2 mx-2 w-50' onClick={() => setSelected(null)} >Kembali</button>
                            <button className='pilih-metode-add-2 w-50' disabled={loading} onClick={() => onBtnEditProduct ()}> Simpan </button>
                        </div>
                        </>
                        :
                        <>
                        <div className='box-navbar-modal-edit'>
                            <div className='button-no-1'>1</div>
                            <div className='tulisan-detail-obat-modal'>Detail Obat</div>
                            <FontAwesomeIcon icon={faAngleRight} className='logo-slash'  />
                            <div className='button-no-2'>2</div>
                            <div className='tulisan-detail-dan-kuantitas'>Detail Kuantitas & Harga</div>
                        </div>
                        <div className='box-navbar-modal-edit-2'>
                            <div className='d-flex'>
                                <div className='nama-obat-info-edit'>Nama Obat</div>  
                                <input type="text" className='form-control inputan-obat-info-edit' placeholder='Masukkan nama obat'  onChange={namaObatChange} defaultValue={namaObat}/>                  
                            </div>
                            <div className='d-flex mt-2'>
                                <div className='nama-obat-info-edit'>Berat</div>  
                                <input type="number" min="0" className='form-control inputan-obat-info-edit' placeholder='Masukkan berat obat (gram)'  onChange={beratObatChange} defaultValue={beratObat}/>               
                            </div>
                            <div className='d-flex mt-2'>
                                <div className='nama-obat-info-edit'>No.BPOM</div>  
                                <input type="text" className='form-control inputan-obat-info-edit' placeholder='Masukkan no. BPOM'  onChange={noBPOMChange} defaultValue={noBPOM}/>                  
                            </div>
                            <div className='d-flex mt-2'>
                                <div className='nama-obat-info-edit'>Kategori</div>  
                                <select 
                                id="inputObatKategori" 
                                name="kategoriObat"
                                onChange={kategoriChange} defaultValue={kategori}
                                className="form-control inputan-obat-info-edit"  placeholder="Kategori"
                                >
                                    <option value="">Pilih Kategori</option>
                                    <option value="1">Obat Keras</option>
                                    <option value="2">Obat Bebas Terbatas</option>
                                    <option value="3">Medical Device & Consumable</option>
                                    <option value="4">Lain-lain</option>
                                </select>
                                <div className='input-group-text logo-input-group-text-edit-2' ><FontAwesomeIcon icon={faAngleDown} /></div>
                            </div>
                            <div className='d-flex mt-2'>
                                <div className='nama-obat-info-edit' >Tgl. Kadaluarsa</div>  
                                <input type="datetime-local"  onChange={tanggalKadaluarsaChange} defaultValue={tanggalKadaluarsa}
                                placeholder="Tanggal Lahir" className="form-control inputan-obat-info-edit"/>
                            </div>
                            <div className='d-flex mt-2'>
                                <div className='nama-obat-info-edit' >Lokasi Simpan</div>  
                                <select 
                                id="inputObatLokasi" 
                                name="LokasiObat"
                                onChange={lokasiSimpanChange} defaultValue={lokasiSimpan}
                                className="form-control inputan-obat-info-edit "  placeholder="Lokasi"
                                >
                                    <option value="">Pilih Tempat</option>
                                    <option value="Gudang 1">Gudang 1</option>
                                    <option value="Gudang 2">Gudang 2</option>
                                </select>
                                <div className='input-group-text logo-input-group-text-3-edit'><FontAwesomeIcon icon={faAngleDown} /></div>
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

export default ModalEditObat;