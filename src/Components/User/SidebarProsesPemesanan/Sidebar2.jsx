import React from "react";
import './Sidebar2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCartShopping, faAngleLeft, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Link} from "react-router-dom";

const Sidebar2  = () => {  
 
    return(
     <div className="container-sb2">
          {/* TAB VERSI DEKSTOP */}
          <div className="d-md-block d-lg-block d-none">
              <div className='template-tab'>
                <div className="judul-1">Daftar Pemesanan </div>
                {/* TAB */}
                <div className="d-flex c-sb-2">
                <Link to="/semuapesanan" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                    <div className="tab-semua">Semua</div>
                 </Link>
                 <Link to="/ditunggu" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                 <div className="tab-menunggu">Menunggu</div>
                 </Link>
                  <Link to="/diproses" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                  <div className="tab-diproses">Diproses</div>
                 </Link>
                 <Link to="/dikirim" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                  <div className="tab-dikirim">Dikirim</div>
                 </Link>
                 <Link to="/selesai" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                  <div className="tab-selesai">Selesai</div>
                 </Link>
                 <Link to="/dibatalkan" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                  <div className="tab-dibatalkan">Dibatalkan</div>
                 </Link>
              
                </div>
                <div className="garis-batas-tab"></div>
                {/* FILTER */}
                <div className="d-flex  c-sb-3">
                <div className="judul-filter-jenis-obat">Jenis Obat</div>
                <div className="box-filter">
                  <div className="button-semua-obat">Semua Obat</div>
                  <div  className="button-obat-resep">Obat Resep</div>
                  <div  className="button-obat-bebas">Obat Bebas</div>
                </div>
                <div className="urutkan-filter">Urutkan</div>
                <select className='dropdown-01'>
                  <option className="isi-dropdown-01">Terbaru</option>
                  <option className="isi-dropdown-01">Terlama</option>
                </select>
              </div>
            </div>
                </div>

            
            {/* VERSI MOBILE */}
            <div className="d-md-none d-lg-none d-block">
                {/* TAB */}
                <div className="tab-versi-mobile navbar-sb">
                  <div className="d-flex">
                  <div>
                        <Link to='/' style={{ textDecoration:"none", color: "black", cursor: 'pointer', fontSize: "12px", marginTop: "30px", marginLeft:"10px" }}>
                            <FontAwesomeIcon icon={faAngleLeft} style={{marginTop: '43px', marginLeft:"10px"}} />
                        </Link>
                    </div>
                  <div className="daftar-pemesan-mobile">Daftar Pemesanan</div>
                  
                  <div style={{fontSize: '5px'}}>
                  <FontAwesomeIcon icon={faBell}  style={{cursor:"pointer", color:"#E0004D", marginLeft: '60px', fontSize: '14px', marginTop: '43px'}}/>
                  <FontAwesomeIcon icon={faCartShopping}  style={{cursor:"pointer", color:"#E0004D",  fontSize: '14px',  marginLeft: '20px', marginTop: '43px'}}/>
                  </div>
                  </div>
                  <div className="d-flex">
                  <div className="tab-box-mobile">
                  <Link to="/semuapesanan" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                  <div className="tab-semua-mobile">Semua</div>
                 </Link>
                 <Link to="/ditunggu" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                 <div className="tab-menunggu-mobile">Menunggu</div>
                 </Link>
                 <Link to="/diproses" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                 <div className="tab-diproses-mobile">Diproses</div>
                 </Link>
                 <Link to="/dikirim" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                 <div className="tab-dikirim-mobile">Dikirim</div>
                 </Link>
                 <Link to="/selesai" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                 <div className="tab-selesai-mobile">Selesai</div>
                 </Link>
                  <Link to="/dibatalkan" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                  <div className="tab-dibatalkan-mobile">Dibatalkan</div>
                 </Link>
                
                  </div>
                  </div>
                </div>
                <div className=" d-flex btn-grup-1">
                  <div  className=" d-flex btn-grup">
                    <div className="button-semua-mobile">Semua</div>
                    <div className="button-obat-resep-mobile">Obat Resep</div>
                    <div className="button-obat-bebas-mobile">Obat Bebas</div>
                  </div>
                  <div className="filter-mobile">  <FontAwesomeIcon icon={faFilter}  style={{cursor:"pointer", color:"#E0004D",  fontSize: '12px'}}/></div>
                </div>
               
             
                <div className="garis-akhir-mobile"></div>
            </div>
     </div>
    )
}

export default Sidebar2