import React, { useState, useEffect } from 'react';
import './Login.css';
import Divider from '@mui/material/Divider';
import gambar from './../../../Assets/Frame.svg';
import google from './../../../Assets/googleL.svg';
import pLogin from './../../../Assets/pLogin.svg';
import passLogin from './../../../Assets/passLogin.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import Axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';

const Login = () => {
  const [password, setPassword] = useState('');
  const [account, setAccount] = useState('');
  const [disable, setDisable] = useState(false);
  const [direct, setDirect] = useState(false);

  // useEffect(() => {
  //     onCheckUserLogin()
  //  }, [])

  const navigate = useNavigate()

//   useEffect(() => {
//     onSubmit()
// }, [])

  const onSubmit = () =>{
    let data = {
      account: account,
      password: password,
    };

    Axios.post(`${API_URL}/user/login`, data)
    .then((res) => {
      console.log(res.data)
      localStorage.setItem('myTkn', res.data.token)
      if(res.data.verified === 0){
        navigate("/verification")
      }
      
      if(res.data.verified === 1){
        navigate("/")
      }
      
    }).catch((err) => {
        console.log('ini err get',err)
       
    })
  };

  if(localStorage.getItem('token')){
    return(
        <Navigate to='/homeadmin' />
    )
  }

  if(localStorage.getItem('myTkn')){
    return(
        <Navigate to='/' />
    )
}

  return (
    <div className="container-login">
      <div className="d-flex">
        <div className="box-image-login">
          <img src={gambar} alt="" className="image-login"/>
        </div>
        <div className="form-login">
        <div className='tab-button-admin-login' style={{marginLeft: "600px"}}>
          <Link to="/login" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
            <div className='tab-1-admin-login'>USER</div>
          </Link>
          <Link to="/loginadmin" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
            <div className='tab-2-admin-login'>ADMIN</div>
          </Link>
        </div>
          <div className="mb-4 mt-5">Masuk</div>
          <label for="exampleFormControlInput1" className="form-label">
            Username or Email
          </label>
          <InputGroup className="">
            <InputGroupText className="icon-email-resetpassword">
              <img src={pLogin} alt="" />
            </InputGroupText>
            <Input placeholder="" onChange={(e) => setAccount(e.target.value)} />
          </InputGroup>
          <label for="exampleFormControlInput1" className="form-label">
            Password
          </label>
          <InputGroup className="">
            <InputGroupText className="icon-email-resetpassword">
              <img src={passLogin} alt="" />
            </InputGroupText>
            <Input placeholder="" onChange={(e) => setPassword(e.target.value)} />
            <Button className="icon-email-newpassword">@</Button>
          </InputGroup>
          <div className="d-flex justify-content-between mt-3">
            <div>
              <div className="mb-4">
                <input type="checkbox" value="" id="flexCheckDefault" />
                <label for="flexCheckDefault">Ingat Saya</label>
              </div>
            </div>
            <div>
              Lupa Kata
              <span>
                {' '}
                <Link to="/resetpassword" style={{ textDecoration: 'none', color: 'red' }}>
                  Sandi?
                </Link>
              </span>{' '}
            </div>
          </div>
          <div className="mb-3">
            <button type="button" className="btn btn-danger w-100" disabled={disable ? true : false} onClick={onSubmit}>
              Masuk
            </button>
          </div>
          <br />
          <Divider>Atau masuk dengan</Divider>
          <br />
          <div className="mb-5  ">
            <button className=" btn btn-outline-danger w-100" disabled={disable ? true : false}>
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



export default  Login