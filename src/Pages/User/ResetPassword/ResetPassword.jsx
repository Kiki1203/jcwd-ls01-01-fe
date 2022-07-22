import React from 'react';
import './ResetPassword.css';
import { InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import gambar from './../../../Assets/login.svg';
import mLogin from './../../../Assets/mLogin.svg';

const ResetPassword = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
  });

  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  let emailChange = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = () => {
    var data = {
      email: email,
    };

    axios
      .post(API_URL + '/user/resendpassword', data)
      .then((res) => {
        Toast.fire({
          title: 'Success!',
          text: res.data.message,
          icon: 'success',
          confirmButtonText: 'Okay!',
          timer: 1500,
        });

        console.log('ini res', res);
        console.log('ini res.data', res.data);
        console.log('ini res.data', res.data.message);
      })
      .catch((err) => {
        Toast.fire({
          title: 'Error!',
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'Okay!',
          timer: 1500,
        });
        console.log('ini err', err);
        console.log('err.response.data.message', err.response.data.message);
      });
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 image-register">
            <img src={gambar} alt="" />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 box-form-register">
            <div className="form-resetpassword">
              <div className="mb-5 mkm">Lupa Password</div>
              <div className="">Email</div>
              <InputGroup className="mb-5">
                <InputGroupText className="icon-email-resetpassword">
                  <img src={mLogin} alt="" />
                </InputGroupText>
                <Input placeholder="name@example.com" onChange={emailChange} />
              </InputGroup>
              <Button className="w-100 mb-4 button-au" color="danger" onClick={() => onSubmit()}>
                Send
              </Button>
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
