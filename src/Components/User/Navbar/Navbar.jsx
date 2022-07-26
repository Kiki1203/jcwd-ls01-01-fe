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
import { useDispatch } from 'react-redux';
import { getUserData } from '../../../Redux/Actions/userAction';

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
  const dispatch = useDispatch()

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
        dispatch(getUserData(res.data.id, res.data.verified))
    }).catch((err) => {
        console.log('ini err verified',err)
    })
}, [verified, token])

  const btnLogOut = () => {
    localStorage.removeItem('myTkn');
    dispatch(getUserData('',0))
    navigate("/")
  }

   const btnLogOut2 = () => {
    localStorage.removeItem('myTkn');
    dispatch(getUserData('',0))
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
        <div className='d-flex'>
        <div className="box-navbar-logo">
        <a className="navbar-brand brand" href="/">
          <img src={logo} alt="" />
          Apotakecare
          </a>
        </div>
        <div className="box-navbar-search">
            <form>
              <input className="form-control input-home" 
              onChange={(e) => {
                setSearch(e.target.value)
                e.target.value ? setBubbleOpen(true)
                : setBubbleOpen(false)
              }}
               type="search" placeholder="Cari Obat, Suplemen, Vitamin..." aria-label="Search"   />
              <FontAwesomeIcon icon={faMagnifyingGlass} className='logo-input-home'/>
            </form>
            {
              bubbleOpen && <SearchBubble searchQuery={search} products={products} setBubbleOpen={setBubbleOpen} total={total} />
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
            <FontAwesomeIcon icon={faBell} style={{textDecoration: "none", cursor:"pointer", color:"#E0004D", fontSize:'16px'}}/>
            <Link to="/cart" style={{textDecoration: "none", cursor:"pointer", color:"#E0004D"}}>
            <FontAwesomeIcon icon={faCartShopping} style={{fontSize:'16px'}} />
            </Link>
            <div>
            <Dropdown isOpen={dropdownOpen}
                toggle={() => setDropdownOpen(!dropdownOpen)}>
                <DropdownToggle id="dropdown-navbar" className="rounded-0 border-0 p-0">
                <FontAwesomeIcon icon={faUser} />
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
              <input className="form-control input-home"  type="search" placeholder="Cari Obat, Suplemen, Vitamin..." aria-label="Search"
                 onChange={(e) => {
                  setSearch(e.target.value)
                  e.target.value ? setBubbleOpen(true)
                  : setBubbleOpen(false)
                }}/>
              <FontAwesomeIcon icon={faMagnifyingGlass} className='logo-input-home'/>
            </form>
            {
              bubbleOpen && <SearchBubble searchQuery={search} products={products} setBubbleOpen={setBubbleOpen} total={total} />
            }
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