import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from './../../../Assets/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faCartShopping, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import SearchBubble from '../SearchBubble/SearchBubble';

const Navbar = () => {
  let [dropdownOpen, setDropdownOpen] = useState(false); 
  const [username, setUsername] = useState([]);
  const [verified, setVerified] = useState([])
  const navigate = useNavigate()
  const [bubbleOpen, setBubbleOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [token, setToken] = useState('')
  let params = useParams();

  useEffect(() => {
    if(search.length){
      axios.get(`${API_URL}/product/searchproducts?entry=${search}`, {headers: {'Access-Control-Allow-Origin': '*'}})
      .then((res) => {
          setProducts(res.data.products)
          setTotal(res.data.total)
      }).catch((err) => {
          console.log('Error di search:', err)
      })
    }
  }, [search])

  useEffect(() => {
    let tokens = localStorage.getItem('myTkn')
    const headers = {
        headers: { 
            'Authorization': `${tokens}`,
        }
    }
    axios.get(`${API_URL}/user/checkuserverify`, headers)
    .then((res) => {
        setVerified(res.data.verified)
        setUsername(res.data.username)
        setToken(res.data.token)
    }).catch((err) => {
        console.log('ini err verified',err)
    })
}, [verified, token])

  const btnLogOut = () => {
    localStorage.removeItem('myTkn');
    navigate("/")
  }

   const btnLogOut2 = () => {
    localStorage.removeItem('myTkn'); 
     navigate("/login")
  }

  if(localStorage.getItem('token')){
    if(localStorage.getItem('token') !== token){
      return (
        <></>
      )
    }
  }
 

  if (localStorage.getItem('myTkn') || localStorage.getItem('token') === token){
    return (
      <div id="navbar" className="d-lg-block d-md-block d-none">
         {
        bubbleOpen && <SearchBubble searchQuery={search} products={products} setBubbleOpen={setBubbleOpen} total={total} />
      }
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
          {
            verified === 0 ?
            <>
             <form>
              <input className="form-control input-home-2"  type="search" placeholder="Cari Obat, Suplemen, Vitamin, produk Kesehatan" aria-label="Search"   />
              <FontAwesomeIcon icon={faMagnifyingGlass} className='logo-input-home-2'/>
            </form>
            </>
            :
            <>
            <div className='d-lg-none d-md-block d-none'>
            <form>
              <input className="form-control input-home-2" 
              onChange={(e) => {
                setSearch(e.target.value)
                e.target.value ? setBubbleOpen(true)
                : setBubbleOpen(false)
              }}
               type="search" placeholder="Cari Obat..." aria-label="Search"   />
              <FontAwesomeIcon icon={faMagnifyingGlass} className='logo-input-home-2'/>
            </form>
            </div>
            <div className='d-lg-block d-md-none d-none'>
            <form>
              <input className="form-control input-home-2" 
              onChange={(e) => {
                setSearch(e.target.value)
                e.target.value ? setBubbleOpen(true)
                : setBubbleOpen(false)
              }}
               type="search" placeholder="Cari Obat, Suplemen, Vitamin, produk Kesehatan" aria-label="Search"   />
              <FontAwesomeIcon icon={faMagnifyingGlass} className='logo-input-home-2'/>
            </form>
            </div>
            </>
          }
         
        </div>
        <div className="box-navbar-dropdown">
           
           {
            verified === 0 ?
            <>
              <div className="box-veri">
              <FontAwesomeIcon icon={faBell} style={{textDecoration: "none", cursor:"pointer", color:"#E0004D"}}/>
            <FontAwesomeIcon icon={faCartShopping} style={{textDecoration: "none", cursor:"pointer", color:"#E0004D"}}/>
            <FontAwesomeIcon icon={faArrowRightFromBracket}  onClick={() => btnLogOut2()} style={{textDecoration: "none", cursor:"pointer", color:"#E0004D"}} />
              </div>
            </>
            :
           <>
            <FontAwesomeIcon icon={faBell} style={{textDecoration: "none", cursor:"pointer", color:"#E0004D", marginLeft: "20px",  marginTop: "15px"}}/>
            <Link to="/cart" style={{textDecoration: "none", cursor:"pointer", color:"#E0004D", marginLeft: "20px", marginTop: "15px"}}>
            <FontAwesomeIcon icon={faCartShopping} />
            </Link>
            <div>
            <Dropdown isOpen={dropdownOpen}
                toggle={() => setDropdownOpen(!dropdownOpen)}>
                <DropdownToggle id="dropdown-navbar" className="rounded-0 border-0 mt-2">
                <FontAwesomeIcon icon={faUser} className="mx-2" />
                <div className="navbar-hi-user">Hi, {username}</div>
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
  }else{
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


}

export default Navbar;