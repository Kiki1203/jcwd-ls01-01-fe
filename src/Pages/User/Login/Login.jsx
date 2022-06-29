import React, { useState } from 'react';
import './Login.css';
import Divider from '@mui/material/Divider';
import gambar from './../../../Assets/login.svg';
import logo from './../../../Assets/logo.svg';
import google from './../../../Assets/googleL.svg';
import { useDispatch } from 'react-redux';
import { onUserLogin } from '../../../Redux/Actions/userAction';
import { Navigate, Link } from 'react-router-dom';
// import { Redirect } from 'react-router';

const Login = () => {
  const [password, setPassword] = useState('');
  const [account, setAccount] = useState('');
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const [direct, setDirect] = useState(false);

  const onSubmit = () => {
    let data = {
      account: account,
      password: password,
    };
    setDisable(false);
    dispatch(onUserLogin(data));
    setDirect(true);
  };

  if (direct || localStorage.getItem('myTkn')) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container-fluid ">
      <div className="row haedR">
        <div className="col-6  formGambar">
          <div className="registerlogo" href="/">
            <img src={logo} alt="" />
            Apotakecare
          </div>
          <div className="registerslogan">Apotek Online Khusus Untuk Keperluanmu</div>
          <img className="gambar" src={gambar} alt="" />
        </div>
        <div className="col-6 form">
          <div className="header-form-register mb-4">Masuk</div>

          <div class="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Name or Email
            </label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Input Username or Email" onChange={(e) => setAccount(e.target.value)} />
          </div>
          <div className="">
            <label for="exampleFormControlInput1" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Input Password " onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="row justify-content-evenly fc mt-2">
            <div className="col-6 ">
              <div className="form-check  mb-4">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" for="flexCheckDefault">
                  Ingat Saya
                </label>
              </div>
            </div>
            <div className="col-6 text-end">
              Lupa Kata
              <span>
                {' '}
                <Link to="/resetpassword" style={{ textDecoration: 'none', color: 'red' }}>
                  Sandi?
                </Link>
              </span>{' '}
            </div>
          </div>
          <div classNameName="mb-3">
            <button type="button" className="btn btn-danger col-12" disabled={disable ? true : false} onClick={onSubmit}>
              Masuk
            </button>
          </div>
          <br />
          <Divider>Atau masuk dengan</Divider>
          <br />
          <div className="mb-5  ">
            <button className="col-12 btn btn-outline-danger gb" disabled={disable ? true : false}>
              <img className="googleL me-2" src={google} alt="" /> Daftar dengan Google Masuk dengan Google
            </button>
          </div>
          <div className="bpm">
            Belum Punya Akun?{' '}
            <span>
              <Link to="/register" style={{ textDecoration: 'none', color: 'red' }}>
                Daftar
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;