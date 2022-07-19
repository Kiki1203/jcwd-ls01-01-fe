import React, { useState } from "react";
import './TemplateProsesPemesanan.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLine, faBell, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import SidebarProfile from "../SidebarProfile/SidebarProfile";
import Sidebar2 from "../SidebarProsesPemesanan/Sidebar2";

const TemplateProsesPemesanan  = () => {
  const navigate = useNavigate()
    
    
    return(
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
                  <Sidebar2 />
                </div>
                
             </div>
         </div>
         </div> 
     </div>
     </div>
    )
}

export default TemplateProsesPemesanan