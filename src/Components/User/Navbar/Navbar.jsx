import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from './../../../Assets/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faCartShopping, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
// import { useSelector } from 'react-redux';
// import { onCheckUserLogin, onUserLogout } from '../../../Redux/Actions/userAction';

const Navbar = () => {
  let [dropdownOpen, setDropdownOpen] = useState(false); 
  const [username, setUsername] = useState([]);
  const [verified, setVerified] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
  let token = localStorage.getItem('myTkn')
  const headers = {
      headers: { 
          'Authorization': `${token}`,
      }
  }
  axios.get(`${API_URL}/user/checkuserverify`, headers)
  .then((res) => {
      console.log('verified',res.data)
      setVerified(res.data.verified)
      setUsername(res.data.username)
  
  }).catch((err) => {
      console.log('ini err get',err)
  })
}, [])

  const btnLogOut = () => {
    localStorage.removeItem('myTkn');
     navigate("/")
  }

   const btnLogOut2 = () => {
    localStorage.removeItem('myTkn');
     navigate("/login")
  }

  

  if (localStorage.getItem('myTkn')){
    return (
      <div id="navbar" className="d-lg-block d-md-block d-none">
        <div className="box-navbar-logo">
       {
         verified === 0 ?
         <a className="navbar-brand brand">
         <img src={logo} alt="" />
         Apotakecare
       </a>
       :
       <a className="navbar-brand brand" href="/">
       <img src={logo} alt="" />
       Apotakecare
     </a>
       }
        </div>
        <div className="box-navbar-search-2">
          <form>
              <input className="form-control input-home-2"  type="search" placeholder="Cari Obat, Suplemen, Vitamin, produk Kesehatan" aria-label="Search"   />
              <FontAwesomeIcon icon={faMagnifyingGlass} className='logo-input-home-2'/>
            </form>
        </div>
        <div className="box-navbar-dropdown">
           
           {
            verified === 0 ?
            <>
            <FontAwesomeIcon icon={faBell} style={{textDecoration: "none", cursor:"pointer", color:"#E0004D"}}/>
        <FontAwesomeIcon icon={faCartShopping} style={{textDecoration: "none", cursor:"pointer", color:"#E0004D"}}/>
        <FontAwesomeIcon icon={faArrowRightFromBracket}  onClick={() => btnLogOut2()} style={{textDecoration: "none", cursor:"pointer", color:"#E0004D"}} />
            </>
            :
           <>
            <FontAwesomeIcon icon={faBell} style={{textDecoration: "none", cursor:"pointer", color:"#E0004D"}}/>
            <Link to="/cart" style={{textDecoration: "none", cursor:"pointer", color:"#E0004D"}}>
            <FontAwesomeIcon icon={faCartShopping} />
            </Link>
            <div>
            <Dropdown isOpen={dropdownOpen}
                toggle={() => setDropdownOpen(!dropdownOpen)}>
                <DropdownToggle id="dropdown-navbar" className="rounded-0">
                <FontAwesomeIcon icon={faUser} />
                <div>{username}</div>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                      <div  onClick={() => navigate('/profile')}  style={{textDecoration: "none", cursor:"pointer", color:"black"}}>
                      Profile
                      </div>
                    </DropdownItem>
                    <DropdownItem>
                       <div  onClick={() => btnLogOut()}  style={{textDecoration: "none", cursor:"pointer", color:"black"}}>Log Out</div>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
          </div>
           </>

          }
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
}

export default Navbar;