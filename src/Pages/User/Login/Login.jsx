import React, { useState } from 'react';
import './Login.css';
import Divider from '@mui/material/Divider';
import gambar from './../../../Assets/login.svg';
import google from './../../../Assets/googleL.svg';
import pLogin from './../../../Assets/pLogin.svg';
import passLogin from './../../../Assets/passLogin.svg';
import { useDispatch } from 'react-redux';
import { onUserLogin } from '../../../Redux/Actions/userAction';
import { Navigate, Link } from 'react-router-dom';
import { InputGroup, InputGroupText, Input, Button } from 'reactstrap';

const Login = () => {
  const [password, setPassword] = useState('');
  const [account, setAccount] = useState('');
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const [direct, setDirect] = useState(false);
  // const { is_login } = useSelector((state) => state.userReducer);

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

  // if (!direct || is_login) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div className="container-register">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6">
          <img src={gambar} alt="" />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 form-register">
          <div className="mb-4">Masuk</div>
          <label for="exampleFormControlInput1" className="form-label">
            Username or Email
          </label>
          <InputGroup className=" col-12 col-sm-12 col-12 mb-3">
            <InputGroupText className="icon-email-resetpassword">
              <img src={pLogin} alt="" />
            </InputGroupText>
            <Input placeholder="" onChange={(e) => setAccount(e.target.value)} />
          </InputGroup>
          <label for="exampleFormControlInput1" className="form-label">
            Password
          </label>
          <InputGroup className=" col-12 col-sm-12 col-12">
            <InputGroupText className="icon-email-resetpassword">
              <img src={passLogin} alt="" />
            </InputGroupText>
            <Input placeholder="" onChange={(e) => setPassword(e.target.value)} />
            <Button className="icon-email-newpassword">@</Button>
          </InputGroup>
          <div className="row justify-content-evenly">
            <div className="col-6 ">
              <div className="mb-4">
                <input type="checkbox" value="" id="flexCheckDefault" />
                <label for="flexCheckDefault">Ingat Saya</label>
              </div>
            </div>
            <div className="col-6">
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
            <button className="col-12 btn btn-outline-danger" disabled={disable ? true : false}>
              <img className="me-2" src={google} alt="" /> Daftar dengan Google Masuk dengan Google
            </button>
          </div>
          <div>
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
