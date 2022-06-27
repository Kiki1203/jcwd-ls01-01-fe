import React from 'react';
import './Navbar.css';
import logo from './../../../Assets/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-sm navContainer">
          <div className="container-fluid">
            <a className="navbar-brand brand" href="/">
              <img src={logo} alt="" />
              Apotakecare
            </a>
            <form className="d-flex SearchBar" role="search">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="search " />
              <input className="form-control me-2 input1" type="search" placeholder="Cari Obat, Suplemen, Vitamin, produk Kesehatan" aria-label="Search" />
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
