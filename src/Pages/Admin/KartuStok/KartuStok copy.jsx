import React, { useState, useEffect, useMemo } from "react";
import './KartuStok.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { faAngleLeft, faFileExcel,} from '@fortawesome/free-solid-svg-icons';
import { useNavigate,  useParams,  } from 'react-router-dom';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import TableData from './TableData';

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
            console.log('res.data.namaObat[0].nama_obat', res.data.namaObat[0].nama_obat)
            setTotalPage(res.data.pagination.totalPage)
            setProduk(res.data.data)
            setNamaObat(res.data.namaObat[0].nama_obat)
            setTotalProduk(res.data.pagination.totalRow[0].TotalData)
            setJumlahList(res.data.data.length)
        }).catch((err) => {
            console.log('ini err get',err)
        })
    }, [pageNumber])
   
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
                    <Dropdown isOpen={dropdownOpen}
                                toggle={() => setDropdownOpen(!dropdownOpen)}>
                                <DropdownToggle >
                                Bulan
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                    
                                    </DropdownItem>
                                    <DropdownItem>
                                        Delete
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                    </div>
                </div>
                <div className="inside-kartu-stok-box-2">
                    <div className="tahun-inside-kartu-stok-box-2">Tahun</div>
                    <div className="dropdown-inside-kartu-stok-box-2">Dropdown</div>
                </div>
                <div className="inside-kartu-stok-box-3">Filter</div>
                </div>
                <div className="garis-kartu-stok"></div>
                <div className="box-tabel-kartu-produk">
                    <div className="inside-box-kartu-produk">
                        <table>
                            <thead className="table-dalam-kartu-produk">
                                <tr>
                                    <th className="table-nomer-1-kartu">No</th>
                                    <th className="table-nomer-2-kartu">Tanggal</th>
                                    <th className="table-nomer-3-kartu">Aktivitas</th>
                                    <th className="table-nomer-4-kartu">Petugas</th>
                                    <th className="table-nomer-5-kartu">Keluar</th>
                                    <th className="table-nomer-6-kartu">Masuk</th>
                                    <th className="table-nomer-7-kartu">Sisa</th>
                                    <th className="table-nomer-8-kartu">Tgl. Kadaluarsa</th>
                                </tr>
                            </thead>
                            <tbody className="table-body-dalam-kartu-produk">
                            <tr>
                                <td className="table-body-nomer-1-kartu">1</td>
                                <td className="table-body-nomer-2-kartu">16 Januari 2022</td>
                                <td className="table-body-nomer-3-kartu">Penerimaan Barang</td>
                                <td className="table-body-nomer-4-kartu">Rizky</td>
                                <td className="table-body-nomer-5-kartu">0</td>
                                <td className="table-body-nomer-6-kartu">20</td>
                                <td className="table-body-nomer-7-kartu">80</td>
                                <td className="table-body-nomer-8-kartu">3 September 2022</td>
                            </tr>
                            </tbody>
                            <tbody className="table-body-dalam-kartu-produk-2">
                            <tr>
                                <td className="table-body-nomer-1-kartu">2</td>
                                <td className="table-body-nomer-2-kartu">16 Januari 2022</td>
                                <td className="table-body-nomer-3-kartu">Penerimaan Barang</td>
                                <td className="table-body-nomer-4-kartu">Rizky</td>
                                <td className="table-body-nomer-5-kartu">0</td>
                                <td className="table-body-nomer-6-kartu">20</td>
                                <td className="table-body-nomer-7-kartu">80</td>
                                <td className="table-body-nomer-8-kartu">3 September 2022</td>
                            </tr>
                            </tbody>
                         </table>
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