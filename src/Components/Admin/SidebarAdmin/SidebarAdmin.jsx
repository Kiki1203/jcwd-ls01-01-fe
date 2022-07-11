import React, { useState } from "react";
import './SidebarAdmin.css';
import logo from './../../../Assets/logo.svg';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin.jsx';
import { Collapse, Button } from "reactstrap"
import { SidebarData } from './SidebarData';
import { Link} from "react-router-dom";
import SubMenu from './SubMenu';

const SidebarAdmin  = () => {

    const [isOpen, setIsOpen] = React.useState(false);

    return(
        <div>
            <NavbarAdmin/>
            <div className="box-container">
                <div className="sidebar-nav">
                    <div className="sidebar-wrap">
                        <div className="box-nav-icon">
                            <Link to="/homeadmin" style={{cursor: 'pointer', textDecoration: "none"}}>
                                <img src={logo} alt="" className="logo-admin-sidebar" />
                            <div className="apotakecare-admin">Apotakecare</div>
                            </Link>
                       
                        </div>
                        {SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default SidebarAdmin