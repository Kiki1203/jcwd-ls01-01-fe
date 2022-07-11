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

const ModalEditObat = (id) => {
    let [modalOpen, setModalOpen] = useState(false); 
    let [modalOpen2, setModalOpen2] = useState(false); 
    let [modalOpen3, setModalOpen3] = useState(false); 
    let [qty, setQty] = useState(1); 
    const [idProduk, setIdProduk]  = useState(id)
    console.log('id atas', id)
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
            setNamaObat(res.data[0].nama_obat)
            setBeratObat(res.data[0].berat)
            setNoBPOM(res.data[0].NIE)
            setKategori(res.data[0].golongan_obat)
            setTanggalKadaluarsa(res.data[0].expired)
            setLokasiSimpan(res.data[0].tempat_penyimpanan)
            setQty(res.data[0].stok)
            setSatuan(res.data[0].satuan_obat)
            setNilaiBarang(res.data[0].nilai_barang)
            setNilaiJual(res.data[0].harga)
            setGambar(res.data[0].gambar)
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
  
      const onBtnAddProduct = () => {
          var formData = new FormData()
          let token = localStorage.getItem('myTkn')
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
  
          console.log('ini data', data)
  
  
          formData.append('gambar', addImageFile)
          formData.append('data', JSON.stringify(data))
    
          axios.patch(API_URL + `/admin/editproduct?id=${idProduk.id}`, formData, headers)
          .then((res) => {
  
              if(res.data.message === "Update Product Success"){
                  setModalOpen3(true)
                  setModalOpen(false)
                  setModalOpen2(false)
              }
              console.log('ini res.data', res.data)
              console.log('ini res.data.message', res.data.message)
              console.log('ini res.data[0]', res.data.results)
          })
          .catch((err) =>{
              Swal.fire({
                  title: 'Error!',
                  text: err.response.data.message,
                  icon: 'error',
                  confirmButtonText: 'Okay!'
              })
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
  
    return (
        <>
        <div onClick={() => setModalOpen(true)} >Edit Obat</div>
        <Modal   toggle={() => setModalOpen(true)} isOpen={modalOpen}>
             <ModalHeader>
                 <span className="modal-title-add-obat">Edit Obat</span>
                 <FontAwesomeIcon icon={faXmark} className="button-close-modal-admin"  onClick={() => setModalOpen(false)}/>
             </ModalHeader>
             <ModalBody>
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
                         <div className='input-group-text logo-input-group-text-2' ><FontAwesomeIcon icon={faAngleDown} /></div>
                     </div>
                     <div className='box-inside-all-info-product mt-3'>
                         <div className='nama-obat-info-2'>Tgl. Kadaluarsa</div>  
                         <input type="datetime-local"  onChange={tanggalKadaluarsaChange} defaultValue={tanggalKadaluarsa}
                          placeholder="Tanggal Lahir" className="form-control inputan-obat-info"/>
                     </div>
                     <div className='box-inside-all-info-product mt-3'>
                         <div className='nama-obat-info-2'>Lokasi Penyimpanan</div>  
                         <select 
                         id="inputObatLokasi" 
                         name="LokasiObat"
                         onChange={lokasiSimpanChange} defaultValue={lokasiSimpan}
                         className="form-control  inputan-obat-info-3 "  placeholder="Lokasi"
                         >
                             <option value="">Pilih Tempat</option>
                             <option value="Gudang 1">Gudang 1</option>
                             <option value="Gudang 2">Gudang 2</option>
                         </select>
                         <div className='input-group-text logo-input-group-text-3' ><FontAwesomeIcon icon={faAngleDown} /></div>
                     </div>
                 </div>
                 </div>
                 <button className="btn-lanjutkan mt-3" type="button" onClick={() => btnLanjutkan()}>Lanjutkan</button>
             </ModalBody>
         </Modal>
   
         {/* MODAL 2 */}
 
         <Modal toggle={() => setModalOpen2(false)} isOpen={modalOpen2}>
             <ModalHeader>
                 <span className="modal-title-add-obat">Edit Obat</span>
                 <FontAwesomeIcon icon={faXmark} className="button-close-modal-admin"  onClick={() => setModalOpen2(false)}/>
             </ModalHeader>
             <ModalBody>
                 <div className='box-tab-modal-admin' style={{marginLeft: '-10px'}}>
                     <div className='button-no-2'>1</div>
                     <div className='tulisan-detail-dan-kuantitas '>Detail Obat</div>
                     <FontAwesomeIcon icon={faAngleRight} className='logo-slash'  />
                     <div className='button-no-1'  style={{marginLeft: '10px'}}>2</div>
                     <div className='tulisan-detail-obat-modal'>Detail Kuantitas & Harga</div>
                 </div>
                 <div className='box-isi-modal-add-product'>
                     <div className='box-inside-all-info-product'>
                         <div className='nama-obat-info'>Kuantitas</div>  
                         <div className='inputan-obat-info-4' style={{marginLeft: '-5px'}}>
                             <button className='input-group-text-logo-kuantitas' disabled={qty <= 1 ? true : false}  onClick={() => handleDec()} ><FontAwesomeIcon icon={faMinus} /></button>
                             <div className='form-control border-0 rounded-0 input-kuantitas-obat' style={{marginLeft: '-5px'}} defaultValue={qty}>
                             {qty}
                             </div>
                             <button className='input-group-text-logo-kuantitas' style={{marginTop: '-1.4px', marginLeft:'2px'}}  onClick={() => handleInc()}><FontAwesomeIcon icon={faPlus} /></button>
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
                         <div className='input-group-text logo-input-group-text-2' ><FontAwesomeIcon icon={faAngleDown} /></div>                 
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
                         <div>
                         {
                               previewImage? 
                               <img src={previewImage} alt='Image Preview' id='adminImgUploud' /> 
                               : 
                               gambar?
                               <img src={`${API_URL + '/'}${gambar}`} alt='Image Preview' id='adminImgUploud' />
                               :
                               <img  src={NoImage} alt='Image Preview'  id='adminImgUploud2' />
                           
                           } 
                                 
                         </div>
                     </div>
                     <input className="button-edit-foto-produk" type="file" label={addImageFileName} onChange={onAddImageFileChange} />
                     {/* <form method="PATCH" action="/upload" encType='multipart/form-data'>
                         <input type="file" name='photo' accept="image/*" id="image-input" style={{display: 'none'}} onChange={(e) => onImagesValidation(e)} />
                         </form>
                         <label htmlFor='image-input' id="choose-file-produk">Choose image</label> */}
                 </div>
                 </div>
                <div classname="box-button-modal-2" style={{marginTop: '30px'}}>
                     <button className="btn-kembali-before" type="button"  onClick={() => btnKembali()}>Kembali</button>
                     <button className="btn-simpan-save"  type="button" onClick={() => onBtnAddProduct ()}>Simpan</button>
                </div>
             </ModalBody>
         </Modal>
 
         {/* MODAL 3 */}
 
         
         <Modal  toggle={() => setModalOpen3(false)} isOpen={modalOpen3}>
             <ModalBody>
                 <div className="button-close-modal-admin-sukses">
                  <FontAwesomeIcon icon={faXmark}  style={{cursor: 'pointer'}}  onClick={() => setModalOpen3(false)}/>
                  </div>
                  <div className='box-modal-admin-sukses'>
                     <div className='gambar-sukses-add-produk mt-4'> <img  src={default1} alt='Image Preview' id='adminImgSukses' /></div>
                      <div className='box-khusus-tulisan'>
                           <div className='tulisan-sukses-add-produk'>Obat Berhasil Ditambahkan!</div>
                           <div className='tulisan-sukses-add-produk-2'>Jumlah stok diperbarui secara otomatis</div>
                      </div>
                  </div>
             </ModalBody>
         </Modal>
         
     </>
    );
};

export default ModalEditObat;