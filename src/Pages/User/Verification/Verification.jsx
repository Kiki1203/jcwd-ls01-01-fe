import React from 'react';
import './Verification.css';
import VerifyPage from "../../../Assets/VerifyPage.svg"

const Verification = () => {
  return (
    <div className='container'>
      <div  className="d-lg-block d-md-block d-none" style={{position: 'absolute', height: '109px', left: '-2px',top: '-16px', border: "1px solid blue", width: "1200px"}}>NAVBAR</div>
        <div className="d-lg-none d-md-none d-block box-navbar-verify">
            <div className="logo-to-homepage">L</div>
            <div className="tulisan-verification">Verification</div>
        </div>
        <div className="logo-verify-page"><img src={VerifyPage} alt=""/></div>
        <div className="tulisan-oops">Oops...sorry, </div>
        <div className="tulisan-not-allowed">You are not allowed to access the homepage, don't forget to verify your account first via email or by clicking the button below:</div>
        <div className="button-resend-email">Resend Email Verification</div>
      <div className="d-lg-block d-md-block d-none" style={{position: 'absolute', height: '480px', left: '0px',top: '1036px', border: "1px solid blue", width: "1200px"}}>FOOTER</div>
   </div>
  );
};

export default Verification;
