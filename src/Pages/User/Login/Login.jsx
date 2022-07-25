import React, { useState } from 'react';
import './Login.css';
import Divider from '@mui/material/Divider';
import gambar from './../../../Assets/login.svg';
import google from './../../../Assets/googleL.svg';
import pLogin from './../../../Assets/pLogin.svg';
import passLogin from './../../../Assets/passLogin.svg';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import Axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import PulseLoader from 'react-spinners/PulseLoader';
import Swal from 'sweetalert2';

const Login = () => {
  const [password, setPassword] = useState('');
  const [account, setAccount] = useState('');
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myTkn, setMyTkn] = useState('');
  const navigate = useNavigate();
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
  });

  const [inVisible, setInVisible] = useState({
    type: 'password',
    title: 'Show',
  });

  const handleVisible = () => {
    if (inVisible.type === 'password') {
      setInVisible({
        type: 'text',
        title: 'Hide',
      });
    } else {
      setInVisible({
        type: 'password',
        title: 'Show',
      });
    }
  };

  const onSubmit = () => {
    setLoading(false);
    let data = {
      account: account,
      password: password,
    };
    if (!account || !password) {
      return Toast.fire({ html: 'Fill All Data!', icon: 'error', title: 'ERROR!' });
    }
    setLoading(true);
    Axios.post(`${API_URL}/user/login`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.error === true) {
          setLoading(false);
          console.log(res.data.message);
          return Swal.fire({
            title: 'Error!',
            text: res.data.message,
            icon: 'error',
            confirmButtonText: 'Okay!',
          });
        }
        if (res.data.error === false) {
          localStorage.setItem('myTkn', res.data.token);
          if (res.data.verified === 0) {
            setMyTkn(res.data.token);
            navigate('/verification');
          } else if (res.data.verified === 1) {
            setMyTkn(res.data.token);
            navigate('/');
          }
        }
      })
      .catch((err) => {
        console.log('ini erroe', err);
        setLoading(false);
      });
  };

  const loginUser = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 image-register">
            <img src={gambar} alt="" className="" />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 box-form-register">
            <div className="form-login">
              <div id="naviadmin">
                <div className="d-flex mt-5 mb-4 " style={{ marginLeft: '268px' }}>
                  <Link to="/login" style={{ textDecoration: 'none', color: '#213360', cursor: 'pointer' }}>
                    <div className="tab-1-admin-login">USER</div>
                  </Link>
                  <Link to="/loginadmin" style={{ textDecoration: 'none', color: '#213360', cursor: 'pointer' }}>
                    <div className="tab-2-admin-login">ADMIN</div>
                  </Link>
                </div>
              </div>
              <div className="mb-2  mkm">Masuk</div>
              <div className="mb-4 spa">
                Belum Punya Akun?{' '}
                <span>
                  <Link to="/register" style={{ textDecoration: 'none', color: 'red' }}>
                    Daftar
                  </Link>
                </span>
              </div>
              <label for="exampleFormControlInput1" className="form-label">
                Username or Email
              </label>
              <InputGroup className="mb-2">
                <InputGroupText className="icon-email-resetpassword">
                  <img src={pLogin} alt="" />
                </InputGroupText>
                <Input placeholder="" onChange={(e) => setAccount(e.target.value)} />
              </InputGroup>
              <label for="exampleFormControlInput1" className="form-label">
                Password
              </label>
              <InputGroup className="mb-2">
                <InputGroupText className="icon-email-resetpassword">
                  <img src={passLogin} alt="" />
                </InputGroupText>
                <Input placeholder="" type={inVisible.type} value={password} onChange={(e) => setPassword(e.target.value)} />
                {inVisible.title === 'Show' ? (
                  <Button className="icon-email-newpassword btn-light" onClick={handleVisible}>
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                ) : (
                  <Button className="icon-email-newpassword btn-light" onClick={handleVisible}>
                    <FontAwesomeIcon icon={faEyeSlash} />
                  </Button>
                )}
              </InputGroup>
              <div className="text-end mb-4 spa">
                Lupa Kata
                <span>
                  {' '}
                  <Link to="/resetpassword" style={{ textDecoration: 'none', color: 'red' }}>
                    Sandi?
                  </Link>
                </span>{' '}
              </div>
              <div className="mb-3">
                {loading ? (
                  <button type="button" disabled className="btn btn-danger w-100 button-au">
                    <PulseLoader color={'#FFFFFF'} loading={loading} cssOverride={{ borderColor: 'white', margin: '0 auto' }} size={10} />
                  </button>
                ) : (
                  <button type="button" className="btn btn-danger w-100 button-au " onClick={() => onSubmit()}>
                    {' '}
                    Masuk
                  </button>
                )}
              </div>
              <br />
              <div className="spa">
                <Divider>Atau masuk dengan</Divider>
              </div>
              <br />
              <div className="mb-5  ">
                <button className=" btn btn-outline-danger w-100 login-other">
                  <img className="me-2" src={google} alt="" /> Masuk dengan Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (localStorage.getItem('myTkn')) {
    if (verified === 0) {
      return <Navigate to="/verification" />;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    if (localStorage.getItem('token') === myTkn) {
      if (verified === 0) {
        return <Navigate to="/verification" />;
      } else {
        return <Navigate to="/" />;
      }
    } else {
      return <>{loginUser()}</>;
    }
  }


};

export default Login;
