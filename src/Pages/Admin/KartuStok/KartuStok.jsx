import React, { useState, useEffect, useMemo } from "react";
import './KartuStok.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { faAngleLeft, faFileExcel,} from '@fortawesome/free-solid-svg-icons';
import { useNavigate,  useParams,  } from 'react-router-dom';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import TableData from './TableData';
import moment from 'moment';

const KartuStok  = () => {
    let [dropdownOpen, setDropdownOpen] = useState(false); 
    const navigate = useNavigate()
    const [pageNumber, setPageNumber] = useState(1)
    const [totalProduk, setTotalProduk] = useState(0)
    const [produk, setProduk] = useState([])
    const [jumlahList, setJumlahList] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [namaObat, setNamaObat]  = useState("");
    
    let params = useParams();

    useEffect(() => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        axios.get(`${API_URL}/admin/paginatestok/${params.id}?page=${pageNumber}&limit=10`, headers)
        .then((res) => {
            console.log('res.data.data', res.data.data)
            setTotalPage(res.data.pagination.totalPage)
            setProduk(res.data.data)
            setNamaObat(res.data.namaObat[0].nama_obat)
            setTotalProduk(res.data.pagination.totalRow[0].TotalData)
            setJumlahList(res.data.data.length)
        }).catch((err) => {
            console.log('ini err get',err)
        })
    }, [pageNumber])


    const printData = (props) => {
        return produk.map((value, index) => {
            return (
                <tr key={value.id}>
                    <td>{value.id}</td>
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
   
    return(
        <div className="container">
            <div className="navbar-kartu-stok">
            <FontAwesomeIcon icon={faAngleLeft} className="pinggiran-atas-navbar-kartu-stok" onClick={() => navigate('/register')}/>
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
                            <option value="1">Obat Keras</option>
                            <option value="2">Obat Bebas Terbatas</option>
                            <option value="3">Medical Device & Consumable</option>
                            <option value="4">Lain-lain</option>
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
                        <div className="keterangan-footer-tabel-kartu-produk">Menampilkan 10 dari 1404 data</div>
                        <div className="tulisan-jumlah-baris-footer-kartu">Baris per halaman</div>
                        <div className="button-dropdown-jumlah-baris-kartu">10</div>
                        <div className="box-pagination-footer-produk-kartu"></div>
                    </div>
                 </div>
            </div>
        </div>
    )
}

export default KartuStok