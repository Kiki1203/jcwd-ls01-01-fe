// import React, { useState } from 'react';
// import './ChangePassword.css';
// import TemplateProfile from '../../../Components/User/TemplateProfile/TemplateProfile.jsx';
// import SidebarProfile2 from '../../../Components/User/SidebarProfile/SidebarProfile2.jsx';
// import ChangePasswords from '../../../Assets/ChangePassword.svg';
// import axios from 'axios';
// import API_URL from '../../../Helpers/API_URL.js';
// import Swal from 'sweetalert2';
// import { useSelector, useDispatch } from 'react-redux';

// const ChangePassword = () => {
//   const [oldPasswordErrorMsg, setOldPasswordErrorMsg] = React.useState('');
//   const [oldPassword, setOldPassword] = React.useState('');
//   const [newPasswordErrorMsg, setNewPasswordErrorMsg] = React.useState('');
//   const [newPassword, setNewPassword] = React.useState('');
//   const [repeatNewPasswordErrorMsg, setRepeatNewPasswordErrorMsg] = React.useState('');
//   const [repeatNewPassword, setRepeatNewPassword] = React.useState('');
//   const [isSubmitting, setIsSubmitting] = React.useState(false);

//   const { id } = useSelector((state) => state.userReducer);
//   const token = localStorage.getItem('myTkn');

//   const oldPasswordChange = (event) => {
//     let oldPassword = event.target.value;
//     setOldPassword(oldPassword);
//     axios
//       .post(API_URL + '/user/getoldpassword', { password: oldPassword, id: id })
//       .then(() => {
//         setOldPasswordErrorMsg('');
//       })
//       .catch((e) => {
//         setOldPasswordErrorMsg(e.response.data.message);
//       });
//     if (!oldPassword) {
//       setOldPasswordErrorMsg('');
//     }
//   };

//   const newPasswordChange = (event) => {
//     let newPassword = event.target.value;
//     setNewPassword(newPassword);
//     if (!newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) {
//       setNewPasswordErrorMsg('Your new password is too weak');
//     } else if (!newPassword) {
//       setNewPasswordErrorMsg('');
//     } else {
//       setNewPasswordErrorMsg('');
//     }
//   };

//   const repeatNewPasswordChange = (event) => {
//     let repeatPassword = event.target.value;
//     setRepeatNewPassword(repeatPassword);
//     if (!(repeatPassword === newPassword)) {
//       setRepeatNewPasswordErrorMsg(`Passwords don't match`);
//     } else if (!repeatPassword) {
//       setRepeatNewPasswordErrorMsg('');
//     } else {
//       setRepeatNewPasswordErrorMsg('');
//     }
//   };

//   const onSubmit = () => {
//     setIsSubmitting(true);
//     axios
//       .post(
//         API_URL + '/user/changepassword',
//         { id: id, newPassword: newPassword },
//         {
//           headers: {
//             authorization: token,
//           },
//         }
//       )
//       .then(() => {
//         Swal.fire({
//           title: 'Success!',
//           text: 'Your password has been changed.',
//           icon: 'success',
//           confirmButtonText: 'Okay!',
//           confirmButtonColor: '#369a7c',
//         });
//         setIsSubmitting(false);
//       })
//       .catch(() => {
//         Swal.fire({
//           title: 'Oops!',
//           text: 'Something went wrong :(',
//           icon: 'error',
//           confirmButtonText: 'Okay...',
//           confirmButtonColor: '#f0547b',
//         });
//         setIsSubmitting(false);
//       });
//   };

//   return (
//     <div className="container">
//       <TemplateProfile />
//       <SidebarProfile2 />
//       <div className="foto-change-password">
//         <img src={ChangePasswords} alt="" />
//       </div>
//       <div className="baris-change-password-1">
//         <input type="text" className="form-control input-change-password-1" placeholder="Old Password" onChange={oldPasswordChange} />
//       </div>
//       <div className="form-group baris-change-password-2">
//         <input type="text" className="form-control input-change-password-2" placeholder="New Password" onChange={newPasswordChange} />
//       </div>
//       <div className="form-group baris-change-password-3">
//         <input type="text" className="form-control input-change-password-3" placeholder="Confirmation Password" onChange={repeatNewPasswordChange} />
//       </div>
//       <button type="submit" className="button-batalkan-change-password">
//         Batalkan
//       </button>
//       <button
//         type="submit"
//         className="button-simpan-change-password"
//         onClick={() => {
//           onSubmit();
//           setOldPassword('');
//           setNewPassword('');
//           setRepeatNewPassword('');
//         }}
//         disabled={oldPasswordErrorMsg || newPasswordErrorMsg || repeatNewPasswordErrorMsg || !(oldPassword && newPassword && repeatNewPassword) || isSubmitting}
//       >
//         Simpan
//       </button>
//     </div>
//   );
// };

// export default ChangePassword;
