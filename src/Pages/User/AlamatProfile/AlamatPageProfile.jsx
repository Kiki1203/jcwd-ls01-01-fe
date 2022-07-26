import React, { useState, useEffect } from "react";
import './AlamatPageProfile.css';
import SidebarProfile from "../../../Components/User/SidebarProfile/SidebarProfile.jsx";
import { useNavigate, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import { RingLoader } from "react-spinners";
import FooterMobile from "../../../Components/User/Footer/FooterMobile.jsx"
import noProductIllust from '../../../Assets/nodata.svg';
import rumah from '../../../Assets/rumah.svg';
import kantor from '../../../Assets/kantor.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const AlamatPage  = () => {    
    const navigate = useNavigate()
    const [Selectedindex, setSelectedindex] = useState(0)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(2);
    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    const [showAllProducts, setShowAllProducts] = useState(false)
    const [totalData, setTotalData] = useState(0);
    const [verified, setVerified] = useState('')
    const [tokenUser, setTokenUser] = useState("");
    
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
          setTokenUser(res.data.token)
      }).catch((err) => {
          console.log('ini err get',err)
          setLoading(false)
      })
    }, [tokenUser, verified])
    useEffect(() => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        axios.get(`${API_URL}/user/getalamatuser?page=${currentPage}&limit=${itemsPerPage}`, headers)
        .then((res) => {
            console.log('res', res)
            setData(res.data)
            setTotalData(res.data[0].total[0].total)
        }).catch((err) => {
            console.log('ini err get',err)
        })
    }, [])

    const printData = () => {
        return data.map((value, index) => {
            return (
              <div className="box-pd-ap col-12" key={index}>
                <div className="box-alamat-utama">
                    <div className='judul-page-alamat'>{value.alamat_utama === 1 ? 'Alamat Utama' : <></>}</div>
                    <div className="d-flex box-inside-ap">
                    <div>
                        {
                            value.label_alamat.includes("Rumah") ?
                            <img src={rumah} alt="" className="foto-rumah" />
                            :
                            <img src={kantor} alt="" className="foto-rumah" />
                        }
                   
                    </div>
                    <div className="box-informasi-alamat">
                        <div className="nama-alamat-tujuan">{value.label_alamat}</div>
                        <div className="alamat-lengkap-utama">{value.alamat}</div>
                    </div>
                    <div className="button-edit-alamat"  onClick={() => navigate(`/editalamat/${value.id}`)} >Edit</div>
                    </div>
                   
                </div>
              </div>
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

      
    const alamatPage = () => {
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
                <div className="d-lg-none d-md-none d-block d-flex navbar-pro">
                    <div>
                        <Link to='/profile' style={{ textDecoration:"none", color: "black", cursor: 'pointer', fontSize: "12px", marginTop: "30px", marginLeft:"10px" }}>
                            <FontAwesomeIcon icon={faAngleLeft} className="logo-1-p"/>
                        </Link>
                    </div>
                    <div className="keterangan-verifikasi-desk"  style={{marginTop: "35px", marginLeft: "30px"}}>Alamat Pengiriman</div>
                </div>
                <div className="d-lg-block d-md-block d-none">
                <div className="keterangan-verifikasi-ap">Alamat Pengiriman</div>
                </div>
                <div className="garis-alamat"></div>
                </div>
                    <div className="box-inside-pp">
                       {
                        data.length > 0 ?
                         <>
                         {
                           loading ? 
                           <> <div className="box-pd d-flex justify-content-center align-items-center mt-5"><RingLoader color={'#E0004D'} size={150}/></div></>
                           :
                           <div className="box-mp">{printData()}
                                <div className="button-tambah-alamat-2"  onClick={() => navigate('/FormAddress')} >Add New Address</div>
                           </div>
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
                           <p style={{color:'#213360', fontSize:'20px', fontWeight:'700', margin:'0px 0px 10px'}}>Oops, alamat masih kosong</p>
                           <p style={{color:'#8f939e', fontSize:'14px', margin:'0px 0px 30px'}}>Silahkan isi alamat terlebih dahulu</p>
                           <div className="button-tambah-alamat"  onClick={() => navigate('/FormAddress')} >Add New Address</div>
                       </div>
                         }
                        </>
                      }
             <div className="box-pagination-semua d-flex">
             {
               data.length > 2 ?
               <ul className="pageNumbers2">
          
               <li className="mx-3">
                     {
                        data.length > 2 ?
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
                        data.length > 2 ?
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
          <>{alamatPage()}</>
        )
      }
    }else{
      if(localStorage.getItem('token') === tokenUser){
        if(verified === 0){
          return(
            <Navigate to='/verification' />
          )
        }else{
          return(
            <>{alamatPage()}</>
          )  
        }
      }else{
        return(
          <Navigate to='/' />
        ) 
      }
    }
}

export default AlamatPage