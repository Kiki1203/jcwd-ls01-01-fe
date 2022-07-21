import React, { useState, useEffect } from "react";
import './TabDikirim.css';
import Chat from '../../../../Assets/CHAT.svg';
import axios from 'axios';
import API_URL  from '../../../../Helpers/API_URL.js';
import moment from 'moment';
import { Navigate, useNavigate } from 'react-router-dom';
import Tampilkan from "../TampilkanDetail/Tampilkan.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import SidebarProfile from "../../SidebarProfile/SidebarProfile";
import Sidebar2 from "../../SidebarProsesPemesanan/Sidebar2";
import { RingLoader } from "react-spinners";


const TabDikirim  = () => {
    
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
  useEffect(() => {
      setLoading(true)
      let token = localStorage.getItem('myTkn')
      const headers = {
          headers: { 
              'Authorization': `${token}`,
          }
      }
      axios.get(`${API_URL}/transaction/getdikirimpesanan?`, headers)
      .then((res) => {
          console.log('res.data semua pesanan', res.data)
          setLoading(false)
          setTotalData(res.data.length)
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

// const btnPesananDiterima = (id) => {
//   let token = localStorage.getItem('myTkn')
//   const headers = {
//       headers: { 
//           'Authorization': `${token}`,
//       }
//   }
//   setLoading(true)
 
//   axios.patch(API_URL + `/transaction/pesananditerima?id=${id}`, headers)
//   .then((res) => {
//   console.log(res)
//   setLoading(false)
//   // setData(res.data)
//   })
//   .catch((err) =>{
//   console.log(err)
//       setLoading(false)
//   })
// }

const btnPesananDiterima = (id) => {
 
  setLoading(true)
 
  axios.patch(API_URL + `/transaction/pesananditerima?id=${id}`)
  .then((res) => {
  console.log(res)
  setData(res.data)
  setLoading(false)
 
  })
  .catch((err) =>{
  console.log(err)
      setLoading(false)
  })
}





  const printData = (props) => {
    return data.map((value, index) => {
        return (
         <>
          <div className="box-semua-pesanan" key={index}>
                  {
                          openModal && <Tampilkan setOpenModal={setOpenModal}  id={idProduk}/>
                  }
                    <div className="inside-box-semua-pesanan">
                    
                          <div className="tanggal-semua-pesanan">{moment(value.tanggal_transaksi).format('LLL')}</div>
                          <div className="notifikasi-dikirim-pesanan"><div className="status-dikirim-pesanan">Sedang {value.status_transaksi}</div></div>
                            <div className="garis-semua-pesanan-1"></div>
                            <div className="foto-semua-pesanan">
                              <img src={`${API_URL + '/'}${value.dataPertama[0].gambar_produk}`} alt='Image Preview' className="foto-produk-semua" />
                            </div>
                            <div className="nama-obat-semua-pesanan">{value.dataPertama[0].nama_produk}</div>
                            <div className="harga-obat-semua-pesanan">{`Rp ${value.dataPertama[0].harga_produk.toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</div>
                            <div className="jumlah-obat-semua-pesanan">{value.dataPertama[0].quantity} {value.dataPertama[0].satuan_produk}</div>
                            <div className="button-tampilkan-detail-semua"  onClick={() => klikModalEdit(value.id)}>Tampilkan Detail</div>
                            <div className="keterangan-sub-total-semua">Sub Total</div>
                            <div className="total-yang-dibayarkan">{`Rp ${value.total_pembayaran.toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</div>
                            <div className="garis-semua-2"></div>
                            <div className="box-chat-cs-semua">
                              <div className="logo-cs-semua"><img src={Chat} alt="" width="24px" height="24px"/></div>
                              <div className="keterangan-chat-semua">Chat Customer Service</div>
                            </div>
                            <button className="button-dikirim" disable={loading}  onClick={() => btnPesananDiterima(value.id)}>
                              {
                                loading?
                                'Loading...'
                                :
                                'Pesanan Diterima'
                              }
                            </button>
                      </div>
                    </div>
         </>
        )
    })
}


const handleClick = (event) => {
  setcurrentPage(Number(event.target.id));
};

const pages = [];
for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
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
              <div>
              {
        loading ? 
        <> <div className="box-pd d-flex justify-content-center align-items-center mt-5"><RingLoader color={'#E0004D'} size={150}/></div></>
        :
        <>
       <div className="box-pd"> {printData()}</div>
        </>
      }
       <div className="mt-4 ml-4">
         <div className='pagination-semua d-flex'>
            <ul className="pageNumbers2">
            {
                loading ?
                <></>
                :
                <>
                  <li className="mx-3">
                <button
                    onClick={handlePrevbtn}
                    disabled={currentPage == pages[0] ? true : false}
                >
                    Prev
                </button>
                </li>
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}

                <li>
                <button
                    onClick={handleNextbtn}
                    disabled={currentPage == pages[pages.length - 1] ? true : false}
                >
                     Next
                </button>
                </li>
                </>
              }
            </ul> 
        </div>
      </div>
              </div>
              
          </div>
      </div>
      </div> 
  </div>
  </div>
  </div>
)
}

export default TabDikirim