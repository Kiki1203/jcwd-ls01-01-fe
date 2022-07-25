import React, { useState, useRef, useEffect } from 'react';
import './ChangePassword.css';
import ChangePasswords from '../../../Assets/ChangePassword.svg';
import SidebarProfile from '../../../Components/User/SidebarProfile/SidebarProfile.jsx';
import axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import Swal from 'sweetalert2';
import PulseLoader from 'react-spinners/PulseLoader';
import { InputGroup, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { faAngleLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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

  const [verified, setVerified] = useState('')
  const [tokenUser, setTokenUser] = useState("");
  useEffect(() => {
 
    let tokens = localStorage.getItem('myTkn')
    const headers = {
        headers: { 
            'Authorization': `${tokens}`,
        }
    }
    axios.get(`${API_URL}/user/checkuserverify`, headers)
    .then((res) => {
     
        setVerified(res.data.verified)
        setTokenUser(res.data.token)
    }).catch((err) => {
        console.log('ini err get',err)
       
    })
  }, [tokenUser, verified])


  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const input1 = useRef(null);
  const [inVisible, setInVisible] = useState({
    type: 'password',
    title: 'Show',
  });
  const [inVisible1, setInVisible1] = useState({
    type: 'password',
    title: 'Show',
  });
  const [inVisible2, setInVisible2] = useState({
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
  const handleVisible1 = () => {
    if (inVisible1.type === 'password') {
      setInVisible1({
        type: 'text',
        title: 'Hide',
      });
    } else {
      setInVisible1({
        type: 'password',
        title: 'Show',
      });
    }
  };
  const handleVisible2 = () => {
    if (inVisible2.type === 'password') {
      setInVisible2({
        type: 'text',
        title: 'Hide',
      });
    } else {
      setInVisible2({
        type: 'password',
        title: 'Show',
      });
    }
  };

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
        setLoading(false);
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

  const changePassword = () => {
    return (
      <div>
        <div className="container-cp">
          <div>
            <div className="wrapper-cp">
              <div className="c-cp d-flex">
                <div className="col-lg-3 col-md-2 d-lg-block d-md-block d-none sidebar-cp-1">
                  <SidebarProfile />
                </div>
                <div className="col-lg-1 col-none d-lg-block d-md-none d-none"></div>
                <div className="col-lg-8 col-md-9 col-12 sidebar-cp">
                  <div className="d-lg-none d-md-none d-block d-flex mt-4">
                    <div>
                      <Link to="/" style={{ textDecoration: 'none', color: 'black', cursor: 'pointer', fontSize: '12px', marginTop: '30px', marginLeft: '10px' }}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                      </Link>
                    </div>
                    <div className="mx-4 keterangan-verifikasi-desk">Change Password</div>
                  </div>
                  <div className="d-lg-block d-md-block d-none">
                    <div className="mx-4 mt-4 keterangan-verifikasi-desk">Akun Terverifikasi</div>
                  </div>
                  <div className=" mt-4 d-lg-block d-md-block d-none">
                    <div className="d-flex ">
                      <div className="tab-profile" onClick={() => navigate('/profile')}>
                        Profile
                      </div>
                      <div className="tab-profile" onClick={() => navigate('/editprofile')}>
                        Edit Profile
                      </div>
                      <div className="tab-profile" onClick={() => navigate('/changepassword')}>
                        Change Password
                      </div>
                    </div>
                  </div>
                  <div className="d-lg-block d-md-block d-none">
                    <hr style={{ marginTop: '0px' }} />
                  </div>
                  <div className="box-c-1">
                    <div className="foto-change-password">
                      <img src={ChangePasswords} alt="" />
                    </div>
                    <div className="box-c-2">
                      <div className="baris-change-password-1">
                        <div className="mb-2">Old Password</div>
                        <InputGroup className="mb-4">
                          <Input type={inVisible.type} ref={input1} onChange={oldPasswordChange} />
                          {inVisible.title === 'Show' ? (
                            <Button className="icon-email-newpassword btn-light" onClick={handleVisible}>
                              <FontAwesomeIcon icon={faEye} />
                            </Button>
                          ) : (
                            <Button className="icon-email-newpassword btn-light" onClick={handleVisible}>
                              <FontAwesomeIcon icon={faEyeSlash} />
                            </Button>
                          )}
                        </InputGroup>
                      </div>
                      <div className="form-group baris-change-password-2">
                        <div className="mb-2">New Password</div>
                        <InputGroup className="mb-4">
                          <Input type={inVisible1.type} onChange={newPasswordChange} />
                          {inVisible1.title === 'Show' ? (
                            <Button className="icon-email-newpassword btn-light" onClick={handleVisible1}>
                              <FontAwesomeIcon icon={faEye} />
                            </Button>
                          ) : (
                            <Button className="icon-email-newpassword btn-light" onClick={handleVisible1}>
                              <FontAwesomeIcon icon={faEyeSlash} />
                            </Button>
                          )}
                        </InputGroup>
                      </div>
                      <div className="form-group baris-change-password-3">
                        <div className="mb-2">Repeat New Password</div>
                        <InputGroup className="mb-5">
                          <Input type={inVisible2.type} value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} />
                          {inVisible2.title === 'Show' ? (
                            <Button className="icon-email-newpassword btn-light" onClick={handleVisible2}>
                              <FontAwesomeIcon icon={faEye} />
                            </Button>
                          ) : (
                            <Button className="icon-email-newpassword btn-light" onClick={handleVisible2}>
                              <FontAwesomeIcon icon={faEyeSlash} />
                            </Button>
                          )}
                        </InputGroup>
                      </div>
                      {loading ? (
                        <button type="button" disabled className="btn btn-danger mt-5  button-simpan-change-password">
                          <PulseLoader color={'#FFFFFF'} loading={loading} cssOverride={{ display: 'block', margin: '0 auto', borderColor: 'white' }} size={10} margin={5} />
                        </button>
                      ) : (
                        <button type="button" className="btn btn-danger mt-5  button-simpan-change-password" onClick={() => onSubmit()}>
                          Simpan{' '}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if(localStorage.getItem('myTkn')){
  if(verified === 0){
    return(
      <Navigate to='/verification' />
    )
  }else{
    return(
      <>{changePassword()}</>
    )
  }
}else{
  if(localStorage.getItem('token') === tokenUser){
    if(verified === 0){
      return(
        <Navigate to='/verification' />
      )
    }else{
      return(
        <>{changePassword()}</>
      )  
    }
  }else{
    return(
      <Navigate to='/' />
    ) 
  }
}

};

export default ChangePassword;
