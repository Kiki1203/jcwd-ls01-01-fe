import React, { useState } from "react";
import './TabDibatalkan.css';
import TemplateProsesPemesanan from "../TemplateProsesPemesanan";
import Chat from '../../../../Assets/CHAT.svg';


const TabDibatalkan  = () => {
    
    
    return(
        <div className="container-dibatalkan">
          <TemplateProsesPemesanan/>
           {/* CONTOH JIKA BUKAN RESEP */}

           {/* keterangan, waktu mapping janlup ditambahin mx-4 my-4 dan format render sebegai berikut:
           <div className="container">
              <TemplateProsesPemesanan/>
              <div className='position-all-box'>
              {this.printProducts()}
              <button className="ml-5" id='btn-pagination'>1</button>
              </div>
              <div>
             
              </div>
          </div>
           */}

          <div className='position-all-box'>
            <div className="box-dibatalkan-pesanan">
              <div className="inside-box-dibatalkan-pesanan">
                <div className="tanggal-dibatalkan-pesanan">Jumat, 5 April 2022, 15:45</div>
                <div className="notifikasi-dibatalkan-pesanan"><div className="status-dibatalkan-pesanan">Pesanan Dibatalkan</div></div>
                <div className="garis-dibatalkan-pesanan-1"></div>
                <div className="foto-dibatalkan-pesanan">
                  <img src="" alt="" className="foto-produk-dibatalkan"/>
                </div>
                <div className="nama-obat-dibatalkan-pesanan">Bisolvon 8MG 4 Tablet</div>
                <div className="harga-obat-dibatalkan-pesanan">Rp13.000</div>
                <div className="jumlah-obat-dibatalkan-pesanan">1 Strip</div>
                <div className="button-tampilkan-detail-dibatalkan">Tampilkan Detail</div>
                <div className="keterangan-sub-total-dibatalkan">Sub Total</div>
                <div className="total-yang-dibayarkan">Rp22.000</div>
                <div className="garis-dibatalkan-2"></div>
                <div className="box-chat-cs-dibatalkan">
                  <span className="material-icons logo-cs-dibatalkan">textsms</span>
                  <div className="keterangan-chat-dibatalkan">Chat Customer Service</div>
                </div>
                <div className="button-dibatalkan">Beli Lagi</div>
              </div>
            </div>
            <button className="ml-5" id='btn-pagination'>1</button>
          </div>

           {/* CONTOH JIKA RESEP */}
          <div className='position-all-box'>
            <div className="box-dibatalkan-pesanan">
              <div className="inside-box-dibatalkan-pesanan">
                <div className="tanggal-dibatalkan-pesanan">Jumat, 5 April 2022, 15:45</div>
                <div className="notifikasi-dibatalkan-pesanan"><div className="status-dibatalkan-pesanan">Pesanan Dibatalkan</div></div>
                <div className="garis-dibatalkan-pesanan-1"></div>
                <div className="foto-dibatalkan-pesanan">
                  <img src="" alt="" className="foto-produk-dibatalkan"/>
                </div>
                <div className="nama-obat-dibatalkan-pesanan">Nomor Resep</div>
                <div className="harga-obat-dibatalkan-pesanan">Timer</div>
                <div className="jumlah-obat-dibatalkan-pesanan">#123abc456def</div>
                <div className="button-tampilkan-detail-dibatalkan">Tampilkan Detail</div>
                <div className="garis-dibatalkan-2-resep"></div>
                  <div className="box-chat-cs-dibatalkan-resep">
                    <div className="logo-cs-dibatalkan"><img src={Chat} alt="" width="24px" height="24px"/></div>
                    <div className="keterangan-chat-dibatalkan">Chat Customer Service</div>
                  </div>
                <div className="button-dibatalkan-resep">Beli Lagi</div>
              </div>
            </div>
            <button className="ml-5" id='btn-pagination'>1</button>
          </div>
        </div>
    )
}

export default TabDibatalkan