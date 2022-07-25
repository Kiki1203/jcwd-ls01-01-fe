import React, { useState, useEffect } from "react";
import './EditProfile.css';
import SidebarProfile from "../../../Components/User/SidebarProfile/SidebarProfile.jsx";
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import Swal from 'sweetalert2';
import default1 from '../../../Assets/default.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import FooterMobile from "../../../Components/User/Footer/FooterMobile.jsx"


function EditProfile() {
    const [nama, setNama] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [tanggallahir, setTanggallahir] = React.useState("");
    const [profilepic, setProfilepic] = React.useState("");
    const [editImageFileName, seteditImageFileName] = React.useState('Select Image...');
    const [editImageFile, seteditImageFile] =  React.useState(undefined);
    const [previewImage, setpreviewImage] =  React.useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const onImagesValidation = (e) => {
        try {
            let file = [...e.target.files]
            setFile(file[0])
            if(file.length > 1) throw { message: 'Hanya Bisa Upload 1 Gambar Saja' }
            if(file[0].size > 5000000) throw { message: 'File Tidak Boleh Melebihi 5 Mb' }
            if(!file[0].type.includes('image'))  throw { message: 'Jenis File Tidak Diizinkan'}
            const reader = new FileReader()
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
            console.log('res', res)
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


            let tahun = tanggallahir
            tahun = tahun.split('')
            tahun = tahun.slice(0,4).join('')
            console.log('tahun', tahun)
            
            var data = {
                nama: nama,
                email: email,
                gender: gender,
                tanggal_lahir: tanggallahir,
                umur: tahun
            }
    
            formData.append('image', file)
            formData.append('data', JSON.stringify(data))
            
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
    <div>
        <div className="container-ep">
        <div>
         <div className="wrapper-ep">
         <div className="c1 d-flex">
            <div className='col-lg-3 col-md-2 d-lg-block d-md-block d-none sidebar-ep-1'>
                    <SidebarProfile/>
            </div>
            <div  className='col-lg-1 col-md-1 col-none d-lg-block d-md-none d-none'>
                
            </div>
            <div  className='col-lg-8 col-md-9 col-12 sidebar-ep'>
                <div>
                <div className="d-lg-none d-md-none d-block d-flex navbar-pro">
                    <div>
                        <Link to='/profile' style={{ textDecoration:"none", color: "black", cursor: 'pointer', fontSize: "12px", marginTop: "30px", marginLeft:"10px" }}>
                            <FontAwesomeIcon icon={faAngleLeft} className="logo-1-p"/>
                        </Link>
                    </div>
                    <div className="keterangan-verifikasi-desk"  style={{marginTop: "35px", marginLeft: "30px"}}>Edit Profile</div>
                </div>
                <div className="d-lg-block d-md-block d-none">
                <div className="mx-4 mt-4 keterangan-verifikasi-desk">Akun Terverifikasi</div>
                </div>
                    <div className=" mt-4 d-lg-block d-md-block d-none">
                       <div className="d-flex ">
                       <div className="tab-profile" onClick={() => navigate('/profile')}>Profile</div> 
                        <div className="tab-profile" onClick={() => navigate('/editprofile')}>Edit Profile</div>
                        <div className="tab-profile"onClick={() => navigate('/changepassword')}>Change Password</div>
                       </div>
                    </div>
                </div>
                <div  className="d-lg-block d-md-block d-none">
               <hr style={{marginTop:'0px'}}/>
               </div>
                <div className="c2">
                <div>
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
                <form method="POST" action="/upload" encType='multipart/form-data'>
                <input type="file" name='photo' accept="image/*" id="image-input" style={{display: 'none'}} onChange={(e) => onImagesValidation(e)} />
                </form>
                    <label htmlFor='image-input' id="choose-file-edit-profile">Choose image</label>
                </div>
                <div className="box-notifikasi-error">
                    {
                            errorMessage  === "Cannot read properties of undefined (reading 'size')" ?
                            <></>
                            :
                            <p style={{margin: '10px', color: 'black;', fontSize:'14px'}}>{errorMessage}</p>
                    }
                </div>
                </div>
                <div className="box-baris-ep">
                <div className="baris-edit-profile-1">
                    <label for="exampleFormControlInput1" className="form-label" id="label-edit-profile">
                        Name
                    </label>
                    <input type="text" 
                    onChange={namaChange} defaultValue={nama}
                    name="editUserName"
                    className="form-control  input-edit-profile-1" placeholder="Enter Your Name" />
                </div>
                <div className="form-group mt-2 baris-edit-profile-2">
                        <label for="exampleFormControlInput1" className="form-label" id="label-edit-profile">
                        Email
                        </label>
                        <input type="text" 
                        onChange={emailChange} defaultValue={email}
                        name="editUserEmail"
                        className="form-control input-edit-profile-2"  placeholder="Email Address" />
                    </div>
                <div className="form-group  baris-edit-profile-3">
                    <label for="exampleFormControlInput1" className="form-label" id="label-edit-profile">
                        Gender
                    </label>
                    <select 
                    id="inputGender" 
                    onChange={genderChange} defaultValue={gender}
                    name="editUserGender"
                    className="form-control  input-edit-profile-3"  placeholder="Gender"
                    >
                        <option value="" >All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="form-group baris-edit-profile-4">
                    <label for="exampleFormControlInput1" className="form-label" id="label-edit-profile">
                        Birthday
                    </label>
                    <div className="input-group">
                        <input type="date"
                        defaultValue={tanggallahir}  onChange={tanggalChange}
                            placeholder="Tanggal Lahir" className="form-control rounded-0 border-left-0 border-right-0" required />
                        <div className="input-group-prepend">
                        </div>
                    </div>
                </div>
                <div className="d-lg-none d-md-none d-block" id="wanna-change-password">Wanna change password? <Link to="/changepassword" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}><span>click here</span></Link></div>
                <button type="submit" disabled={loading} className="button-simpan-edit-profile"onClick={() => onBtnUpdateProfile ()} >
                {
                    loading?
                        'Loading'
                    :
                        'Simpan'
                }
                </button>
                </div>
                </div>
                <FooterMobile/>
             </div>
            
         </div>
         
         </div> 
         
     </div>
     
     </div>
    </div>
    );
}

export default EditProfile;