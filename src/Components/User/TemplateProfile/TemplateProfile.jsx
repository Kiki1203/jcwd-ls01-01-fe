import React, { useState } from "react";
import './TemplateProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import default1 from '../../../Assets/default.jpg';
import { faUser, faReceipt, faAngleLeft, faMoneyBills, faLocationDot, faHeart, faEnvelope, faPenToSquare, faAngleRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const TemplateProfile  = () => {    
    return(
        <div className="container-tp">
        <div>
         <div className="wrapper">
         <div className="c d-flex">
             <div className='col-lg-3 col-md-2 d-lg-block d-md-block d-none sidebar-new-1'>
                 <div className="mt-4 d-flex sidebar-box-1"> 
                     <div className="sidebar-pp-box">
                         <img  src={default1} alt='Image Preview' id='userImgSide' />
                     </div>
                     <div className='sidebar-name-box mt-2 mx-3'>nama</div>
                 </div>
                 <br/>
                 <div  className='d-lg-block d-md-none d-none'>
                 <hr/>
                 </div>
                 <br/>
                 <div className="d-flex sidebar-box-1">
                     <FontAwesomeIcon icon={faUser} />
                     <div className='sidebar-name-box' style={{marginBottom: "3px", marginLeft: "30px"}}>Profile</div>
                 </div>
                 <br/>
                 <br/>
                 <div className="d-flex sidebar-box-1">
                     <FontAwesomeIcon icon={faReceipt} />
                     <div className='sidebar-name-box' style={{marginBottom: "3px", marginLeft: "30px"}}>Proses Pemesanan</div>
                 </div>
                 <br/>
                 <br/>
                 <div className="d-flex sidebar-box-1">
                     <FontAwesomeIcon icon={faMoneyBills} />
                     <div className='sidebar-name-box' style={{marginBottom: "5px", marginLeft: "20px"}}> Metode Pembayaran</div>
                 </div>
                 <br/>
                 <br/>
                 <div className="d-flex sidebar-box-1">
                     <FontAwesomeIcon icon={faLocationDot} />
                     <div className='sidebar-name-box' style={{marginBottom: "3px", marginLeft: "30px"}}> Alamat Pengiriman</div>
                 </div>
                 <br/>
                 <br/>
                 <div className="d-flex sidebar-box-1">
                     <FontAwesomeIcon icon={faHeart} />
                     <div className='sidebar-name-box' style={{marginBottom: "5px", marginLeft: "30px"}}> Favorite</div>
                 </div>
                 <br/>
                 <br/>
                 <div className="d-flex sidebar-box-1">
                     <FontAwesomeIcon icon={faEnvelope} />
                     <div className='sidebar-name-box' style={{marginBottom: "5px", marginLeft: "30px"}}>Pesan Bantuan</div>
                 </div>
                 <br/>
                 <br/>
                 <br/>
                 <br/>
                 <br/>
             </div>
             <div  className='col-lg-1 col-none d-lg-block d-md-none d-none'>
                 
             </div>
             <div  className='col-lg-8 col-md-10 col-12 sidebar-new  d-lg-block d-md-block d-none'>
                
             </div>
         </div>
         </div> 
     </div>
     </div>
    )
}

export default TemplateProfile