import { React, useState } from 'react';
import Axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import Divider from '@mui/material/Divider';
import './Register.css';
import gambar from './../../../Assets/login.svg';
import logo from './../../../Assets/logo.svg';
import Swal from 'sweetalert2';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
  });

  const onSubmit = () => {
    try {
      var data = { username: username, password: password, email: email };
      var data2 = passwordConf;

      if (!username || !email || !password || !data2) {
        return Toast.fire({ html: 'Fill All Data!', icon: 'error', title: 'ERROR!' });
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        return Toast.fire({ html: 'Email address is invalid', icon: 'error', title: 'ERROR!' });
      }
      if (password.length < 8) {
        return Toast.fire({ html: 'Password weak, please add more characters', icon: 'error', title: 'ERROR!' });
      }
      if (!password.match('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])')) {
        return Toast.fire({ html: 'Password should be contain uppercase, number, and symbol', icon: 'error', title: 'ERROR!' });
      }
      if (password !== data2) {
        return Toast.fire({ html: 'Password and Repeat Password doesnt match!', icon: 'error', title: 'ERROR!' });
      }

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
          <div className="header-form-register mb-4">Mari Kita Mulai</div>
          <div className="akun-form-register mb-4">
            Sudah punya akun? <span href="">Masuk</span>
          </div>
          <div className="row justify-content-evenly">
            <button className="col-5 bg">Daftar dengan Google</button>
            <button className="col-5 bf">Daftar dengan Facebook</button>
          </div>
          <br />
          <Divider>atau</Divider>
          <br />
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
          <div className="form-check mt-4 mb-4">
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
