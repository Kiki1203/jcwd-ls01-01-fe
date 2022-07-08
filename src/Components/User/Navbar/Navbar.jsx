import React, { useEffect } from 'react';
import './Navbar.css';
import logo from './../../../Assets/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, InputGroupText, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { onCheckUserLogin, onUserLogout } from '../../../Redux/Actions/userAction';

const Navbar = () => {
  // const navigate = useNavigate();
  // const { is_login } = useSelector((state) => state.userReducer);

  // useEffect(() => {
  //   onUserLogout();
  //   onCheckUserLogin();
  // }, []);

  const navbar = () => {
    if (localStorage.getItem('myTkn')) {
      const btnLogOut = () => {
        localStorage.removeItem('myTkn');
      };
      return [
        <div className="col-1">
          {' '}
          <FontAwesomeIcon icon={faBell} />
        </div>,
        <div className="col-1">
          <FontAwesomeIcon icon={faCartShopping} />
        </div>,
        <div className="col-1">
          <button type="button" className="btn btn-danger " onClick={() => btnLogOut()}>
            logout
          </button>
        </div>,
      ];
    } else {
      return [
        <Link to="/login" style={{ textDecoration: 'none', color: 'red' }} className="col-1">
          <button type="button" className="btn btn-outline-danger btn-masuk">
            Masuk
          </button>
        </Link>,
        <Link to="/register" style={{ textDecoration: 'none', color: 'red' }} className="col-1">
          <button className="btn btn-danger btn-daftar" type="submit" name="action">
            Daftar
          </button>
        </Link>,
      ];
    }
  };
  return (
    <div id="navbar">
      <div className="container-fluid">
        <div className="row justify-content-evenly align-content-center navbar-apotakecare ">
          <div className="col-2">
            <a className="navbar-brand brand" href="/">
              <img src={logo} alt="" />
              Apotakecare
            </a>
            {/* <form className="d-flex SearchBar" role="search">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="search " />
              <input className="form-control me-2 input1" type="search" placeholder="Cari Obat, Suplemen, Vitamin, produk Kesehatan" aria-label="Search"  onChange={(e) => {
                      setSearch(e.target.value)
                      e.target.value ? setBubbleOpen(true)
                      : setBubbleOpen(false)

                    }} />
              <input className="form-control me-2 input2" type="search" placeholder="Cari Obat, Vitamin, dan lainnya" aria-label="Search" />
            </form> */}
          </div>
          <div className="col-6 d-flex">
            <InputGroup>
              <InputGroupText>
                {' '}
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </InputGroupText>
              <Input placeholder="Cari Obat, Suplemen, Vitamin, produk Kesehatan" className="search" />
            </InputGroup>
          </div>
          {navbar()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
