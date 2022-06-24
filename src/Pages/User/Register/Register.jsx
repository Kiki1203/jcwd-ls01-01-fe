import React from 'react';
import Divider from '@mui/material/Divider';
import './Register.css';
import gambar from './../../../Assets/login.svg';

const Register = () => {
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
            <input type="username" className="form-control" id="exampleFormControlInput1" placeholder="Input Username" />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Email Address
            </label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Input Password" />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Reapet Password
            </label>
            <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Input Password Again" />
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label className="form-check-label" for="flexCheckDefault">
              Saya setuju dengan persyaratan dan ketentuan
            </label>
          </div>
          <div classNameName="mb-3">
            <button type="button" className="btn btn-danger col-12">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
