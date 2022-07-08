import React, { useEffect } from 'react';
import './Navbar.css';
import logo from './../../../Assets/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import SearchBubble from '../SearchBubble/SearchBubble';
import { useState } from 'react';
import axios from 'axios';
import API_URL from "../../../Helpers/API_URL.js"


const Navbar = () => {
  const [bubbleOpen, setBubbleOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)

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

  return (
    <div className='d-lg-block d-md-block d-none'>
      {
        bubbleOpen && <SearchBubble searchQuery={search} products={products} setBubbleOpen={setBubbleOpen} total={total} />
      }
      <div>
        <nav className="navbar navbar-expand-sm navContainer">
          <div className="container-fluid">
            <a className="navbar-brand brand" href="/">
              <img src={logo} alt="" />
              Apotakecare
            </a>
            <form className="d-flex SearchBar" role="search">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="search " />
              <input className="form-control me-2 input1" type="search" placeholder="Cari Obat, Suplemen, Vitamin, produk Kesehatan" aria-label="Search"  onChange={(e) => {
                      setSearch(e.target.value)
                      e.target.value ? setBubbleOpen(true)
                      : setBubbleOpen(false)

                    }} />
              <input className="form-control me-2 input2" type="search" placeholder="Cari Obat, Vitamin, dan lainnya" aria-label="Search" />
            </form>
            <FontAwesomeIcon icon={faBell} className="lbell  " />
            <FontAwesomeIcon icon={faCartShopping} className="lcart   " />
            <FontAwesomeIcon icon={faBell} className="Obell  " />
            <FontAwesomeIcon icon={faCartShopping} className="Ocart   " />
            <div class="dropdown user">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                User
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            {/* <button type="button" className="btn btn-outline-danger btn-edit1">
              Masuk
            </button>
            <button type="button" className="btn btn-danger btn-edit">
              Daftar
            </button> */}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
