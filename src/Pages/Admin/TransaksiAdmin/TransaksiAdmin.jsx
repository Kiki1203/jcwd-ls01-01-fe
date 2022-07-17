import React, { useState, useEffect } from "react";
import './TransaksiAdmin.css';
import SidebarAdmin from '../../../Components/Admin/SidebarAdmin/SidebarAdmin.jsx';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import { Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileExcel, faSearch, faAngleDown, faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';


const TransaksiAdmin  = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const [totalProduk, setTotalProduk] = useState(0)
    const [produk, setProduk] = useState([])
    const [jumlahList, setJumlahList] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [pages, setPages] = useState(0);
    const [msg, setMsg] = useState("");  
    const [selectedProdukId, setSelectedProdukId]  = useState();

    useEffect(() => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        axios.get(`${API_URL}/admin/paginate?page=${pageNumber}&limit=10`, headers)
        .then((res) => {
            setTotalPage(res.data.pagination.totalPage)
            setProduk(res.data.data)
            setTotalProduk(res.data.pagination.totalRow[0].TotalData)
            setJumlahList(res.data.data.length)
        }).catch((err) => {
            console.log('ini err get',err)
        })
    }, [pageNumber])

    

    const numOfPages = [];

    for (let i=1; i <= pages; i++) {
        numOfPages.push(i);
    }

    const [currentButton, setCurrentButton] = useState(1);

    useEffect(() => {
        setPageNumber(currentButton);
    }, [currentButton, setPageNumber])

    const preview = pageNumber * 10;
    const next = preview - 10;
    const totalPagesNum = Math.ceil(totalProduk/10);

    const numOfPages2 = [1,2,3,4,5,6,7];

    for (let i=1; i <= totalPagesNum; i++) {
        numOfPages2.push(i);
    }
   
    if(!localStorage.getItem('myTkn')){
        return(
            <Navigate to='/loginadmin' />
        )
      }


    return(
        <>
        <SidebarAdmin />
            <div className="admin-page-container">
                <div className="d-flex justify-content-between align-items-center">
                    <p className="admin-page-header">Semua Pesanan</p>
                    <div className="d-flex">
                        <div className="button-unduh"><FontAwesomeIcon icon={faDownload} className="" />Unduh PDF</div>
                        <div className="button-unduh"><FontAwesomeIcon icon={faFileExcel} className="" />Excel</div>
                    </div>
                </div>
                <hr style={{marginTop:'25px'}} />
                <div className="d-flex" style={{gap:'20px'}}>
                    <div style={{position:'relative', display:'flex', alignItems:'center'}}>
                        <input type="text" className="search-box-transaksi"  placeholder="Cari no. transaksi" />
                        <FontAwesomeIcon icon={faSearch}  className='icon-search-transaksi'/>
                    </div>
                    <select className="select-transaksi-admin">
                        <option selected style={{display:'none'}}>Filter</option>
                        <option>Tanggal Transaksi</option>
                        <option>Produk Non Resep</option>
                        <option>Obat Resep</option>
                    </select>
                    <select className="select-transaksi-admin">
                        <option selected style={{display:'none'}}>Urutkan</option>
                        <option>Tanggal Transaksi (Terbaru)</option>
                        <option>Tanggal Transaksi (Terlama)</option>
                        <option>Total Pembayaran Terendah</option>
                        <option>Total Pembayaran Tertinggi</option>
                    </select>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Pilih Semua
                    </label>
                    <div className="d-flex">
                        <div className="sidebar-checkbox">Baris per halaman</div>
                        <select className="transaksi-kartu-per-halaman" placeholder="Filter">
                            <option value="5">5</option>
                            <option value="10" >10</option>
                        </select>
                        <div className='d-flex justify-content-end'>
                            <ul className="pagination">
                                    <li className={`${currentButton === 1 ? 'page-item disabled' : 'page-item' }`}><a href="#!"
                                        onClick = { () => setCurrentButton((prev) => prev === 1 ? prev : prev - 1)}
                                    >Previous</a></li>
                        {
                                    numOfPages2.map((totalPagesNum, index) => {
                                        return (
                                            <li key={index} className={`${currentButton === totalPagesNum ? 'page-item active' : 'page-item' }`}><a href="#!" className="page-link"
                                                onClick = {()=>setCurrentButton(totalPagesNum)}
                                            >{totalPagesNum}
                                            </a></li> 
                                        )
                                    })

                        }

                        <li className={`${currentButton === numOfPages.length ? 'page-item disabled' : 'page-item' }`}><a href="#!"
                                        onClick = { () => setCurrentButton((next) => next === numOfPages.length ? next : next + 1)}
                                    >Next</a></li>
                                </ul>        
                        </div>
                    </div>
                </div>       
         </div>
        </>
    )
}

export default TransaksiAdmin