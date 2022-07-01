import React, { useState, CSSProperties } from 'react';
import './ChangePassword.css';
import TemplateProfile from '../../../Components/User/TemplateProfile/TemplateProfile.jsx';
import SidebarProfile2 from '../../../Components/User/SidebarProfile/SidebarProfile2.jsx';
import ChangePasswords from '../../../Assets/ChangePassword.svg';
import axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import Swal from 'sweetalert2';
import BeatLoader from 'react-spinners/BeatLoader';
import { InputGroup, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'black',
};

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
  });

  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [passwordConf, setPasswordConf] = useState('');

  let oldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  let newPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const onSubmit = () => {
    const token = localStorage.getItem('myTkn');
    var data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    var data2 = passwordConf;

    if (!oldPassword || !newPassword || !data2) {
      return Toast.fire({ html: 'Fill All Data!', icon: 'error', title: 'ERROR!' });
    }
    if (newPassword !== data2) {
      return Toast.fire({ html: 'Password and Repeat Password doesnt match!', icon: 'error', title: 'ERROR!' });
    }
    setLoading(true);
    axios
      .post(API_URL + '/user/changepassword', data, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setLoading(true);
        Toast.fire({
          title: 'Success!',
          text: res.data.message,
          icon: 'success',
          confirmButtonText: 'Okay!',
          timer: 1500,
        });
        setLoading(true);
        navigate('/');
        console.log('ini res', res);
        console.log('ini res.data', res.data);
        console.log('ini res.data', res.data.message);
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
        console.log('ini err', err);
        console.log('err.response.data.message', err.response.data.message);
      });
  };

  return (
    <div className="container">
      <TemplateProfile />
      <SidebarProfile2 />
      <div className="foto-change-password">
        <img src={ChangePasswords} alt="" />
      </div>
      <div className="baris-change-password-1">
        <div>Old Password</div>
        <InputGroup className="mb-3">
          <Input type="text" onChange={oldPasswordChange} />
          <Button className="icon-email-newpassword">@</Button>
        </InputGroup>
      </div>
      <div className="form-group baris-change-password-2">
        <div>New Password</div>
        <InputGroup className="mb-3">
          <Input type="text" onChange={newPasswordChange} />
          <Button className="icon-email-newpassword">@</Button>
        </InputGroup>
      </div>
      <div className="form-group baris-change-password-3">
        <div>Repeat New Password</div>
        <InputGroup className="mb-5">
          <Input type="text" value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} />
          <Button className="icon-email-newpassword">@</Button>
        </InputGroup>
      </div>
      <button type="submit" className=" btn btn-outline-danger button-batalkan-change-password" onClick={() => navigate('/')}>
        Batal
      </button>
      {loading ? (
        <button disable type="submit" className=" btn btn-secondary button-simpan-change-password">
          <BeatLoader color={'#000'} loading={loading} cssOverride={override} size={15} />
        </button>
      ) : (
        <button type="submit" className=" btn btn-danger button-simpan-change-password" onClick={() => onSubmit()}>
          Simpan{' '}
        </button>
      )}
    </div>
  );
};

export default ChangePassword;
