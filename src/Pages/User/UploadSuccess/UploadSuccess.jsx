import React from 'react';
import './UploadSuccess.css';
import uploadsuccess from '../../../Assets/uploadSuccess.svg';
import { useNavigate } from 'react-router-dom';

const UploadSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid container-upload-success">
      <div className="row justify-content-center">
        <div className="mb-4 col-12 mb-5 text-center">
          {' '}
          <img src={uploadsuccess} alt="" />
        </div>
        <div className="mb-2 col-12 text-center mkm">Upload Recipe Successful!</div>
        <div className="mb-5 col-12 text-center spa">You will get a notification if your doctor's prescription is confirmed by the admin</div>
        <div className="row justify-content-center">
          <div className="mb-2 col-6 text-center ">
            <button class="btn btn-danger button-au w-100" onClick={() => navigate(`/menunggukonfirmasi`)}>
              Order Progress
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className=" col-6 text-center">
            <button class="btn btn-outline-danger button-au w-100 " onClick={() => navigate(`/`)}>
              Back To Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSuccess;
