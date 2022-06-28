import React, { useEffect, useState } from 'react'
import './LoginAdmin.css';
import { useParams, Navigate } from 'react-router-dom'
import Frame from '../../../Assets/Frame.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';

const LoginAdmin = () => {

  const [usernameOrEmail, setusernameOrEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [inVisible, setInVisible] = React.useState({
      type: "password",
      title: "Show"
  });

  const handleLogin = () => {
    let data = {
      usernameOrEmail: usernameOrEmail,
      password: password
  }
   
  axios.post(`${API_URL}/admin/loginadmin`, data)
      .then((res) => {
          console.log(res.data);
      }).catch((err) => {
          console.log(err)
      })
}

const handleVisible = () => {
  if (inVisible.type == "password") {
      setInVisible({
          type: "text",
          title: "Hide"
      })
  } else {
      setInVisible({
          type: "password",
          title: "Show"
      })
  }
}

  return (
   <div className='container'>
    <div className='box-foto-login-admin'><img src={Frame} alt="" className='AdminImgSet'/></div>
    <div className='box-isi-login-admin'>
      <div className='tab-button-admin-login'>
        <Link to="/login" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
          <div className='tab-1-admin-login'>USER</div>
        </Link>
        <Link to="/loginadmin" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
          <div className='tab-2-admin-login'>ADMIN</div>
        </Link>
      </div>
      <div className='box-login-admin-isi'>
          <div className='welcome-login-admin'>Welcome to Apotakecare's Admin</div>
          <div className='box-email-login-admin'>
            <div className='label-email-or-username-login-admin'>Email or Username</div>
            <div className="form-group">
                <input type="text" onChange={(e) => setusernameOrEmail(e.target.value)} className="form-control input-login-admin-1"  placeholder="Masukkan Email Atau Username" />
            </div>
          </div>
          <div className='box-password-login-admin'>
          <div className='label-email-or-username-login-admin'>Password</div>
            <div className="form-group">
                <input type="text" onChange={(e) => setPassword(e.target.value)} className="form-control input-login-admin-1"  placeholder="Masukkan Password" />
            </div>
          </div>
          <div className="form-group form-ingat-saya">
            <input type="checkbox" className="form-check-input mx-2" id="exampleCheck-1" style={{fontSize: '14px'}}/>
            <label className="form-check-label" for="exampleCheck1" id="keterangan-check-2">Ingat Saya</label>
          </div>
          <div className='lupa-kata-sandi-admin'>Lupa Kata Sandi</div>
          <button className='button-masuk-admin'  onClick={handleLogin}>Masuk</button>
          <div className='garis-1-login-admin'></div>
          <div className='atau-masuk-admin-login'>Atau Masuk Dengan</div>
          <div className='garis-2-login-admin'></div>
          <button className='login-with-google-admin'>Masuk dengan Google</button>
      </div>
    </div>
   </div>
  );
};

export default LoginAdmin;