import { React, useState, CSSProperties } from 'react';
import Axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import Divider from '@mui/material/Divider';
import './Register.css';
import gambar from './../../../Assets/Frame.svg';
import google from './../../../Assets/googleL.svg';
import fb from './../../../Assets/fbL.svg';
import pLogin from './../../../Assets/pLogin.svg';
import mLogin from './../../../Assets/mLogin.svg';
import passLogin from './../../../Assets/passLogin.svg';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import BeatLoader from 'react-spinners/BeatLoader';
const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'black',
};

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      Axios.post(`${API_URL}/user/register`, data)
        .then((res) => {
          setLoading(true);
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
          navigate('/login');
        })
        .catch((err) => {
          setLoading(false);
          Toast.fire({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'Okay!',
            timer: 1500,
          });
        });
    } catch (error) {
      setLoading(false);
      Toast.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Okay!',
        timer: 1500,
      });
    } finally {
      onSubmit.setSubmitting(false);
    }
  };

  return (
    <div className="container-register ">
      <div className="d-flex">
        <div className="box-image-register">
          <img src={gambar} alt="" className="image-register" />
        </div>
        <div className=" form-register">
          <div className="mb-2 mt-4">Mari Kita Mulai</div>
          <div className="mb-3">
            Sudah punya akun?{' '}
            <Link to="/login" style={{ textDecoration: 'none', color: 'red' }}>
              Masuk
            </Link>
          </div>
          <div className="d-flex">
            <button type="button" className=" bg btn btn-light w-100 mx-3 login-other">
              <img className="me-2" src={google} alt="" /> Daftar dengan Google
            </button>
            <button className="bf btn btn-primary w-100 login-other">
              <img className="me-2" src={fb} alt="" />
              Daftar dengan Facebook
            </button>
          </div>
          <br />
          <div style={{marginTop: '-10px'}}>
            <Divider>
              <span> atau</span>
            </Divider>
          </div>
          <br />
          <div style={{marginTop: '-20px'}}>
            <label for="exampleFormControlInput1" className="form-label">
              Name
            </label>
            <InputGroup>
              <InputGroupText className="icon-email-resetpassword">
                <img src={pLogin} alt="" />
              </InputGroupText>
              <Input placeholder="" value={username} onChange={(e) => setUsername(e.target.value)} />
            </InputGroup>
            <label for="exampleFormControlInput1" className="form-label">
              Email Address
            </label>
            <InputGroup>
              <InputGroupText className="icon-email-resetpassword">
                <img src={mLogin} alt="" />
              </InputGroupText>
              <Input placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </InputGroup>
            <label for="exampleFormControlInput1" className="form-label">
              Password
            </label>
            <InputGroup>
              <InputGroupText className="icon-email-resetpassword">
                <img src={passLogin} alt="" />
              </InputGroupText>
              <Input placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button className="icon-email-newpassword">@</Button>
            </InputGroup>
            <label for="exampleFormControlInput1" className="form-label">
              Repeat Password
            </label>
            <InputGroup>
              <InputGroupText className="icon-email-resetpassword">
                <img src={passLogin} alt="" />
              </InputGroupText>
              <Input placeholder="" value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} />
              <Button className="icon-email-newpassword">@</Button>
            </InputGroup>
          </div>
          <div className="mt-3 ">
            <input type="checkbox" value="" id="flexCheckDefault" />
            <label for="flexCheckDefault">
              Saya setuju dengan{' '}
              <span>
                <Link to="" style={{ textDecoration: 'none', color: 'red' }}>
                  persyaratan
                </Link>
              </span>
              <span> dan </span>
              <span>
                <Link to="" style={{ textDecoration: 'none', color: 'red' }}>
                  ketentuan
                </Link>
              </span>
            </label>
          </div>
          <div className="mt-3">
            {loading ? (
              <button type="button" className="btn btn-secondary ">
                <BeatLoader color={'#000'} loading={loading} cssOverride={override} size={15} />
              </button>
            ) : (
              <button type="button" className="btn btn-danger w-100 " onClick={() => onSubmit()}>
                {' '}
                Sign up
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
