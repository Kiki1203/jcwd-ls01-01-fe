import React from 'react';
import { useDropzone } from 'react-dropzone';
import Divider from '@mui/material/Divider';
import './UploadResep.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import { useNavigate } from 'react-router-dom';
import image from './../../../Assets/iconImage.svg';
import { InputGroup, InputGroupText, Input } from 'reactstrap';
import RingLoader from 'react-spinners/RingLoader';
import upload from './../../../Assets/upload.svg';

const UploadResep = () => {
  const [editImageFileName, seteditImageFileName] = React.useState('Select Image...');
  const [editImageFile, seteditImageFile] = React.useState(undefined);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
  });

  const uploadResep = (file) => {
    console.log('e.target.files[0].name', file[0].name);
    if (file[0]) {
      seteditImageFileName(file[0].name);
      seteditImageFile(file[0]);
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
    } else {
      seteditImageFileName('Select Image...');
      seteditImageFile('');
    }
  };

  const onBtnUpload = () => {
    var formData = new FormData();
    let token = localStorage.getItem('myTkn');

    var headers = {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    formData.append('image', editImageFile);
    setLoading(true);
    axios
      .post(API_URL + '/product/uploadresep', formData, headers)
      .then((res) => {
        console.log(res.data);
        setLoading(true);
        navigate('/uploadresepsuccess');
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          title: 'Error!',
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'Okay!',
        });
      });
  };
  const maxSize = 1000000;

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    validator: maxSizeValidator,
    onDrop: (acceptedFiles) => uploadResep(acceptedFiles),
  });

  function maxSizeValidator(file) {
    if (file.size > maxSize) {
      return Toast.fire({ html: `Size file can't exceed 10MB`, icon: 'error', title: 'Error' });
    }

    return null;
  }
  const files = acceptedFiles.map((file) => (
    <InputGroup>
      <InputGroupText style={{ background: 'white' }}>
        <img src={image} alt="" />
      </InputGroupText>
      <Input style={{ background: 'white' }} disabled key={file.path} placeholder={`${file.path} - Size ${Math.round(file.size / 100000)} MB`} />
    </InputGroup>
  ));

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="loader text-center">
            <RingLoader color={'red'} loading={loading} cssOverride={{ borderColor: 'black' }} size={100} />
          </div>
        </div>
      ) : (
        <div className="container-fluid container-uploadResep">
          <div className="row">
            <div className="col-12 mb-2 none mkm">Send Receipt</div>
            <div className=" col-12 mb-4 spa none">
              Tak perlu antre & obat langsung dikirimkan ke lokasi anda! <b> Foto tidak boleh lebih dari 10 MB.</b>
            </div>
            <div className="col-12 box-upload py-5 px-5">
              <div className="mkm">Unggah Resep </div>
              <hr />
              <div className="col-sm-12 col-md-6 col-lg-6  text-start mb-2">
                <div>{files}</div>
              </div>
              <div className="align-items-center mb-2"></div>
              <div>
                <div className="mb-3">
                  <div label={editImageFileName} id="box-dropzone" {...getRootProps({ className: 'dropzone' })}>
                    <input label={editImageFileName} {...getInputProps()} />
                    <h4 className="mb-4 none mkm">Drag 'n' drop files here</h4>
                    <div className="none">
                      <Divider className=" mb-4 mx-5 spa">
                        <span> atau</span>
                      </Divider>
                    </div>
                    <img src={upload} alt="" className="" type="button" onClick={open} />
                  </div>
                </div>
              </div>
              <div className=" d-flex justify-content-end">
                <button className="me-3 btn btn-outline-danger  button-au" onClick={() => navigate(`/`)}>
                  Cancel
                </button>
                <button className="btn btn-danger button-au" onClick={() => onBtnUpload()}>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadResep;
