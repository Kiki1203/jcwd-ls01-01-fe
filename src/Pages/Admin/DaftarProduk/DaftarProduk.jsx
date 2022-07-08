import React, { useState, useEffect } from "react";
import './DaftarProduk.css';
import SidebarAdmin from '../../../Components/Admin/SidebarAdmin/SidebarAdmin.jsx';
import ModalTambahObat from '../../../Components/Admin/ModalAddProduk/ModalTambahObat.jsx';
import ModalEditObat from '../../../Components/Admin/ModalEditProduk/ModalEditObat.jsx';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import TableData from './TableData';
import { Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { faDownload, faFileExcel, faSearch, faAngleDown, faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';


const DaftarProduk  = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const [totalProduk, setTotalProduk] = useState(0)
    const [produk, setProduk] = useState([])
    let [modalOpen, setModalOpen] = useState(false); 
    let [modalOpens, setModalOpens] = useState(false);
    let [dropdownOpen, setDropdownOpen] = useState(false); 
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
    const currentProduk = produk.slice(next, preview);
    const totalPagesNum = Math.ceil(totalProduk/10);

    const numOfPages2 = [];

    for (let i=1; i <= totalPagesNum; i++) {
        numOfPages2.push(i);
    }
   
    const printData = (props) => {
        return produk.map((value, index) => {
            return (
                <tr key={value.id}>
                    <td>{value.id}</td>
                    <td>{value.nama_obat}</td>
                    <td>{Math.random(value.nomerObat).toString(36).substr(2, 9).toUpperCase()}</td>
                    <td>{value.NIE}</td>
                    <td>{value.golongan_obat}</td>
                    <td>{value.stok}</td>
                    <td>{value.satuan_obat}</td>
                    <td>{value.nilai_barang}</td>
                    <td>{value.harga}</td>    
                    <td>
                        <div  className="d-flex">
                        <button className="button-lihat-detail-produk mx-3" type="button" >Lihat Detail</button>
                        {
                            value.id === selectedProdukId ? 
                            <>
                             <Dropdown isOpen={dropdownOpen}
                                toggle={() => setDropdownOpen(!dropdownOpen)}>
                                <DropdownToggle id="dropdown-edit-menu-admin" style={{marginTop: '0px'}}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                    <ModalEditObat
                                            modalOpen={!modalOpens}
                                            handleModal={handleModalEdit2}
                                            id={value.id}
                                        />
                                    </DropdownItem>
                                    <DropdownItem>
                                        Delete
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            </>
                            :
                            <> 
                            <div className="edit-list-produk-admin">
                            <FontAwesomeIcon icon={faEllipsisVertical}  onClick={() => klikModalEdit(value.id)}/>
                            </div>
                            </>
                        }
                       
                        </div>
                    </td>
                </tr>
            )
        })
    }
   
    
    const handleModalEdit = () => {
        setModalOpen(true);
    }

    const handleModalEdit2 = (id) => {
        setModalOpens(true);
        setSelectedProdukId(id)
    }

    const klikModalEdit = (id) => {
        setSelectedProdukId(id)
    }

    if(!localStorage.getItem('myTkn')){
        return(
            <Navigate to='/loginadmin' />
        )
      }


    return(
        <>
        <SidebarAdmin />
         <div className="container">
             <div className="box-daftar-produk-admin">
             <div className="tulisan-dalam-daftar-produk-1">Daftar Obat</div>
             <div className="button-unduh-pdf-produk"><FontAwesomeIcon icon={faDownload} className="" />Unduh PDF</div>
             <div className="button-unduh-excel-produk"><FontAwesomeIcon icon={faFileExcel} className="" />Excel</div>
             <div className="inside-box-daftar-produk-admin">
                 <div className="filter-cari-nama-obat-dalam-produk">
                 <input type="text" className="form-control input-admin-daftar-1"  placeholder="Cari Nama Obat" />
                  <FontAwesomeIcon icon={faSearch}  className='logo-input-group-text-daftar'/>
                 </div>
                 <div className="filter-dropdown-dalam-produk">
                 <select 
                 id="inputFillter" 
                 name="editAdminFilter"
                 className="form-control border-0  input-admin-daftar-2"  placeholder="Filter"
                 >
                     <option value="" >Fillter</option>
                     <option value="1">Obat Keras</option>
                     <option value="2">Obat Bebas Terbatas</option>
                     <option value="3">Medical Device & Consumable</option>
                     <option value="4">Lain-lain</option>
                 </select>
                 <div  className='logo-input-group-text-daftar-2'>
                     <FontAwesomeIcon icon={faAngleDown}  className='logo-input-group-text-daftar-3'/>
                 </div>
 
                 </div>
                 <ModalTambahObat
                     modalOpen={modalOpen}
                     handleModal={handleModalEdit}
                 />
                 {/* <div className="button-tambah-obat-produk"><span className="material-icons">file_download</span>Tambah Obat</div> */}
                 <div className="garis-inside-box-daftar-produk"></div>
                 <div className="box-tabel-daftar-produk">
                 <div className="inside-box-daftar-produk">
                 <TableData cetak={printData()}>
                    {printData()}
                </TableData>
 
                 </div>
 
                 <div className="box-footer-tabel-daftar-produk">
                     <div className="keterangan-footer-tabel-daftar-produk">Menampilkan {jumlahList} dari {totalProduk} data</div>
                     <div className="tulisan-jumlah-baris-footer">Baris per halaman</div>
                     <div className="button-dropdown-jumlah-baris">
                         <select 
                         className="form-control input-admin-daftar-3"  placeholder="Filter"
                         >
                             <option value="" >10</option>
                             <option value="5">5</option>
                         </select>  
                     <FontAwesomeIcon icon={faAngleDown}  className='logo-input-group-text-daftar-4'/></div>
                     <div className="box-pagination-footer-produk">
                        <div className='d-flex justify-content-end'>
                            {/* {paginationBtnProduk()} */}
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
             </div>
             </div>
         </div>
        </>
    )
}

export default DaftarProduk