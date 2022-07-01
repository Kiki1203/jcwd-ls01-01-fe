import React, { useState } from 'react';
import './NewPassword.css';
import { InputGroup, Input, Button } from 'reactstrap';
import axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import gambar from './../../../Assets/login.svg';
import BeatLoader from 'react-spinners/BeatLoader';
const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'black',
};

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
        setLoading(false);
        console.log('ini err', err);
        console.log('err.response.data.message', err.response.data.message);
      });
  };
  return (
    <div>
      <div className="container-register">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 gambar-newpassword">
            <img src={gambar} alt="" />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 form-newpassword">
            <div className="mb-5">Forgot Password</div>
            <div>New Password</div>
            <InputGroup className="mb-3">
              <Input onChange={passwordChange} />
              <Button className="icon-email-newpassword">@</Button>
            </InputGroup>
            <div>Repeat New Password</div>
            <InputGroup className="mb-5">
              <Input value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} />
              <Button className="icon-email-newpassword">@</Button>
            </InputGroup>
            {loading ? (
              <button type="button" className="btn btn-secondary col-12 col-sm-12 col-12 mb-4 ">
                <BeatLoader color={'#000'} loading={loading} cssOverride={override} size={15} />
              </button>
            ) : (
              <Button className="col-12 col-sm-12 col-12 mb-4" color="danger" onClick={() => onSubmit()}>
                Send
              </Button>
            )}
            <Button className="col-12 col-sm-12 col-12" color="danger" outline>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
