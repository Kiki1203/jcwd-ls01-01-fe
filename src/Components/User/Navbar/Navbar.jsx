import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from './../../../Assets/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
// import { useSelector } from 'react-redux';
// import { onCheckUserLogin, onUserLogout } from '../../../Redux/Actions/userAction';

const Navbar = () => {
  let [dropdownOpen, setDropdownOpen] = useState(false); 
  const navigate = useNavigate()
  const btnLogOut = () => {
    localStorage.removeItem('myTkn');
     navigate("/")
  }

  if (localStorage.getItem('myTkn')){
    return (
      <div id="navbar" className="d-lg-block d-md-block d-none">
        <div className="box-navbar-logo">
        <a className="navbar-brand brand" href="/">
                <img src={logo} alt="" />
                Apotakecare
              </a>
        </div>
        <div className="box-navbar-search-2">
          <form>
              <input className="form-control input-home-2"  type="search" placeholder="Cari Obat, Suplemen, Vitamin, produk Kesehatan" aria-label="Search"   />
              <FontAwesomeIcon icon={faMagnifyingGlass} className='logo-input-home-2'/>
            </form>
        </div>
        <div className="box-navbar-dropdown">
            <FontAwesomeIcon icon={faBell} style={{textDecoration: "none", cursor:"pointer", color:"#E0004D"}}/>
            <Link to="/cart" style={{textDecoration: "none", cursor:"pointer", color:"#E0004D"}}>
            <FontAwesomeIcon icon={faCartShopping} />
            </Link>
            <div>
              <Dropdown isOpen={dropdownOpen}
                  toggle={() => setDropdownOpen(!dropdownOpen)}>
                  <DropdownToggle id="dropdown-navbar" className="rounded-0">
                  <FontAwesomeIcon icon={faUser} />
                  <div>username</div>
                  </DropdownToggle>
                  <DropdownMenu>
                      <DropdownItem>
                      <Link to="/profile" style={{textDecoration: "none", cursor:"pointer", color:"black"}}>
                        Profile
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                         <div  onClick={() => btnLogOut()}>Log Out</div>
                      </DropdownItem>
                  </DropdownMenu>
              </Dropdown>
            </div>
        </div>
      </div>
    );
  }


  return (
    <div id="navbar" className="d-lg-block d-md-block d-none">
      <div className="box-navbar-logo">
      <a className="navbar-brand brand" href="/">
              <img src={logo} alt="" />
              Apotakecare
            </a>
      </div>
      <div className="box-navbar-search">
        <form>
            <input className="form-control input-home"  type="search" placeholder="Cari Obat, Suplemen, Vitamin, produk Kesehatan" aria-label="Search"   />
            <FontAwesomeIcon icon={faMagnifyingGlass} className='logo-input-home'/>
          </form>
      </div>
      <div className="box-navbar-button">
      <Link to="/login" style={{ textDecoration: 'none'}}>
          <button type="button" className="btn-masuk-home">
            Masuk
          </button>
        </Link>
        <Link to="/register" style={{ textDecoration: 'none'}}>
          <button className="btn-daftar-home" type="submit" name="action">
            Daftar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;