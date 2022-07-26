import React from 'react';
import './ResetPassword.css';
import { InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import Swal from 'sweetalert2';
import { useNavigate, Navigate } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';

import gambar from './../../../Assets/login.svg';
import mLogin from './../../../Assets/mLogin.svg';

const ResetPassword = () => {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  let emailChange = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = () => {
    var data = {
      email: email,
    };
    setLoading(true);
    axios
      .post(API_URL + '/user/resendpassword', data)
      .then((res) => {
        setLoading(true);
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
              <div className="mb-5 mkm">Lupa Password</div>
              <div className="">Email</div>
              <InputGroup className="mb-5">
                <InputGroupText className="icon-email-resetpassword">
                  <img src={mLogin} alt="" />
                </InputGroupText>
                <Input placeholder="name@example.com" onChange={emailChange} />
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
              <Button className="w-100 button-au" color="danger" outline onClick={() => navigate('/login')}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
