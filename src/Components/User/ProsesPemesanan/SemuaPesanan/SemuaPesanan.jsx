import React, { useState, useEffect } from "react";
import './SemuaPesanan.css';
import SidebarProfile from "../../SidebarProfile/SidebarProfile";
import Sidebar2 from "../../SidebarProsesPemesanan/Sidebar2";
import Chat from '../../../../Assets/CHAT.svg';
import axios from 'axios';
import API_URL  from '../../../../Helpers/API_URL.js';
import moment from 'moment';
import { Navigate, useNavigate } from 'react-router-dom';
import Tampilkan from "../TampilkanDetail/Tampilkan.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { RingLoader } from "react-spinners";
import FooterMobile from "../../Footer/FooterMobile.jsx"
import noProductIllust from '../../../../Assets/no-product.svg';

// PAGE INI MENAMPILKAN SEMUA PROSES PESANAN USER
const SemuaPesanan  = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(2);
  const [totalData, setTotalData] = useState(0);
  const [idProduk, setIdProduk] = useState(0)
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [verified, setVerified] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    setLoading(true)
    let tokens = localStorage.getItem('myTkn')
    const headers = {
        headers: { 
            'Authorization': `${tokens}`,
        }
    }
    axios.get(`${API_URL}/user/checkuserverify`, headers)
    .then((res) => {
      setLoading(false)
        setVerified(res.data.verified)
        setToken(res.data.token)
    }).catch((err) => {
        console.log('ini err get',err)
        setLoading(false)
    })
  }, [token, verified])

  useEffect(() => {
      setLoading(true)
      let token = localStorage.getItem('myTkn')
      const headers = {
          headers: { 
              'Authorization': `${token}`,
          }
      }
      axios.get(`${API_URL}/transaction/getsemuapesanan?page=${currentPage}&limit=${itemsPerPage}`, headers)
      .then((res) => {
          console.log('res.data semua pesanan', res.data)
          setLoading(false)
          setTotalData(res.data[0].total[0].total)
          setData(res.data)
          setLoading(false)
          // setProdukPertama(res.data.dataPertama)
      }).catch((err) => {
          console.log('ini err get',err)
          setLoading(false)
      })
  }, [currentPage])

  const klikModalEdit = (id) => {
    setIdProduk(id)
    setOpenModal(true)
}

  const printData = (props) => {
    return data.map((value, index) => {
        return (
        <div className="box-pd col-12">
            <div className="box-semua-pesanan" key={index}>
            {
                    openModal && <Tampilkan setOpenModal={setOpenModal}  id={idProduk}/>
             }
          <div className="inside-box-semua-pesanan">
              <div className="tanggal-semua-pesanan">{moment(value.tanggal_transaksi).format('LLL')}</div>
              {
                value.status_transaksi === "Selesai" ?
                <div className="notifikasi-selesai-pesanan"><div className="status-selesai-pesanan">Pesanan {value.status_transaksi}</div></div>
                  :
                  <>
                  {
                    value.status_transaksi === "Dikirim" ?
                    <div className="notifikasi-dikirim-pesanan"><div className="status-dikirim-pesanan">Sedang {value.status_transaksi}</div></div>
                  :
                 <>
                 {
                   value.status_transaksi === "Diproses" ?
                   <div className="notifikasi-diproses-pesanan"><div className="status-diproses-pesanan">Pesanan {value.status_transaksi}</div></div>
                   :
                   <>
                   {
                    value.status_transaksi === "Dibatalkan" ?
                    <>
                     <div className="notifikasi-dibatalkan-pesanan"><div className="status-dibatalkan-pesanan">Pesanan {value.status_transaksi}</div></div>
                    </>
                    :
                    <>
                   {
                    value.status_transaksi === "Menunggu Checkout" ?
                    <div className="notifikasi-semua-pesanan-2"><div className="status-semua-pesanan-2">{value.status_transaksi}</div></div>
                    :
                    <div className="notifikasi-semua-pesanan"><div className="status-semua-pesanan">{value.status_transaksi}</div></div>
                   }
                    </>

                   
                   }
                   </>
                 }
                 </>
                  }
                  </>   
              }
              <div className="garis-semua-pesanan-1"></div>
              {
                  value.dataPertama.length === 0 ? 
                 <>
                 {
                  value.result2.length === 0  ?
                  <>
                  <div className="foto-semua-pesanan">
                    <img src={`${API_URL + '/'}${value.resultRiwayatResep[0].gambar}`} alt='Image Preview' className="foto-produk-semua" />
                  </div>
                  <div className="nama-obat-semua-pesanan">Nomor Resep</div>
                  <div className="harga-obat-semua-pesanan">TIMER</div>
                  <div  className="jumlah-obat-semua-pesanan "  style={{marginTop: '-10px'}}>{value.resultRiwayatResep[0].no_pemesanan}</div>
                  <div className="button-tampilkan-detail-semua" >Perbesar gambar</div>
                  <div className="d-lg-none d-md-none d-block">
                  <div className="garis-semua-resep"></div>
                  <div className="box-chat-cs-semua-resep" style={{marginTop: '30px'}}>
                      <div className="logo-cs-semua-resep"><img src={Chat} alt="" width="24px" height="24px"/></div>
                      <div className="keterangan-chat-semua-resep">Chat Customer Service</div>
                    </div>
                  </div>
                  </>
                  :
                  <>
                    <div className="foto-semua-pesanan">
                    <img src={`${API_URL + '/'}${value.result2[0].gambar_resep}`} alt='Image Preview' className="foto-produk-semua" />
                  </div>
                  <div className="nama-obat-semua-pesanan">Nomor Resep</div>
                  <div className="harga-obat-semua-pesanan">TIMER</div>
                  <div  className="jumlah-obat-semua-pesanan" style={{marginTop: '0px'}}>{value.result2[0].no_pemesanan}</div>
                  <div className="button-tampilkan-detail-semua" >Perbesar gambar</div>
                  <div className="d-lg-none d-md-none d-block">
                  <div className="garis-semua-resep"></div>
                  <div className="box-chat-cs-semua-resep" style={{marginTop: '30px'}}>
                      <div className="logo-cs-semua-resep"><img src={Chat} alt="" width="24px" height="24px"/></div>
                      <div className="keterangan-chat-semua-resep">Chat Customer Service</div>
                    </div>
                  </div>
                  
                  </>
                 }
                 </>
                  :
                  <>
                  <div className="foto-semua-pesanan">
                  <img src={`${API_URL + '/'}${value.dataPertama[0].gambar_produk}`} alt='Image Preview' className="foto-produk-semua" />
                    </div>
                    <div className="nama-obat-semua-pesanan">{value.dataPertama[0].nama_produk}</div>
                    <div className="harga-obat-semua-pesanan">{`Rp ${value.dataPertama[0].harga_produk.toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</div>
                    <div className="jumlah-obat-semua-pesanan">{value.dataPertama[0].quantity} {value.dataPertama[0].satuan_produk}</div>
                    <div className="button-tampilkan-detail-semua"  onClick={() => klikModalEdit(value.id)}>Tampilkan Detail</div>
                  </>
                } 
                {
                  value.total_pembayaran ? 
                  <>
                  <div className="keterangan-sub-total-semua">Sub Total</div>
                  <div className="total-yang-dibayarkan">{`Rp ${value.total_pembayaran.toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</div>
                  </>
                  :
                  <></>
                }
              <div className="garis-semua-2"></div>
              {
                value.status_transaksi === "Menunggu Konfirmasi Pembayaran" ?
                <div className="d-lg-none d-md-none d-block">
                    <div className="box-chat-cs-semua-resep" style={{marginTop: '30px'}}>
                      <div className="logo-cs-semua-resep"><img src={Chat} alt="" width="24px" height="24px"/></div>
                      <div className="keterangan-chat-semua-resep">Chat Customer Service</div>
                    </div>
              </div>
              :
             <>
             </>
              }
              <div className="box-chat-cs-semua">
              <div className="logo-cs-semua"><img src={Chat} alt="" width="24px" height="24px"/></div>
              <div className="keterangan-chat-semua">Chat Customer Service</div>
            </div>
             
              {
                value.status_transaksi === "Selesai"?
                  <><div className="button-selesai-resep" onClick={() => navigate(`/ProductDetail/${value.dataPertama[0].Produk_id}`)}>Beli Lagi</div>
                  </>
                  :
                  <>
                  {
                    value.status_transaksi === "Dikirim" ?
                    <div className="button-dikirim" onClick={() => btnPesananDiterima(value.id)}>Pesanan Diterima</div>
                  :
                 <>
                 {
                    value.status_transaksi === "Dibatalkan" ?
                   <>
                   {
                       value.resultRiwayatResep.length > 0 ?
                       <></>
                       :
                       <><div className="button-selesai-resep" onClick={() => navigate(`/ProductDetail/${value.dataPertama[0].Produk_id}`)}>Beli Lagi</div>
                       </>
                     }
                   </>
                   :
                   <>
                   {
                       value.status_transaksi === "Diproses" || value.status_transaksi === "Menunggu Konfirmasi Resep" || value.status_transaksi === "Menunggu Konfirmasi Pembayaran" ?
                       <></>
                       :
                       <>
                        <div className="belum-bayar-semua">Bayar Sebelum {moment(value.waktu_ganti_status).format('LLL')}</div>
                        {
                           value.status_transaksi === "Menunggu Checkout" ?
                           <div className="button-bayar-sekarang-semua" onClick={() => navigate(`/checkout/resep?id=${value.id}`)}>Checkout Sekarang</div>
                           :
                           <div className="button-bayar-sekarang-semua" onClick={() => navigate(`/payment/${value.id}`)}>Bayar Sekarang</div>
                        }
                      
                       </>

                    }
                   </>
                 }
                 </>
                  }
                  </>   
              }
            </div>
          </div>
        </div>
        )
    })
}

const btnPesananDiterima = (id) => {
  console.log('id btn pesanan diterima', id)
  axios.patch(`${API_URL}/transaction/pesananditerima?id=${id}`)
  .then((res) => {
      console.log('res.data semua pesanan', res)
      setLoading(false)
      // setProdukPertama(res.data.dataPertama)
  }).catch((err) => {
      console.log('ini err get',err)
      setLoading(false)
  })
};


const handleClick = (event) => {
  setcurrentPage(Number(event.target.id));
};

const pages = [];
for (let i = 1; i <= Math.ceil(totalData / itemsPerPage); i++) {
pages.push(i);
}

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

const renderPageNumbers = pages.map((number) => {
  if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
  return (
      <li
      key={number}
      id={number}
      onClick={handleClick}
      className={currentPage == number ? "active" : null}
      >
      {number}
      </li>
  );
  } else {
  return null;
  }
});

const handleNextbtn = () => {
  setcurrentPage(currentPage + 1);
  if (currentPage + 1 > maxPageNumberLimit) {
    setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
  }
};

const handlePrevbtn = () => {
  setcurrentPage(currentPage - 1);
  if ((currentPage - 1) % pageNumberLimit == 0) {
    setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
  }
};

let pageIncrementBtn = null;
if (pages.length > maxPageNumberLimit) {
  pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
}

let pageDecrementBtn = null;
if (minPageNumberLimit >= 1) {
  pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
}

   const semuaPesanan = () => {
    return(
      <div>
        <div className="container-pp">
          <div>
          <div className="wrapper-pp">
          <div className="c-pp d-flex">
              <div className='col-lg-3 col-md-2 d-lg-block d-md-block d-none sidebar-pp-1'>
                  <SidebarProfile/>
              </div>
              <div  className='col-lg-1 col-none d-lg-block d-md-none d-none'>
                  
              </div>
              <div className='col-lg-8 col-md-9 col-12 sidebar-pp'>
                  <div>
                    <Sidebar2 />
                  </div>
                  <div className="box-inside-pp">
                     {
                      data.length > 0 ?
                       <>
                       {
                         loading ? 
                         <> <div className="box-pd d-flex justify-content-center align-items-center mt-5"><RingLoader color={'#E0004D'} size={150}/></div></>
                         :
                         <>{printData()}</>
                       }
                      </>
                      :
                      <>
                       {
                         loading ? 
                         <> <div className="box-pd d-flex justify-content-center align-items-center mt-5"><RingLoader color={'#E0004D'} size={150}/></div></>
                         :
                         <div className='d-flex flex-column align-items-center' style={{width:'100%'}}>
                         <img src={noProductIllust} alt="" style={{width:'250px', margin:'20px'}} />
                         <p style={{color:'#213360', fontSize:'20px', fontWeight:'700', margin:'0px 0px 10px'}}>Oops, pesanan masih kosong</p>
                         <p style={{color:'#8f939e', fontSize:'14px', margin:'0px 0px 30px'}}>Silahkan berbelanja terlebih dahulu</p>
                     </div>
                       }
                      </>
                    }
           <div className="box-pagination-semua d-flex">
           {
             data.length > 1 ?
             <ul className="pageNumbers2">
        
             <li className="mx-3">
                   {
                      data.length > 1 ?
                      <button
                     onClick={handlePrevbtn}
                     disabled={currentPage == pages[0] ? true : false}
                 >
                    Prev
                 </button>
                 :
                 <></>
                   }
                 
                 </li>
                 {pageDecrementBtn}
                 {renderPageNumbers}
                 {pageIncrementBtn}

                 <li>
                   {
                      data.length > 1 ?
                      <button
                      onClick={handleNextbtn}
                      disabled={currentPage == pages[pages.length - 1] ? true : false}
                  >
                    Next
                  </button>
                  :
                  <></>
                   }
               
                 </li>
             </ul> 
             :
            <></>
          }
        
          </div>
                  </div>
                  
              </div>
               <FooterMobile/>
          </div>
          </div> 
      </div>
      </div>
      
      </div>
  )
   } 
   
   if(localStorage.getItem('myTkn')){
    if(verified === 0){
      return(
        <Navigate to='/verification' />
      )
    }else{
      return(
        <>{semuaPesanan()}</>
      )
    }
  }else{
    if(localStorage.getItem('token') === token){
      if(verified === 0){
        return(
          <Navigate to='/verification' />
        )
      }else{
        return(
          <>{semuaPesanan()}</>
        )  
      }
    }else{
      return(
        <Navigate to='/' />
      ) 
    }
}
}

export default SemuaPesanan