import { React, useState } from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import PulseLoader from 'react-spinners/PulseLoader';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [loading, setLoading] = useState(false);
  const [inVisible, setInVisible] = useState({
    type: 'password',
    title: 'Show',
  });
  const [inVisibleR, setInVisibleR] = useState({
    type: 'password',
    title: 'Show',
  });

  const handleVisible = () => {
    if (inVisible.type === 'password') {
      setInVisible({
        type: 'text',
        title: 'Hide',
      });
    } else {
      setInVisible({
        type: 'password',
        title: 'Show',
      });
    }
  };
  const handleVisibleR = () => {
    if (inVisibleR.type === 'password') {
      setInVisibleR({
        type: 'text',
        title: 'Hide',
      });
    } else {
      setInVisibleR({
        type: 'password',
        title: 'Show',
      });
    }
  };

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
          Swal.fire({
            title: 'Success!',
            text: res.data.message,
            icon: 'success',
            confirmButtonText: 'Okay!',
          });
          setUsername('');
          setEmail('');
          setPassword('');
          setPasswordConf('');
          navigate('/login');
        })
        .catch((err) => {
          setLoading(false);
          Swal.fire({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'Okay!',
          });
        });
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Okay!',
      });
    } finally {
      onSubmit.setSubmitting(false);
    }
  };

  if (localStorage.getItem('token')) {
    return <Navigate to="/homeadmin" />;
  }

  if (localStorage.getItem('myTkn')) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container-fluid register-container ">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 image-register">
          <img src={gambar} alt="" />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 box-form-register">
          <div className="form-register">
            <div className="mb-2 mt-4 mkm">Mari Kita Mulai</div>
            <div className="mb-3 spa">
              Sudah punya akun?{' '}
              <Link to="/login" style={{ textDecoration: 'none', color: 'red' }}>
                Masuk
              </Link>
            </div>
            <div className="row justify-content-evenly ">
              <button type="button" className="col-5 btn btn-light login-other ">
                <img className="me-2" src={google} alt="" />
                Google
              </button>
              <button className="col-5 btn btn-primary  login-other">
                <img className="me-2" src={fb} alt="" />
                Facebook
              </button>
            </div>
            <br />
            <div style={{ marginTop: '-10px' }}>
              <Divider>
                <span className="spa"> atau</span>
              </Divider>
            </div>
            <br />
            <div style={{ marginTop: '-20px' }}>
              <label for="exampleFormControlInput1" className="form-label">
                Name
              </label>
              <InputGroup className="mb-2">
                <InputGroupText className="icon-email-resetpassword">
                  <img src={pLogin} alt="" />
                </InputGroupText>
                <Input placeholder="" value={username} onChange={(e) => setUsername(e.target.value)} />
              </InputGroup>
              <label for="exampleFormControlInput1" className="form-label">
                Email Address
              </label>
              <InputGroup className="mb-2">
                <InputGroupText className="icon-email-resetpassword">
                  <img src={mLogin} alt="" />
                </InputGroupText>
                <Input placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </InputGroup>
              <label for="exampleFormControlInput1" className="form-label">
                Password
              </label>
              <InputGroup className="mb-2">
                <InputGroupText className="icon-email-resetpassword">
                  <img src={passLogin} alt="" />
                </InputGroupText>
                <Input placeholder="" type={inVisible.type} value={password} onChange={(e) => setPassword(e.target.value)} />
                {inVisible.title === 'Show' ? (
                  <Button className="icon-email-newpassword" onClick={handleVisible}>
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                ) : (
                  <Button className="icon-email-newpassword" onClick={handleVisible}>
                    <FontAwesomeIcon icon={faEyeSlash} />
                  </Button>
                )}
              </InputGroup>
              <label for="exampleFormControlInput1" className="form-label">
                Repeat Password
              </label>
              <InputGroup>
                <InputGroupText className="icon-email-resetpassword">
                  <img src={passLogin} alt="" />
                </InputGroupText>
                <Input placeholder="" type={inVisibleR.type} value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} />
                {inVisibleR.title === 'Show' ? (
                  <Button className="icon-email-newpassword" onClick={handleVisibleR}>
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                ) : (
                  <Button className="icon-email-newpassword" onClick={handleVisibleR}>
                    <FontAwesomeIcon icon={faEyeSlash} />
                  </Button>
                )}
              </InputGroup>
            </div>
            <div className="mt-3 spa">
              <input type="checkbox" value="" id="flexCheckDefault" />
              <label for="flexCheckDefault">
                Setuju dengan{' '}
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
            <div className="mt-5">
              {loading ? (
                <button type="button" disabled className="btn btn-danger w-100 button-au ">
                  <PulseLoader color={'#FFFFFF'} loading={loading} cssOverride={{ borderColor: 'white', margin: '0 auto' }} size={10} />
                </button>
              ) : (
                <button type="button" className="btn btn-danger w-100 button-au " onClick={() => onSubmit()}>
                  {' '}
                  Register
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
