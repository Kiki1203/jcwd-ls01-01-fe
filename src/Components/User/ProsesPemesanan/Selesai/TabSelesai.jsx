import React, { useState } from "react";
import './TabSelesai.css';
import TemplateProsesPemesanan from "../TemplateProsesPemesanan";
import Chat from '../../../../Assets/CHAT.svg';


const TabSelesai  = () => {
    
    
    return(
        <div className="container-selesai">
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
            <div className="box-selesai-pesanan">
              <div className="inside-box-selesai-pesanan">
                <div className="tanggal-selesai-pesanan">Jumat, 5 April 2022, 15:45</div>
                <div className="notifikasi-selesai-pesanan"><div className="status-selesai-pesanan">Pesanan Dibatalkan</div></div>
                <div className="garis-selesai-pesanan-1"></div>
                <div className="foto-selesai-pesanan">
                  <img src="" alt="" className="foto-produk-selesai"/>
                </div>
                <div className="nama-obat-selesai-pesanan">Bisolvon 8MG 4 Tablet</div>
                <div className="harga-obat-selesai-pesanan">Rp13.000</div>
                <div className="jumlah-obat-selesai-pesanan">1 Strip</div>
                <div className="button-tampilkan-detail-selesai">Tampilkan Detail</div>
                <div className="keterangan-sub-total-selesai">Sub Total</div>
                <div className="total-yang-dibayarkan">Rp22.000</div>
                <div className="garis-selesai-2"></div>
                <div className="box-chat-cs-selesai">
                  <span className="material-icons logo-cs-selesai">textsms</span>
                  <div className="keterangan-chat-selesai">Chat Customer Service</div>
                </div>
                <div className="button-selesai">Beli Lagi</div>
              </div>
            </div>
            <button className="ml-5" id='btn-pagination'>1</button>
          </div>

           {/* CONTOH JIKA RESEP */}
          <div className='position-all-box'>
            <div className="box-selesai-pesanan">
              <div className="inside-box-selesai-pesanan">
                <div className="tanggal-selesai-pesanan">Jumat, 5 April 2022, 15:45</div>
                <div className="notifikasi-selesai-pesanan"><div className="status-selesai-pesanan">Pesanan Dibatalkan</div></div>
                <div className="garis-selesai-pesanan-1"></div>
                <div className="foto-selesai-pesanan">
                  <img src="" alt="" className="foto-produk-selesai"/>
                </div>
                <div className="nama-obat-selesai-pesanan">Nomor Resep</div>
                <div className="harga-obat-selesai-pesanan">Timer</div>
                <div className="jumlah-obat-selesai-pesanan">#123abc456def</div>
                <div className="button-tampilkan-detail-selesai">Tampilkan Detail</div>
                <div className="garis-selesai-2-resep"></div>
                  <div className="box-chat-cs-selesai-resep">
                    <div className="logo-cs-selesai"><img src={Chat} alt="" width="24px" height="24px"/></div>
                    <div className="keterangan-chat-selesai">Chat Customer Service</div>
                  </div>
                <div className="button-selesai-resep">Beli Lagi</div>
              </div>
            </div>
            <button className="ml-5" id='btn-pagination'>1</button>
          </div>
        </div>
    )
}

export default TabSelesai