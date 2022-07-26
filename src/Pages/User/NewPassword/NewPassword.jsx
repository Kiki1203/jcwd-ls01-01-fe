import React, { useState } from 'react';
import './NewPassword.css';
import { InputGroup, Input, Button } from 'reactstrap';
import axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import Swal from 'sweetalert2';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import gambar from './../../../Assets/login.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import PulseLoader from 'react-spinners/PulseLoader';

const NewPassword = () => {
  let params = useParams();
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
  });
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const navigate = useNavigate();
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

  let passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = () => {
    var data = {
      password: password,
    };
    var data2 = passwordConf;

    if (!password || !data2) {
      return Toast.fire({ html: 'Fill All Data!', icon: 'error', title: 'ERROR!' });
    }
    if (!password.match('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])')) {
      return Toast.fire({ html: 'Password should be contain uppercase, number, and symbol', icon: 'error', title: 'ERROR!' });
    }
    if (password !== data2) {
      return Toast.fire({ html: 'Password and Repeat Password doesnt match!', icon: 'error', title: 'ERROR!' });
    }
    setLoading(true);
    axios
      .patch(API_URL + '/user/resetpassword', data, {
        headers: {
          Authorization: params.token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setLoading(true);
        navigate('/login');
        Swal.fire({
          title: 'Success!',
          text: res.data.message,
          icon: 'success',
          confirmButtonText: 'Okay!',
        });

        setLoading(false);
        console.log('ini res', res);
        console.log('ini res.data', res.data);
        console.log('ini res.data', res.data.message);
      })
      .catch((err) => {
        setLoading(true);
        Swal.fire({
          title: 'Error!',
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'Okay!',
        });

        setLoading(false);
        console.log('ini err', err);
        console.log('err.response.data.message', err.response.data.message);
      });
  };

  if(localStorage.getItem('myTkn') || localStorage.getItem('token')){
    return <Navigate to="/" />;
  }
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 image-register">
            <img src={gambar} alt="" />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 box-form-register">
            <div className="form-newpassword">
              <div className="mb-5 mkm">Password Baru</div>
              <div>New Password</div>
              <InputGroup className="mb-3">
                <Input placeholder="" type={inVisible.type} value={password} onChange={passwordChange} />
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
              <div>Repeat New Password</div>
              <InputGroup className="mb-5">
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
              {loading ? (
                <button type="button" disabled className=" mb-4 btn btn-danger w-100 button-au ">
                  <PulseLoader color={'#FFFFFF'} loading={loading} cssOverride={{ borderColor: 'white', margin: '0 auto' }} size={10} />
                </button>
              ) : (
                <Button className="col-12 col-sm-12 col-12 mb-4 button-au" color="danger" onClick={() => onSubmit()}>
                  Send
                </Button>
              )}
              <Button className="col-12 col-sm-12 col-12 button-au" color="danger" outline onClick={() => navigate('/resetpassword')}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
