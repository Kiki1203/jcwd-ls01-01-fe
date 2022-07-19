import React, { useState, useEffect } from "react";
import './NavbarAdmin.css';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';

const NavbarAdmin  = () => {

    const navigate = useNavigate()
    const [tokenAdmin, setTokenAdmin] = useState('')
    useEffect(() => {
      let token = localStorage.getItem('token')
      const headers = {
          headers: { 
              'Authorization': `${token}`,
          }
      }
      axios.get(`${API_URL}/admin/gettokenadmin`, headers)
      .then((res) => {
          setTokenAdmin(res.data[0].token)
      }).catch((err) => {
          console.log('ini err get',err)
      })
  }, [tokenAdmin])

    const btnLogOut = () => {
        if(localStorage.getItem('token')){
            if(localStorage.getItem('token') === tokenAdmin){
                if(localStorage.getItem('myTkn')){
                localStorage.removeItem('token');
                localStorage.removeItem('myTkn');
                navigate("/login")
                }else{
                localStorage.removeItem('token');
                navigate("/loginadmin")
                }
            }
        }else{
        localStorage.removeItem('myTkn');
        navigate("/loginadmin")
        }
    }

    return(
        <div className="container">
            <div className="navbar-box-admin">
                <div className="logo-notif-navbar-admin"><FontAwesomeIcon icon={faBell} className="" /></div>
                <div className="logo-profile-navbar-admin" onClick={() => btnLogOut()}><FontAwesomeIcon icon={faArrowRightFromBracket} className="" /></div>
            </div>  
        </div>
    )
}

export default NavbarAdmin