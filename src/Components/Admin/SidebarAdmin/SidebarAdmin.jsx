import React, { useState } from "react";
import './SidebarAdmin.css';
import LogoFull from '../../../Assets/LogoFull.svg';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin.jsx';
import { Collapse, Button } from "reactstrap"
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';

const SidebarAdmin  = () => {

    const [isOpen, setIsOpen] = React.useState(false);

    return(
        <div>
            <NavbarAdmin/>
            <div className="box-container">
                <div className="sidebar-nav">
                    <div className="sidebar-wrap">
                        <div className="box-nav-icon" to='#'>
                        <div>Apotakecare</div>
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