import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './ModalTambahObat.css';
import API_URL  from '../../../Helpers/API_URL.js';
import Swal from 'sweetalert2';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import default1 from '../../../Assets/SuccessAP.svg';
import { faAngleRight, faXmark, faAngleDown, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';

const ModalEditObat = (id) => {
    let [modalOpen, setModalOpen] = useState(false); 
    let [modalOpen2, setModalOpen2] = useState(false); 
    let [modalOpen3, setModalOpen3] = useState(false); 
    let [qty, setQty] = useState(1); 
    const [idProduk, setIdProduk]  = useState(id)
    console.log('id atas', id)
    console.log(typeof(idProduk))
    console.log('ini idProduk', idProduk.id)
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

    useEffect(() => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
    
        axios.get(`${API_URL}/admin/getprodukID?id=${idProduk.id}`, headers)
        .then((res) => {
            console.log(res.data)
            console.log('ini res.data.nama_obat', res.data[0].nama_obat)
        }).catch((err) => {
            console.log('ini err get',err)
        })
        }, [])

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
  
    //   const onBtnAddProduct = (id) => {
    //       var formData = new FormData()
    //       let token = localStorage.getItem('myTkn')
    //       var headers = {
    //           headers: {
    //               'Authorization': `${token}`,
    //               'Content-Type': 'multipart/form-data'
    //           }
    //       }
  
    //       let expired = tanggalKadaluarsa
    //       expired =expired.split('T')
    //       expired =expired.join(' ')
  
    //       if(beratObat.includes('.')){
    //           var berat = beratObat.split('.').join('')
    //       }else{
    //           var berat = beratObat
    //       }
  
    //       if(nilaiBarang.includes('.')){
    //           var nilai = nilaiBarang.split('.').join('')
    //       }else{
    //           var nilai = nilaiBarang
    //       }
  
    //       if(nilaiJual.includes('.')){
    //           var harga = nilaiJual.split('.').join('')
    //       }else{
    //           var harga = nilaiJual
    //       }
  
    //       console.log('ini berat', berat)
    //       console.log('ini nilai barang', nilai)
    //       console.log('ini hargajual', harga)
          
    //       var data = {
    //           nama_obat: namaObat,
    //           berat: berat,
    //           NIE: noBPOM,
    //           harga: harga,
    //           nilai_barang: nilai,
    //           SatuanObat_id: satuan,
    //           GolonganObat_id: kategori,
    //           tempat_penyimpanan: lokasiSimpan,
    //           stok: qty,
    //           expired: expired,   
    //       }
  
    //       console.log('ini data', data)
  
  
    //       formData.append('gambar', file)
    //       formData.append('data', JSON.stringify(data))
    
    //       axios.patch(API_URL + `/admin/editproduct?id=${idProduk.id}`, formData, headers)
    //       .then((res) => {
  
    //           if(res.data.message === "Add Product Success"){
    //               setModalOpen3(true)
    //               setModalOpen(false)
    //               setModalOpen2(false)
    //           }
    //           console.log('ini res.data', res.data)
    //           console.log('ini res.data.message', res.data.message)
    //           console.log('ini res.data[0]', res.data.results)
    //       })
    //       .catch((err) =>{
    //           Swal.fire({
    //               title: 'Error!',
    //               text: err.response.data.message,
    //               icon: 'error',
    //               confirmButtonText: 'Okay!'
    //           })
    //       })
    //   }
     
  
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
  
    return (
    <>
       <div onClick={() => setModalOpen(true)} isOpen={modalOpen}>Edit Obat</div>
              <Modal className="mt-5 box-modal-add-product-admin" toggle={() => setModalOpen(true)} >
              <ModalHeader className='box-modal-header-admin'>
                  <span className="modal-title-add-obat">Edit Obat</span>
                  <FontAwesomeIcon icon={faXmark} className="button-close-modal-admin"  onClick={() => setModalOpen(false)}/>
              </ModalHeader>
              <ModalBody  >
                  <>
                  <div className='box-tab-modal-admin'>
                    <div className='button-no-1'>1</div>
                    <div className='tulisan-detail-obat-modal'>Detail Obat</div>
                    <FontAwesomeIcon icon={faAngleRight} className='logo-slash'  />
                    <div className='button-no-2'>2</div>
                    <div className='tulisan-detail-dan-kuantitas'>Detail Kuantitas & Harga</div>
                  </div>
                  <div className='box-isi-modal-add-product'>
                    <div className='box-inside-all-info-product'>
                        <div className='nama-obat-info'>Nama Obat</div>  
                        <input type="text" className='form-control inputan-obat-info' placeholder='Masukkan nama obat'  onChange={namaObatChange} defaultValue={namaObat}/>                  
                    </div>
                    <div className='box-inside-all-info-product'>
                        <div className='nama-obat-info'>Berat</div>  
                        <input type="number" min="0" className='form-control inputan-obat-info' placeholder='Masukkan berat obat (gram)'  onChange={beratObatChange} defaultValue={beratObat}/>                  
                    </div>
                    <div className='box-inside-all-info-product'>
                        <div className='nama-obat-info'>No.BPOM</div>  
                        <input type="text" className='form-control inputan-obat-info' placeholder='Masukkan no. BPOM'  onChange={noBPOMChange} defaultValue={noBPOM}/>                  
                    </div>
                    <div className='box-inside-all-info-product-2'>
                        <div className='nama-obat-info'>Kategori</div>  
                        <select 
                        id="inputObatKategori" 
                        name="kategoriObat"
                        onChange={kategoriChange} defaultValue={kategori}
                        className="form-control input-admin-product-1 mt-2"  placeholder="Kategori"
                        >
                            <option value="">Pilih Kategori</option>
                            <option value="1">Obat Keras</option>
                            <option value="2">Obat Bebas Terbatas</option>
                            <option value="3">Medical Device & Consumable</option>
                            <option value="4">Lain-lain</option>
                        </select>
                        <div className='input-group-text logo-input-group-text-2' ><FontAwesomeIcon icon={faAngleDown} /></div>
                    </div>
                    <div className='box-inside-all-info-product-2'>
                        <div id='nama-obat-info-2'>Tgl. Kadaluarsa</div>  
                        <input type="datetime-local"  onChange={tanggalKadaluarsaChange} defaultValue={tanggalKadaluarsa}
                         placeholder="Tanggal Lahir" className="form-control w-50 mt-2 inputan-obat-info-2"/>
                    </div>
                    <div className='box-inside-all-info-product-2'>
                        <div className='nama-obat-info'>Lokasi Penyimpanan</div>  
                        <select 
                        id="inputObatLokasi" 
                        name="LokasiObat"
                        onChange={lokasiSimpanChange} defaultValue={lokasiSimpan}
                        className="form-control input-admin-product-1 mt-2"  placeholder="Lokasi"
                        >
                            <option value="">Pilih Tempat</option>
                            <option value="Gudang 1">Gudang 1</option>
                            <option value="Gudang 2">Gudang 2</option>
                        </select>
                        <div className='input-group-text logo-input-group-text-2' ><FontAwesomeIcon icon={faAngleDown} /></div>
                    </div>
                  </div>
                  </>
              </ModalBody>
              <ModalFooter>
                <button className="btn-lanjutkan" type="button" onClick={() => btnLanjutkan()}>Lanjutkan</button>
              </ModalFooter>
          </Modal>
  
  
          <Modal  className="mt-5 box-modal-add-product-admin"   toggle={() => setModalOpen2(false)} isOpen={modalOpen2}>
              <ModalHeader className='box-modal-header-admin'>
                  <span className="modal-title-add-obat">Edit Obat</span>
                  <FontAwesomeIcon icon={faXmark} className="button-close-modal-admin"  onClick={() => setModalOpen2(false)}/>
              </ModalHeader>
              <ModalBody  >
              <>
                  <div className='box-tab-modal-admin'>
                    <div className='button-no-2'>1</div>
                    <div className='tulisan-detail-dan-kuantitas '>Detail Obat</div>
                    <FontAwesomeIcon icon={faAngleRight} className='logo-slash'  />
                    <div className='button-no-1 ml-2'>2</div>
                    <div className='tulisan-detail-obat-modal'>Detail Kuantitas & Harga</div>
                  </div>
                  <div className='box-isi-modal-add-product-2'>
                    <div className='box-inside-all-info-product'>
                        <div className='nama-obat-info'>Kuantitas</div>  
                        <div className='inputan-obat-info-3'>
                        <button className='input-group-text-logo-kuantitas' disabled={qty <= 1 ? true : false}  onClick={() => handleDec()} ><FontAwesomeIcon icon={faMinus} /></button>
                         <div className='form-control border-0 rounded-0 input-kuantitas-obat' style={{marginLeft: '-5px'}} defaultValue={qty}>
                          {qty}
                         </div>
                          <button className='input-group-text-logo-kuantitas' style={{marginTop: '-1.4px', marginLeft:'2px'}}  onClick={() => handleInc()}><FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                                         
                    </div>
                    <div className='box-inside-all-info-product-2'>
                        <div className='nama-obat-info'>Satuan</div>  
                        <select 
                        id="inputObatSatuan" 
                        name="satuanObat"
                        onChange={satuanChange} defaultValue={satuan}
                        className="form-control input-admin-product-2 mt-2"  placeholder="Satuan"
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
                        <div className='input-group-text logo-input-group-text-3' ><FontAwesomeIcon icon={faAngleDown} /></div>
                    </div>
                    <div className='box-inside-all-info-product-3'>
                        <div className='nama-obat-info-3'>Nilai Barang (Rp)</div>  
                        <input type="number" min="0" className='form-control inputan-obat-info mt-2' placeholder='Masukkan Nilai Barang'  onChange={nilaiBarangChange} defaultValue={nilaiBarang}/>                  
                    </div>
                    <div className='box-inside-all-info-product-3'>
                        <div className='nama-obat-info-3'>Nilai Jual (Rp)</div>  
                        <input type="number" min="0" className='form-control inputan-obat-info mt-2' placeholder='Masukkan Nilai Jual'  onChange={nilaiJualChange} defaultValue={nilaiJual}/>                  
                    </div>
                    <div className='box-inside-all-info-product-3'>
                        <div className='nama-obat-info'>Foto Obat</div> 
                        {
                              previewImage? 
                              <div className='preview-image'>
                                   <img src={previewImage} alt='Image Preview' id='adminImgUploud' /> 
                              </div>  
                              : 
                           
                            <><div>preview</div>
                            {/* <img src={NoImage} alt='Image Preview' id='adminImgUploud2' />  */}
                            </>
                          } 
                                   
                    </div>
                    <form method="PATCH" action="/upload" encType='multipart/form-data'>
                     <input type="file" name='photo' accept="image/*" id="image-input" style={{display: 'none'}} onChange={(e) => onImagesValidation(e)} />
                    </form>
                    <label htmlFor='image-input' id="choose-file-produk">Choose image</label>
                    {/* <div className='button-choose-file-foto'>
                        <input className="nama-obat-info" type="file" label={addImageFileName} onChange={onAddImageFileChange}   />             
                    </div> */}
                  
                    
                  </div>
                  </>
              </ModalBody>
              <ModalFooter>
                <button className="btn-kembali-before" type="button"  onClick={() => btnKembali()}>Kembali</button>
                <button className="btn-simpan-save"  type="button" >Simpan</button>
              </ModalFooter>
          </Modal>
  
          <Modal  className="mt-5 box-modal-add-product-admin"   toggle={() => setModalOpen3(false)} isOpen={modalOpen3}>
              <ModalBody  >
                  <>
                 <div className="button-close-modal-admin-sukses">
                 <FontAwesomeIcon icon={faXmark}  style={{cursor: 'pointer'}}  onClick={() => setModalOpen3(false)}/>
                 </div>
                 <div className='box-modal-admin-sukses'>
                      <div className='gambar-sukses-add-produk mt-4'> <img  src={default1} alt='Image Preview' id='adminImgSukses' /></div>
                     <div className='box-khusus-tulisan'>
                          <div className='tulisan-sukses-add-produk'>Obat Berhasil Diedit!</div>
                          <div className='tulisan-sukses-add-produk-2'>Jumlah stok diperbarui secara otomatis</div>
                     </div>
                 </div>
                 
                  </>
              </ModalBody>
          </Modal>
    </>
   
    );
};

export default ModalEditObat;