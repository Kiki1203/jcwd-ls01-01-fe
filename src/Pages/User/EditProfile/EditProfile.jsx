import React, { useState, useEffect } from "react";
import './EditProfile.css';
import SidebarProfile2 from "../../../Components/User/SidebarProfile/SidebarProfile2.jsx";
import TemplateProfile from "../../../Components/User/TemplateProfile/TemplateProfile.jsx";
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import Swal from 'sweetalert2';
import default1 from '../../../Assets/default.jpg';
import Footer from "../../../Components/User/Footer/Footer.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate } from 'react-router-dom';


function EditProfile() {
    const [nama, setNama] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [tanggallahir, setTanggallahir] = React.useState("");
    const [profilepic, setProfilepic] = React.useState("");
    const [editImageFileName, seteditImageFileName] = React.useState('Select Image...');
    const [editImageFile, seteditImageFile] =  React.useState(undefined);
    const [previewImage, setpreviewImage] =  React.useState(null);
    const [listProfile, setlistrofile] = React.useState([]);
    const [selectedEditProfile, setselectedEditProfile] = React.useState(0);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    console.log('errorMessage', errorMessage)

    const onImagesValidation = (e) => {
        try {
            let file = [...e.target.files]
            setFile(file[0])
            if(file.length > 1) throw { message: 'You can only upload 1 image' }
            if(file[0].size > 4000000) throw { message: 'Your file size is too big (>5mb)' }
            if(!file[0].type.includes('image'))  throw { message: 'This file type is not supported'}
            const reader = new FileReader()
            //   reader.readAsDataURL(e.target.files[0])
              reader.onload = () => {
                  if(reader.readyState === 2){
                      setpreviewImage(reader.result)
                  }
              }
            reader.readAsDataURL(file[0])
            setErrorMessage('')
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    
    useEffect(() => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        axios.get(`${API_URL}/user/datauser`, headers)
        .then((res) => {
            // console.log(res.data)
            // console.log('ini res.data.nama', res.data[0].nama)
            if(res.data[0].nama) {setNama(res.data[0].nama)}
            if(res.data[0].email) {setEmail(res.data[0].email)}
            if(res.data[0].gender) {setGender(res.data[0].gender)}
            if(res.data[0].profile_picture) {setProfilepic(res.data[0].profile_picture)}
            if(res.data[0].tanggal_lahir) {setTanggallahir(res.data[0].tanggal_lahir)}
        }).catch((err) => {
            console.log('ini err get',err)
        })
        }, [])

        let namaChange = (event) => {
            setNama(event.target.value)
        }
    
        let emailChange = (event) => {
            setEmail(event.target.value)
        }

        let genderChange = (event) => {
            setGender(event.target.value)
        }

        let tanggalChange = (event) => {
            setTanggallahir(event.target.value)
        }

         const onEditImageFileChange = (e) => {
            console.log('e.target.files[0].name', e.target.files[0].name)
            if(e.target.files[0]) {
                seteditImageFileName(e.target.files[0].name)
                seteditImageFile(e.target.files[0])
                const reader = new FileReader()
                reader.readAsDataURL(e.target.files[0])
                reader.onload = () => {
                    if(reader.readyState === 2){
                        setpreviewImage(reader.result)
                    }
                }
            }
            else {
                seteditImageFileName('Select Image...')
                seteditImageFile("")
            }
        }

        const onBtnUpdateProfile = () => {
            setLoading(true)
            var formData = new FormData()
            let token = localStorage.getItem('myTkn')
            var headers = {
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }

          
            let borndate = tanggallahir
            borndate = borndate.split('T')
            borndate = borndate.join(' ') 
            console.log('ini borndate', borndate)

            let tahun = tanggallahir
            tahun = tahun.split('')
            tahun = tahun.slice(0,4).join('')
            console.log('tahun', tahun)
            
            var data = {
                nama: nama,
                email: email,
                gender: gender,
                tanggal_lahir: borndate,
                umur: tahun
            }
    
            formData.append('image', file)
            formData.append('data', JSON.stringify(data))
            
            if(!data.email.includes('@')) throw { message: Swal.fire({
                title: 'Error!',
                text: 'Email Wrong',
                icon: 'error',
                confirmButtonText: 'Okay!'
            }) }
            axios.patch(API_URL + "/user/editprofiledata", formData, headers)
            .then((res) => {
                // console.log(res.data)
                if(res.data[0].nama) {setNama(res.data[0].nama)}
                else {setNama('')}
                if(res.data[0].email) {setEmail(res.data[0].email)}
                 else {setEmail('')}
                if(res.data[0].gender) {setGender(res.data[0].gender)}
                if(res.data[0].profile_picture) {setProfilepic(res.data[0].profile_picture)}
                else {setProfilepic('')}
                {setTanggallahir(res.data[0].tanggal_lahir)}
                Swal.fire({
                    title: 'Success!',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'Okay!'
                })
                 seteditImageFileName('Select Image...')
                 setLoading(false)
            })
            .catch((err) =>{
                Swal.fire({
                    title: 'Error!',
                    text: err.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Okay!'
                })
                setLoading(false)
            })
        }
       
   if(!localStorage.getItem('myTkn')){
            return(
                <Navigate to='/' />
            )
    }

    return (
        <div className="container">
        <TemplateProfile/>
        <SidebarProfile2/>
        <div>
            <div className="d-lg-none d-md-none d-block"><Link to="/profile" style={{ textDecoration:"none", color: "black", cursor: 'pointer' }}><FontAwesomeIcon icon={faAngleLeft} className="pinggiran-atas-profile" /></Link></div>
            <div className="keterangan-verifikasi">Akun Terverifikasi
            {
         errorMessage && <p style={{margin: '10px', color: 'black;', fontSize:'14px'}}>{errorMessage}</p>
         }
            </div>
            <div className="mt-5">
       
        </div>
        </div>
        <div className="edit-foto-profile">
        {
            previewImage? 
            <img src={previewImage} alt='Image Preview' id='userImgEdit' /> 
            : 
            profilepic?
            <img src={`${API_URL + '/'}${profilepic}`} alt='Image Preview' id='userImgEdit' />
            :
            <img  src={default1} alt='Image Preview' id='userImgEdit' />
        }
        </div>
        <div>
        {/* <input className="button-edit-foto" type="file" label={editImageFileName} onChange={onEditImageFileChange} /> */}
        <form method="POST" action="/upload" encType='multipart/form-data'>
        <input type="file" name='photo' accept="image/*" id="image-input" style={{display: 'none'}} onChange={(e) => onImagesValidation(e)} />
        </form>
         <label htmlFor='image-input' id="choose-file-edit-profile">Choose image</label>
        </div>
        <div className="baris-edit-profile-1">
            <label for="exampleFormControlInput1" className="form-label" id="label-edit-profile">
              Name
            </label>
            <input type="text" 
            onChange={namaChange} defaultValue={nama}
            name="editUserName"
            className="form-control mt-2 input-edit-profile-1" placeholder="Enter Your Name" />
        </div>
        <div className="form-group mt-2 baris-edit-profile-2">
            <label for="exampleFormControlInput1" className="form-label" id="label-edit-profile">
              Email
            </label>
            <input type="text" 
             onChange={emailChange} defaultValue={email}
             name="editUserEmail"
            className="form-control mt-2 input-edit-profile-2"  placeholder="Email Address" />
        </div>
        <div className="form-group mt-3 baris-edit-profile-3">
            <label for="exampleFormControlInput1" className="form-label" id="label-edit-profile">
              Gender
            </label>
            <select 
            id="inputGender" 
            onChange={genderChange} defaultValue={gender}
            name="editUserGender"
            className="form-control mt-2 input-edit-profile-3"  placeholder="Gender"
            >
                <option value="" >All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
        </div>
        <div className="form-group mt-4 baris-edit-profile-4">
            <label for="exampleFormControlInput1" className="form-label" id="label-edit-profile">
             Birthday
            </label>
            <div className="input-group">
                <input type="datetime-local"
                defaultValue={tanggallahir}  onChange={tanggalChange}
                 placeholder="Tanggal Lahir" className="form-control rounded-0 border-left-0 border-right-0 mytetring-input" required />
                <div className="input-group-prepend">
                </div>
            </div>
        </div>
        <div className="d-lg-none d-md-none d-block" id="wanna-change-password">Wanna change password? <Link to="/changepassword" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}><span>click here</span></Link></div>
        <button type="submit" disabled={loading} className="mt-4 button-simpan-edit-profile"onClick={() => onBtnUpdateProfile ()} >
        {
            loading?
                'Loading'
            :
                'Simpan'
        }
        </button>
       
   
    </div>
    );
}

export default EditProfile;