import React, { useState } from 'react';
import './Login.css';
import Divider from '@mui/material/Divider';
import gambar from './../../../Assets/login.svg';
import logo from './../../../Assets/logo.svg';
import { useDispatch } from 'react-redux';
import { onUserLogin } from '../../../Redux/Actions/userAction';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const [account, setAccount] = useState('');
  const dispatch = useDispatch();
  // const is_login = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const onSubmit = () => {
    let data = {
      account: account,
      password: password,
    };
    dispatch(onUserLogin(data));
    navigate('/');
  };

  // useEffect(() => {
  //   onCheckUserLogin();
  // }, [is_login]);

  if (localStorage.getItem('myTkn')) {
    return navigate('/');
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
          <div className="row justify-content-between">
            <div className="col-6">
              <div className="form-check  mb-4">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" for="flexCheckDefault">
                  Ingat Saya
                </label>
              </div>
            </div>
            <div className="col-6 text-end">Lupa Kata Sandi?</div>
          </div>
          <div classNameName="mb-3">
            <button type="button" className="btn btn-danger col-12 " onClick={onSubmit}>
              Masuk
            </button>
          </div>
          <br />
          <Divider>Atau masuk dengan</Divider>
          <br />
          <div>
            <button className="col-12">Masuk dengan Google</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;