import React, { useState } from "react";
import './FavoritePage.css';
import SidebarProfile2 from "../../../Components/User/SidebarProfile/SidebarProfile2.jsx";


const FavoritePage  = () => {    
    return(
        <div className="container-favorite">
            <SidebarProfile2/>
            <div className="favorite-box">
                <div className="d-lg-none d-md-none d-block"><span className="material-icons pinggiran-atas-favorite">chevron_left</span></div>
                <div className="judul-favorite">Favorite</div>
                <div className="garis-favorite"></div>
                <div className="box-image-favorite">
                    <div className="image-favorite"></div>
                    <div id="love-button"><div className="like-button-favorite" ></div></div>
                    <div id="love-button"><div className="like-button-favorite" ></div></div>
                    <div className="nama-obat-favorite">BISOLVON 8 MG 4 TABLET</div>
                    <div className="harga-favorite">Rp. 13.000 </div>
                    <div className="keterangan-jumlah-favorite">/Strip</div>
                    <div className="button-keranjang-favorite">Keranjang</div>
                </div>
                <div className="button-next-page-favorite">1</div>
            </div>
        </div>
    )
}

export default FavoritePage