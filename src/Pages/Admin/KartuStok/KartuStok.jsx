import React, { useState, useEffect, useMemo } from "react";
import './KartuStok.css';
import { useNavigate,  useParams,  } from 'react-router-dom';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import TableData from './TableData';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight,  faFileExcel} from '@fortawesome/free-solid-svg-icons';

const KartuStok  = () => {
    let [dropdownOpen, setDropdownOpen] = useState(false); 
    const navigate = useNavigate()
    const [pageNumber, setPageNumber] = useState(1)
    const [totalProduk, setTotalProduk] = useState(0)
    const [data, setData] = useState([])
    const [jumlahList, setJumlahList] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [namaObat, setNamaObat]  = useState("");
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(10);
    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    let params = useParams();

    useEffect(() => {
        let token = localStorage.getItem('token')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        axios.get(`${API_URL}/admin/paginatestok/${params.id}?page=${currentPage}&limit=${itemsPerPage}`, headers)
        .then((res) => {
            console.log('res.data.data', res.data.data)
            setTotalPage(res.data.pagination.totalPage)
            setData(res.data.data)
            setNamaObat(res.data.namaObat[0].nama_obat)
            setTotalProduk(res.data.pagination.totalRow[0].TotalData)
            setJumlahList(res.data.data.length)
        }).catch((err) => {
            console.log('ini err get',err)
        })
    }, [currentPage])


    const printData = (props) => {
        return data.map((value, index) => {
            return (
                <tr key={value.id}>
                    <td>{index + 1}</td>
                    <td>{moment(value.created_at).format('LL')}</td>
                    <td>{value.aktivitas}</td>
                    <td>{value.username}</td>
                    <td>{value.keluar}</td>
                    <td>{value.masuk}</td>
                    <td>{value.sisa}</td>
                    <td>{moment(value.expired).format('LL')}</td>
                </tr>
            )
        })
    }

    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
      };
    
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalProduk / itemsPerPage); i++) {
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
        <div className="container">
            <div className="navbar-kartu-stok">
            <FontAwesomeIcon icon={faAngleLeft} className="pinggiran-atas-navbar-kartu-stok" onClick={() => navigate('/daftarprodukadmin')}/>
                <div className="detail-obat-navbar">Detail Obat: {namaObat}</div>
                <div className="button-unduh-excel-kartu-stok"><FontAwesomeIcon icon={faFileExcel} className="" />Excel</div>
            </div>
            <div className="box-kartu-stok">
                <div className="inside-kartu-stok-box">
                <div className="inside-kartu-stok-box-1">
                    <div className="bulan-inside-kartu-stok-box-1">Bulan</div>
                    <div className="dropdown-inside-kartu-stok-box-1">
                    <select 
                        id="inputBulan" 
                    
                        name="kartuBulan"
                        className="form-control"  placeholder="Bulan"
                        >
                            <option value="">Bulan</option>
                            <option value="1" >Januari</option>
                            <option value="2">Februari</option>
                            <option value="3">Maret</option>
                            <option value="4" >April</option>
                            <option value="5">Mei</option>
                            <option value="6">Juni</option>
                            <option value="7" >Juli</option>
                            <option value="8">Agustus</option>
                            <option value="9">September</option>
                            <option value="10" >Oktober</option>
                            <option value="11">November</option>
                            <option value="12">Desember</option>
                        </select>
                    </div>
                </div>
                <div className="inside-kartu-stok-box-2">
                    <div className="tahun-inside-kartu-stok-box-2">Tahun</div>
                    <div className="dropdown-inside-kartu-stok-box-2">
                    <select 
                        id="inputTahun" 
                    
                        name="kartuTahun"
                        className="form-control"  placeholder="Tahun"
                        >
                            <option value="">Tahun</option>
                            <option value="2021" >2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                        </select>
                    </div>
                </div>
                <div className="inside-kartu-stok-box-3">
                <select 
                        id="inputObatKategori" 
                        name="kategoriObat"
                      
                        className="form-control"  placeholder="Kategori"
                        >
                            <option value="">Kategori</option>
                            <option value="1">Penerimaan Barang</option>
                            <option value="2">Penjualan Barang</option>
                        </select>

                </div>
                </div>
                <div className="garis-kartu-stok"></div>
                <div className="box-tabel-kartu-produk">
                    <div className="inside-box-kartu-produk">
                    <TableData cetak={printData()}>
                    {printData()}
                    </TableData>
 
                    </div>

                    <div className="box-footer-tabel-kartu-produk">
                        <div className="keterangan-footer-tabel-kartu-produk">Menampilkan {data.length} dari {totalProduk} data</div>
                        <div className="box-pagination-footer-produk-kartu">
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
                 </div>
            </div>
        </div>
    )
}

export default KartuStok