import React, { useState, CSSProperties } from 'react';
import './ChangePassword.css';
import ChangePasswords from '../../../Assets/ChangePassword.svg';
import SidebarProfile from '../../../Components/User/SidebarProfile/SidebarProfile.jsx';
import axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import Swal from 'sweetalert2';
import BeatLoader from 'react-spinners/BeatLoader';
import { InputGroup, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { faUser, faReceipt, faAngleLeft, faMoneyBills, faLocationDot, faHeart, faEnvelope, faPenToSquare, faAngleRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

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
    <div>
      <div className="container-cp">
        <div>
         <div className="wrapper-cp">
         <div className="c-cp d-flex">
             <div className='col-lg-3 col-md-2 d-lg-block d-md-block d-none sidebar-cp-1'>
                <SidebarProfile/>
             </div>
             <div  className='col-lg-1 col-none d-lg-block d-md-none d-none'>
                 
             </div>
             <div  className='col-lg-8 col-md-9 col-12 sidebar-cp'>
                <div className="d-lg-none d-md-none d-block d-flex mt-4">
                        <div>
                            <Link to='/' style={{ textDecoration:"none", color: "black", cursor: 'pointer', fontSize: "12px", marginTop: "30px", marginLeft:"10px" }}>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </Link>
                        </div>
                        <div className="mx-4 keterangan-verifikasi-desk" >Change Password</div>
                    </div>
                    <div className="d-lg-block d-md-block d-none">
                    <div className="mx-4 mt-4 keterangan-verifikasi-desk">Akun Terverifikasi</div>
                    </div>
                        <div className=" mt-4 d-lg-block d-md-block d-none">
                          <div className="d-flex ">
                          <div className="tab-profile" onClick={() => navigate('/profile')}>Profile</div> 
                            <div className="tab-profile" onClick={() => navigate('/editprofile')}>Edit Profile</div>
                            <div className="tab-profile" onClick={() => navigate('/changepassword')}>Change Password</div>
                          </div>
                        </div>
                  <div  className="d-lg-block d-md-block d-none">
                  <hr style={{marginTop:'0px'}}/>
                  </div>
            <div className="box-c-1">
              <div className="foto-change-password">
            <img src={ChangePasswords} alt="" />
          </div>
              <div className="box-c-2">
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
          {loading ? (
            <button disable type="submit" className=" btn btn-secondary button-simpan-change-password">
              <BeatLoader color={'#000'} loading={loading} cssOverride={override} size={15} />
            </button>
          ) : (
            <button type="submit" className=" btn btn-danger mt-4 button-simpan-change-password" onClick={() => onSubmit()}>
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
};

export default ChangePassword;
