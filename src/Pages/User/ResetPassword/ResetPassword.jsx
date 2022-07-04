import React from 'react';
import './ResetPassword.css';
import { InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import Swal from 'sweetalert2';

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
      <div className="container-register">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6">
            <img src={gambar} alt="" />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 form-resetpassword">
            <div className="mb-5">Forgot Password</div>
            <div>Email</div>
            <InputGroup className=" col-12 col-sm-12 col-12 mb-5">
              <InputGroupText className="icon-email-resetpassword">
                <img src={mLogin} alt="" />
              </InputGroupText>
              <Input placeholder="name@example.com" onChange={emailChange} />
            </InputGroup>
            <Button className="col-12 col-sm-12 col-12 mb-4" color="danger" onClick={() => onSubmit()}>
              Send
            </Button>
            <Button className="col-12 col-sm-12 col-12" color="danger" outline>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
