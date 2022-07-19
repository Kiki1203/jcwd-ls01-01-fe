import React, { useState } from "react";
import './TemplateProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import default1 from '../../../Assets/default.jpg';
import { faUser, faReceipt, faAngleLeft, faMoneyBills, faLocationDot, faHeart, faEnvelope, faPenToSquare, faAngleRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import SidebarProfile from "../SidebarProfile/SidebarProfile.jsx"

const TemplateProfile  = () => {    
    return(
        <div className="container-tp">
        <div>
         <div className="wrapper">
         <div className="c d-flex">
             <div className='col-lg-3 col-md-2 d-lg-block d-md-block d-none sidebar-new-1'>
                <SidebarProfile/>
             </div>
             <div  className='col-lg-1 col-none d-lg-block d-md-none d-none'>
                 
             </div>
             <div  className='col-lg-8 col-md-10 col-12 sidebar-new'>
                
             </div>
         </div>
         </div> 
     </div>
     </div>
    )
}

export default TemplateProfile