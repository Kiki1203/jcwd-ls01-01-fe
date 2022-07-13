import React from 'react';
import { useDropzone } from 'react-dropzone';
import Divider from '@mui/material/Divider';
import './UploadResep.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import { useNavigate } from 'react-router-dom';
import PropagateLoader from 'react-spinners/PropagateLoader';
const override: CSSProperties = {
  display: 'block',
  borderColor: 'black',
};
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

  const { getRootProps, getInputProps, open } = useDropzone({
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

  return (
    <div id="container-upload-resep">
      {loading ? (
        <div className="loader">
          <PropagateLoader color={'red'} loading={loading} cssOverride={override} size={20} />
        </div>
      ) : (
        <div>
          <div className="mb-2">Send Receipt</div>
          <div className="mb-4">
            Tak perlu antre & obat langsung dikirimkan ke lokasi anda! <b> Foto tidak boleh lebih dari 10 MB.</b>
          </div>
          <div className="box-upload">
            <div>Unggah Resep Dokter</div>
            <hr />
            <div className="d-flex align-items-center mb-2"></div>
            <div>
              <div className="mb-3">
                <div label={editImageFileName} id="box-dropzone" {...getRootProps({ className: 'dropzone' })}>
                  <input label={editImageFileName} {...getInputProps()} />
                  <h4 className="mb-4">Drag 'n' drop files here</h4>
                  <Divider className="mb-4 mx-5">
                    <span> atau</span>
                  </Divider>
                  <button className="btn btn-danger btn-box-upload" type="button" onClick={open}>
                    Upload Receipt
                  </button>
                </div>
              </div>
            </div>
            <div className=" d-flex justify-content-end">
              <button className="me-3 btn btn-outline-danger">Cancel</button>
              <button className="btn btn-danger" onClick={() => onBtnUpload()}>
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadResep;
