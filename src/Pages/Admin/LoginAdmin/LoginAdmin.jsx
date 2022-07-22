import React, { useEffect, useState } from 'react'
import './LoginAdmin.css';
import { Navigate } from 'react-router-dom'
import Frame from '../../../Assets/Frame.svg';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import google from './../../../Assets/googleL.svg';
import API_URL from '../../../Helpers/API_URL.js';

const LoginAdmin = () => {
 
  const [usernameOrEmail, setusernameOrEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError]  = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [inVisible, setInVisible] = React.useState({
      type: "password",
      title: "Show"
  });
  const [tokenAdmin, setTokenAdmin] = useState('')

  const navigate = useNavigate()


  const handleLogin = () =>{
    setLoading(true)
    let data = {
      usernameOrEmail: usernameOrEmail,
      password: password,
    };

    Axios.post(`${API_URL}/admin/loginadmin`, data)
    .then((res) => {
      setLoading(false)
      console.log(res.data)
      localStorage.setItem('token', res.data.token)
      setTokenAdmin(res.data.token)
      if(res.data.token){
        navigate("/homeadmin")
      }
     
    }).catch((err) => {
        console.log('ini err get',err)
        console.log('err.response.data.message', err.response.data.message)
        setError(err.response.data.message)
        setLoading(false)
    })
  };

const handleVisible = () => {
  if (inVisible.type == "password") {
      setInVisible({
          type: "text",
          title: "Hide"
      })
  } else {
      setInVisible({
          type: "password",
          title: "Show"
      })
  }
}

const loginAdmin = () => {
  return (
    <div className='container'>
     <div className='box-foto-login-admin'><img src={Frame} alt="" className='AdminImgSet'/></div>
     <div className='box-isi-login-admin'>
       <div className='tab-button-admin-login'>
         <Link to="/login" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
           <div className='tab-1-admin-login'>USER</div>
         </Link>
         <Link to="/loginadmin" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
           <div className='tab-2-admin-login'>ADMIN</div>
         </Link>
       </div>
       <div className='box-login-admin-isi'>
           <div className='welcome-login-admin'>Welcome to Apotakecare's Admin</div>
           <div className='box-email-login-admin'>
             <div className='label-email-or-username-login-admin'>Email or Username</div>
             <form className="d-flex box-logo-1-admin">
               <FontAwesomeIcon icon={faUser} className="logo-1-admin" />
               <input type="text" onChange={(e) => setusernameOrEmail(e.target.value)} className="form-control input-admin-1"  placeholder="Masukkan Email Atau Username" />
             </form>
             <div className='login-error-message'>
             {
               error  === "Username Tidak Ditemukan" ?
               <>{error}</>
               :
               <><div></div></>
               }  
             </div>
             {/* <div className="form-group">
                 <input type="text" onChange={(e) => setusernameOrEmail(e.target.value)} className="form-control input-login-admin-1"  placeholder="Masukkan Email Atau Username" />
             </div> */}
           </div>
           <div className='box-password-login-admin'>
           <div className='label-email-or-username-login-admin'>Password</div>
           <form className="d-flex box-logo-1-admin">
               <FontAwesomeIcon icon={faLock} className="logo-1-admin" />
               <input type={inVisible.type} onChange={(e) => setPassword(e.target.value)} className="form-control input-admin-1"  placeholder="Masukkan Password" />
               {
                   inVisible.title == "Show" ?
                   <FontAwesomeIcon icon={faEye} onClick={handleVisible}  className='logo-input-group-text'/>
                   :
                   <FontAwesomeIcon icon={faEyeSlash} onClick={handleVisible}  className='logo-input-group-text'/>
 
                 }
             </form>
             <div className='login-error-message'>
               {
               error  === "Password Salah"  ?
               <>{error}</>
               :
               <><div></div></>
               }
               </div>
             {/* <div className="form-group">
                 <input type="text" onChange={(e) => setPassword(e.target.value)} className="form-control input-login-admin-1"  placeholder="Masukkan Password" />
             </div> */}
           </div>
           <div className="form-group form-ingat-saya">
             <input type="checkbox" className="form-check-input mx-2" id="exampleCheck-1" style={{fontSize: '14px'}}/>
             <label className="form-check-label" for="exampleCheck1" id="keterangan-check-2">Ingat Saya</label>
           </div>
           <div className='lupa-kata-sandi-admin'>Lupa Kata Sandi</div>
           <button className='button-masuk-admin' disabled={loading}  onClick={handleLogin}>
           {
             loading?
                 'Loading'
             :
                 'Masuk'
          }
           </button>
           <div className='garis-1-login-admin'></div>
           <div className='atau-masuk-admin-login'>Atau Masuk Dengan</div>
           <div className='garis-2-login-admin'></div>
           <button className='login-with-google-admin'><img className="me-2" src={google} alt="" /> Masuk dengan Google</button>
       </div>
     </div>
    </div>
   );
}

if(localStorage.getItem('myTkn')){
  if(localStorage.getItem('myTkn') === tokenAdmin){
    return(
      <Navigate to='/homeadmin' />
    )
  }else{
      return(
          <Navigate to='/' />
      )
  }
}else{
  if(localStorage.getItem('token')){
    return(
      <Navigate to='/homeadmin' />
    )
  }else{
    return(
      <>{loginAdmin()}</>
    )
  }
}

// if(!localStorage.getItem('myTkn') || !localStorage.getItem('token')){
//   return(
//     <>{loginAdmin()}</>
//   )
// }


// if(localStorage.getItem('myTkn')){
//   return(
//       <Navigate to='/' />
//   )
// }


// if(localStorage.getItem('token')){
//   return(
//       <Navigate to='/homeadmin' />
//   )
// }

 
};

export default LoginAdmin;