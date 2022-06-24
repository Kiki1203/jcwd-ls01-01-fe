import { React, useState } from 'react';
import Axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';

import Divider from '@mui/material/Divider';
import './Register.css';
import gambar from './../../../Assets/login.svg';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
});

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const onSubmit = () => {
    try {
      var data = { username: username, password: password, email: email };
      // var data2 = passwordConf;

      // Validation
      // if (username === '' || email === '' || password === '' || data2 === '') throw { message: 'Fill All Data!' };
      // if (!/\S+@\S+\.\S+/.test(email)) throw { message: 'Email address is invalid' };
      // if (!username.match('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{4,}')) throw { message: 'Username should be contain uppercase, number, and symbol' };
      // if (!password.match('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])')) throw { message: 'Password should be contain uppercase, number, and symbol' };
      // if (password.length < 8) throw { message: 'Password weak, please add more characters' };
      // if (password !== data2) throw { message: 'Password and Confirmation Password doesnt match!' };

      Axios.post(`${API_URL}/user/register`, data)
        .then((res) => {
          Toast.fire({
            title: 'Success!',
            text: res.data.message,
            icon: 'success',
            confirmButtonText: 'Okay!',
            timer: 1500,
          });
          setUsername('');
          setEmail('');
          setPassword('');
          setPasswordConf('');
        })
        .catch((err) => {
          Toast.fire({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'Okay!',
            timer: 1500,
          });
        });
    } catch (error) {
      Toast.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Okay!',
        timer: 1500,
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6  formGambar">
          <div className="registerlogo">Apotakecare</div>
          <div className="registerslogan">Apotek Online Khusus Untuk Keperluanmu</div>
          <img className="gambar" src={gambar} alt="" />
        </div>
        <div className="col-6 form">
          <div className="header-form-register">Mari Kita Mulai</div>
          <div className="akun-form-register">
            Sudah punya akun? <span href="">Masuk</span>
          </div>
          <div className="row">
            <button className="col-6">Daftar dengan Google</button>
            <button className="col-6">Daftar dengan Facebook</button>
          </div>
          <Divider>atau</Divider>
          <div class="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Name
            </label>
            <input type="username" className="form-control" id="exampleFormControlInput1" placeholder="Input Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Email Address
            </label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Input Password " value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Repeat Password
            </label>
            <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Input Password Again" value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} />
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label className="form-check-label" for="flexCheckDefault">
              Saya setuju dengan persyaratan dan ketentuan
            </label>
          </div>
          <div classNameName="mb-3">
            <button type="button" className="btn btn-danger col-12 " onClick={() => onSubmit()}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
