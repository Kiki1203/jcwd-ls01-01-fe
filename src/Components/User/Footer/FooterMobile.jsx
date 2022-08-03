import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate  } from 'react-router-dom';
import { faUser, faHome, faPills, faReceipt, faHeadset } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const navigate = useNavigate()

  return (
   <>     
    <div className="d-lg-none d-md-none d-block">
      <div className='container-footer-mobile'>
        <div className="container-inside-footer-mobile">
          <div className="beranda-footer"  onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faHome}className='footer-mobile-icon' />
           Beranda
          </div>
          { !localStorage.getItem('myTkn') ? 
          <>
           <div className="beranda-footer" onClick={() => navigate('/kategori/semua-kategori')}>
           <FontAwesomeIcon icon={faPills} className='footer-mobile-icon' />
            Kategori
           </div>
           <div className="beranda-footer" onClick={() => navigate('/login')}>
          <FontAwesomeIcon icon={faReceipt} className='footer-mobile-icon' />
           Transaksi
          </div>
          <div className="beranda-footer" onClick={() => navigate('/login')}>
          <FontAwesomeIcon icon={faHeadset} className='footer-mobile-icon' />
           Bantuan
          </div>
          <div className="beranda-footer" onClick={() => navigate('/login')}>
          <FontAwesomeIcon icon={faUser} className='footer-mobile-icon' />
           Profile
          </div>
          </>
           :
          <>
           <div className="beranda-footer" onClick={() => navigate('/kategori/semua-kategori')}>
           <FontAwesomeIcon icon={faPills} className='footer-mobile-icon' />
            Kategori
           </div>
           <div className="beranda-footer" onClick={() => navigate('/semuapesanan')}>
          <FontAwesomeIcon icon={faReceipt} className='footer-mobile-icon' />
           Transaksi
          </div>
          <div className="beranda-footer">
          <FontAwesomeIcon icon={faHeadset} className='footer-mobile-icon' />
           Bantuan
          </div>
          <div className="beranda-footer" onClick={() => navigate('/profile')}>
          <FontAwesomeIcon icon={faUser} className='footer-mobile-icon' />
           Profile
          </div>
          </>
          }
        
        </div>
      </div>
    </div>
   </>
  );
};

export default Footer;
