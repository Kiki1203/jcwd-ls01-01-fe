import { React, useState, CSSProperties } from 'react';
import Axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import Divider from '@mui/material/Divider';
import './Register.css';
import gambar from './../../../Assets/login.svg';
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
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6">
          <img src={gambar} alt="" />
        </div>
        <div className="col-6 col-xs-12 col-sm-12 col-md-6 form-register">
          <div className="mb-4">Mari Kita Mulai</div>
          <div className="mb-4">
            Sudah punya akun?{' '}
            <Link to="/login" style={{ textDecoration: 'none', color: 'red' }}>
              Masuk
            </Link>
          </div>
          <div className="row justify-content-around">
            <button type="button" className="col-5 bg btn btn-light  login-other">
              <img className="me-2" src={google} alt="" /> Daftar dengan Google
            </button>
            <button className="col-5 bf btn btn-primary  login-other">
              <img className="me-2" src={fb} alt="" />
              Daftar dengan Facebook
            </button>
          </div>
          <br />
          <div>
            <Divider>
              <span> atau</span>
            </Divider>
          </div>
          <br />
          <div>
            <label for="exampleFormControlInput1" className="form-label">
              Name
            </label>
            <InputGroup className=" col-12 col-sm-12 col-12 mb-3">
              <InputGroupText className="icon-email-resetpassword">
                <img src={pLogin} alt="" />
              </InputGroupText>
              <Input placeholder="" value={username} onChange={(e) => setUsername(e.target.value)} />
            </InputGroup>
            <label for="exampleFormControlInput1" className="form-label">
              Email Address
            </label>
            <InputGroup className=" col-12 col-sm-12 col-12 mb-3">
              <InputGroupText className="icon-email-resetpassword">
                <img src={mLogin} alt="" />
              </InputGroupText>
              <Input placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </InputGroup>
            <label for="exampleFormControlInput1" className="form-label">
              Password
            </label>
            <InputGroup className=" col-12 col-sm-12 col-12 mb-3">
              <InputGroupText className="icon-email-resetpassword">
                <img src={passLogin} alt="" />
              </InputGroupText>
              <Input placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button className="icon-email-newpassword">@</Button>
            </InputGroup>
            <label for="exampleFormControlInput1" className="form-label">
              Repeat Password
            </label>
            <InputGroup className=" col-12 col-sm-12 col-12 mb-3">
              <InputGroupText className="icon-email-resetpassword">
                <img src={passLogin} alt="" />
              </InputGroupText>
              <Input placeholder="" value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} />
              <Button className="icon-email-newpassword">@</Button>
            </InputGroup>
          </div>
          <div className="mt-4 mb-4 ">
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
          <div classNameName="mb-3">
            {loading ? (
              <button type="button" className="btn btn-secondary col-12 ">
                <BeatLoader color={'#000'} loading={loading} cssOverride={override} size={15} />
              </button>
            ) : (
              <button type="button" className="btn btn-danger col-12 " onClick={() => onSubmit()}>
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
