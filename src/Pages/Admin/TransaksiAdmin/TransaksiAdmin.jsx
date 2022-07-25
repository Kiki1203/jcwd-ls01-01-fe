import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import './TransaksiAdmin.css';
import SidebarAdmin from '../../../Components/Admin/SidebarAdmin/SidebarAdmin.jsx';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import { Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileExcel, faSearch, faAngleRight, faAngleLeft, faXmark} from '@fortawesome/free-solid-svg-icons';
import DateRangePickerComp from "../../../Components/Admin/DateRangePicker/DateRangePicker";
import NoTransaction from './../../../Assets/Transaksi.svg';
import TransactionCard from "../../../Components/Admin/TransactionCard/TransactionCard";
import SearchBubbleTransaksi from "../../../Components/Admin/SearchBubbleTransaksi/SearchBubbleTransaksi";
import { RingLoader } from "react-spinners";

const TransaksiAdmin  = () => {
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [searchLoading, setSearchLoading] = useState(false)
    const [rerender, setRerender] = useState(false)

    const [jumlahTransaksi, setJumlahTransaksi] = useState(0)
    const [transaksi, setTransaksi] = useState([])
    const [cardsPerPage, setCardsPerPage] = useState(5)
    const [pages, setPages] = useState([1,2,3,4,5,6,7]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    const [sortBy, setSortBy] = useState('terbaru')

    const [nomorTransaksi, setNomorTransaksi] = useState('')
    const [username, setUsername] = useState('')
    const [openBubbleNoTransaksi, setOpenBubbleNoTransaksi] = useState(false);
    const [openBubbleUsername, setOpenBubbleUsername] = useState(false);
    const [arrNomorTransaksi, setArrNomorTransaksi] = useState([])
    const [arrUsername, setArrUsername] = useState([])
    const [arrUserId, setArrUserId] = useState([])

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [dateRange, setDateRange] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ])
    const [dirtyDate, setDirtyDate] = useState(false)

    const token = localStorage.getItem('token')
    let { status } = useParams()

    useEffect(() => {
        setLoading(true)
        setErrorMsg(null)
        let userIds = arrUserId.join(',')
        axios.get(`${API_URL}/admin/transactioncount?status=${status}&transnum=${nomorTransaksi}&userids=${userIds}&startDate=${startDate}&endDate=${endDate}&sort=${sortBy}`,
        {headers: {authorization: token}})
        .then(res => {
        setJumlahTransaksi(res.data[0].TotalData)
        setLoading(false)
        })
        .catch(e => {
            setLoading(false)
            setErrorMsg(e.message)
        })
    }, [status, nomorTransaksi, arrUserId, startDate, endDate, rerender])

    useEffect(() => {
        setCurrentPage(1)
        setLoading(true)
        setErrorMsg(null)
        let userIds = arrUserId.join(',')
        axios.get(`${API_URL}/admin/transactiondetail?page=${currentPage}&limit=${cardsPerPage}&status=${status}&transnum=${nomorTransaksi}&userids=${userIds}&startDate=${startDate}&endDate=${endDate}&sort=${sortBy}`,
        {headers: {authorization: token}})
        .then(res => {
        setTransaksi(res.data)
        setLoading(false)
        })
        .catch(e => {
            setLoading(false)
            setErrorMsg(e.message)
        })
    }, [status, nomorTransaksi, arrUserId, startDate, endDate, sortBy, cardsPerPage])

    useEffect(() => {
        if(username){
            setSearchLoading(true)
            axios.get(`${API_URL}/admin/searchtransactionusername?user=${username}`,
            {headers: {authorization: token}})
            .then(res => {
                setArrUsername(res.data.usernames)
                res.data.userIds.length ? setArrUserId(res.data.userIds) : setArrUserId(['!@#$%^&'])
                setSearchLoading(false)
            })
            .catch(e => {
                setSearchLoading(false)
            })
        } else {setArrUserId([])}
    }, [username])

    useEffect(() => {
        if(nomorTransaksi){
            setSearchLoading(true)
            axios.get(`${API_URL}/admin/searchtransactionnumber?no=${nomorTransaksi}`,
            {headers: {authorization: token}})
            .then(res => {
                setArrNomorTransaksi(res.data)
                setSearchLoading(false)
            })
            .catch(e => {
                setSearchLoading(false)
            })
        }
    }, [nomorTransaksi])

    useEffect(() => {
        setRerender(false)
        setLoading(true)
        setErrorMsg(null)
        let userIds = arrUserId.join(',')
        axios.get(`${API_URL}/admin/transactiondetail?page=${currentPage}&limit=${cardsPerPage}&status=${status}&transnum=${nomorTransaksi}&userids=${userIds}&startDate=${startDate}&endDate=${endDate}&sort=${sortBy}`,
        {headers: {authorization: token}})
        .then(res => {
        setTransaksi(res.data)
        setLoading(false)
        })
        .catch(e => {
            setLoading(false)
            setErrorMsg(e.message)
        })
    }, [currentPage, rerender])

    useEffect(() => {
        let pagesArr = []
        for (let i = 1; i <= Math.ceil(jumlahTransaksi / cardsPerPage); i++) {
            pagesArr.push(i);
        }
        setPages(pagesArr)
        setCurrentPage(1)
    }, [cardsPerPage, jumlahTransaksi])

    useEffect(() => {
        console.log(transaksi)  
    }, [transaksi])

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

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
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
          setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevbtn = () => {
        setCurrentPage(currentPage - 1);
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

   
    if(!localStorage.getItem('token')){
        return(
            <Navigate to='/loginadmin' />
        )
      }


    return(
        <>
        <SidebarAdmin />
            <div className="admin-page-container">
                <div className="d-flex justify-content-between align-items-center" style={{minWidth:'800px'}}>
                    <p className="admin-page-header">{status.split('-').join(' ')}</p>
                    <div className="d-flex">
                        <div className="button-unduh"><FontAwesomeIcon icon={faDownload} className="" />Unduh PDF</div>
                        <div className="button-unduh"><FontAwesomeIcon icon={faFileExcel} className="" />Excel</div>
                    </div>
                </div>
                <hr style={{marginTop:'25px'}} />
                <div className="d-flex align-items-center" style={{gap:'20px'}}>
                    <div style={{position:'relative', display:'flex', alignItems:'center'}}>
                        <input type="text" className="search-box-transaksi"  placeholder="Cari no. transaksi" 
                            onChange={(e) => {
                                setNomorTransaksi(e.target.value)
                                e.target.value ? setOpenBubbleNoTransaksi(true)
                                : setOpenBubbleNoTransaksi(false)
                              }}  />
                        <FontAwesomeIcon icon={faSearch}  className='icon-search-transaksi'/>
                        {openBubbleNoTransaksi && <SearchBubbleTransaksi result={arrNomorTransaksi}
                                                  setQuery={setNomorTransaksi}
                                                  setBubbleOpen={setOpenBubbleNoTransaksi}
                                                  loading={searchLoading} />}
                    </div>
                    <div style={{position:'relative', display:'flex', alignItems:'center'}}>
                        <input type="text" className="search-box-transaksi"  placeholder="Cari username"
                        onChange={(e) => {
                                setUsername(e.target.value)
                                e.target.value ? setOpenBubbleUsername(true)
                                : setOpenBubbleUsername(false)
                              }}  />
                        <FontAwesomeIcon icon={faSearch}  className='icon-search-transaksi'/>
                        {openBubbleUsername && <SearchBubbleTransaksi result={arrUsername}
                                                setQuery={setUsername}
                                                setBubbleOpen={setOpenBubbleUsername}
                                                loading={searchLoading} />}
                    </div>
                    <DateRangePickerComp range={dateRange}
                                         setRange={setDateRange}
                                         setStartDate={setStartDate}
                                         setEndDate={setEndDate}
                                         dirty={dirtyDate}
                                         setDirty={setDirtyDate}/>
                    <select className="select-transaksi-admin">
                        <option selected style={{display:'none'}}>Urutkan</option>
                        <option onClick={() => setSortBy('terbaru')}>Tanggal Terbaru</option>
                        <option onClick={() => setSortBy('terlama')}>Tanggal Terlama</option>
                    </select>
                </div>
                {loading ? <div className="d-flex justify-content-center align-items-center" style={{height:'calc(100vh - 242px)'}}>
                    <RingLoader color={'#E0004D'} size={150} /> </div>
                :<>
                <div className="d-flex justify-content-between mt-3"  style={{minWidth:'800px'}}>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Pilih Semua
                    </label>
                    <div className="d-flex">
                        <div className="sidebar-checkbox" style={{marginRight:'10px'}}>Kartu per halaman</div>
                        <select className="transaksi-kartu-per-halaman" style={{marginTop:'3px'}} value={cardsPerPage}>
                            <option value="5" onClick={() => setCardsPerPage(5)}>5</option>
                            <option value="10" onClick={() => setCardsPerPage(10)}>10</option>
                        </select>
                        {pages.length > 1 && <div className='d-flex' style={{marginLeft:'30px', marginTop:'3px'}}>
                            <ul className="page-numbers-transaksi">
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
                        </div>}
                    </div>
                </div>       
                <div style={{display:'flex', gap:'20px', marginTop:'5px'}}>
                {
                    nomorTransaksi && <div className='filter-bullet'>
                        {`No. transaksi: "${nomorTransaksi}"`}
                        <FontAwesomeIcon icon={faXmark} className='filter-bullet-x'
                        onClick={() => setNomorTransaksi('')} />
                    </div>
                }
                {
                    username && <div className='filter-bullet'>
                        {`Username: "${username}"`}
                        <FontAwesomeIcon icon={faXmark} className='filter-bullet-x'
                        onClick={() => {setUsername('')
                                        setArrUserId([])
                                        setArrUsername([])}} />
                    </div>
                }
                {
                    startDate && <div className='filter-bullet'>
                        {startDate === endDate ?
                         startDate : `${startDate} - ${endDate}`}
                        <FontAwesomeIcon icon={faXmark} className='filter-bullet-x'
                        onClick={() => {setStartDate('')
                                        setEndDate('')
                                        setDateRange([
                                            {
                                              startDate: new Date(),
                                              endDate: new Date(),
                                              key: 'selection'
                                            }
                                        ])
                                        setDirtyDate(false)}} />
                    </div>
                }
                </div>
                {
                    jumlahTransaksi && transaksi.length > 0 ?
                        transaksi.map((t,i) => {
                        return <TransactionCard transaksi={t} key={i} setRerender={setRerender} />})
                    : !loading ? <div className="no-transaction">
                        <img src={NoTransaction} alt="" style={{width:'400px'}} />
                        <p style={{fontSize:'20px', color:'#213360', fontWeight:'600', marginTop:'10px'}}>
                            {`Belum ada pesanan ${status === 'semua-pesanan' ? '' :
                                                 status === 'resep-baru' ? 'resep baru' :
                                                 status === 'menunggu-bukti-pembayaran' ? 'yang menunggu bukti pembayaran' :
                                                 status === 'cek-bukti-pembayaran' ? 'yang menunggu konfirmasi pembayaran' :
                                                 status === 'pesanan-diproses' ? 'yang sedang diproses' :
                                                 status === 'dalam-pengiriman' ? 'dalam pengiriman' :
                                                 status === 'pesanan-selesai' ? 'yang selesai' :
                                                 status === 'pesanan-dibatalkan' ? 'yang dibatalkan' : ''}`}</p>
                    </div> : ''
                }
                </>}
         </div>
        </>
    )
}

export default TransaksiAdmin