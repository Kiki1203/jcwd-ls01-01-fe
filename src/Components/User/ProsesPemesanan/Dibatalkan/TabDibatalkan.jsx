import React, { useState, useEffect } from "react";
import './TabDibatalkan.css';
import TemplateProsesPemesanan from "../TemplateProsesPemesanan";
import Chat from '../../../../Assets/CHAT.svg';
import axios from 'axios';
import API_URL  from '../../../../Helpers/API_URL.js';
import moment from 'moment';
import { Navigate, useNavigate } from 'react-router-dom';
import Tampilkan from "../TampilkanDetail/Tampilkan.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';



const TabDibatalkan  = () => {
    
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
      axios.get(`${API_URL}/transaction/getdibatalkanpesanan?page=${currentPage}&limit=${itemsPerPage}`, headers)
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
         <>
          <div className="box-semua-pesanan" key={index}>
                  {
                          openModal && <Tampilkan setOpenModal={setOpenModal}  id={idProduk}/>
                  }
                    <div className="inside-box-semua-pesanan">
                          <div className="tanggal-semua-pesanan">{moment(value.tanggal_transaksi).format('LLL')}</div>
                          <div className="notifikasi-dibatalkan-pesanan"><div className="status-dibatalkan-pesanan">Pesanan {value.status_transaksi}</div></div>
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
                            <div className="button-selesai-resep" onClick={() => navigate(`/ProductDetail/${value.dataPertama[0].Produk_id}`)}>Beli Lagi</div>
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

    
    return(
        <div className="container-semua-pesanan">
          <TemplateProsesPemesanan/>
           {/* CONTOH JIKA BUKAN RESEP */}

           {/* keterangan, waktu mapping janlup ditambahin mx-4 my-4 dan format render sebegai berikut:
           <div className="container">
              <TemplateProsesPemesanan/>
              <div className='position-all-box'>
              {this.printProducts()}
              <button className="ml-5" id='btn-pagination'>1</button>
              </div>
              <div>
             
              </div>
          </div>
           */}
           
          <div className='position-all-box'>
            {
              loading ? 
              'Loading...'
              :
              <>
              {printData()}
              </>
            }
             <div className="mt-4">
              <div className='d-flex'>
                            <ul className="pageNumbers">
                                <li>
                                <button
                                    onClick={handlePrevbtn}
                                    disabled={currentPage == pages[0] ? true : false}
                                >
                                    <FontAwesomeIcon icon={faAngleLeft} className="logo-next-1" />
                                     <FontAwesomeIcon icon={faAngleLeft} className="logo-next-2" />
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
                                     <FontAwesomeIcon icon={faAngleRight} className="logo-next-2"/>
                                     <FontAwesomeIcon icon={faAngleRight} className="logo-next-1"/>
                                </button>
                                </li>
                            </ul> 
                        </div>
            </div>
          </div>

           {/* CONTOH JIKA RESEP */}
          {/* <div className='position-all-box'>
            <div className="box-semua-pesanan">
              <div className="inside-box-semua-pesanan">
                <div className="tanggal-semua-pesanan">Jumat, 5 April 2022, 15:45</div>
                <div className="notifikasi-semua-pesanan"><div className="status-semua-pesanan">Menunggu Konfirmasi</div></div>
                <div className="garis-semua-pesanan-1"></div>
                <div className="foto-semua-pesanan">
                  <img src="" alt="" className="foto-produk-semua"/>
                </div>
                <div className="nama-obat-semua-pesanan">Nomor Resep</div>
                <div>TIMER</div>
                <div className="jumlah-obat-semua-pesanan">#123abc456def</div>
                <div className="button-tampilkan-detail-semua">Tampilkan Detail</div>
                <div className="garis-semua-2-resep"></div>
                  <div className="box-chat-cs-semua-resep">
                    <div className="logo-cs-semua"><img src={Chat} alt="" width="24px" height="24px"/></div>
                    <div className="keterangan-chat-semua">Chat Customer Service</div>
                  </div>
                <div className="belum-bayar-semua-resep">Bayar Sebelum 6 April 2022, 15:45</div>
                <div className="button-bayar-sekarang-semua-resep">Bayar Sekarang</div>
              </div>
            </div>
            <button className="ml-5" id='btn-pagination'>1</button>
          </div> */}
        </div>
    )
}

export default TabDibatalkan