import React, { useState } from "react";
import './TabDiproses.css';
import TemplateProsesPemesanan from "../TemplateProsesPemesanan";
import Chat from '../../../../Assets/CHAT.svg';

const TabDiproses  = () => {
    
    
    return(
        <div className="container-diproses">
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
            <div className="box-diproses-pesanan">
              <div className="inside-box-diproses-pesanan">
                <div className="tanggal-diproses-pesanan">Jumat, 5 April 2022, 15:45</div>
                <div className="notifikasi-diproses-pesanan"><div className="status-diproses-pesanan">Pesanan Diproses</div></div>
                <div className="garis-diproses-pesanan-1"></div>
                <div className="foto-diproses-pesanan">
                  <img src="" alt="" className="foto-produk-diproses"/>
                </div>
                <div className="nama-obat-diproses-pesanan">Bisolvon 8MG 4 Tablet</div>
                <div className="harga-obat-diproses-pesanan">Rp13.000</div>
                <div className="jumlah-obat-diproses-pesanan">1 Strip</div>
                <div className="button-tampilkan-detail-diproses">Tampilkan Detail</div>
                <div className="keterangan-sub-total-diproses">Sub Total</div>
                <div className="total-yang-dibayarkan">Rp22.000</div>
                <div className="garis-diproses-2"></div>
                <div className="box-chat-cs-diproses">
                  <span className="material-icons logo-cs-diproses">textsms</span>
                  <div className="keterangan-chat-diproses">Chat Customer Service</div>
                </div>
              </div>
            </div>
            <button className="ml-5" id='btn-pagination'>1</button>
          </div>

           {/* CONTOH JIKA RESEP */}
          <div className='position-all-box'>
            <div className="box-diproses-pesanan">
              <div className="inside-box-diproses-pesanan">
                <div className="tanggal-diproses-pesanan">Jumat, 5 April 2022, 15:45</div>
                <div className="notifikasi-diproses-pesanan"><div className="status-diproses-pesanan">diproses Konfirmasi</div></div>
                <div className="garis-diproses-pesanan-1"></div>
                <div className="foto-diproses-pesanan">
                  <img src="" alt="" className="foto-produk-diproses"/>
                </div>
                <div className="nama-obat-diproses-pesanan">Nomor Resep</div>
                <div className="harga-obat-diproses-pesanan">Timer</div>
                <div className="jumlah-obat-diproses-pesanan">#123abc456def</div>
                <div className="button-tampilkan-detail-diproses">Tampilkan Detail</div>
                <div className="garis-diproses-2-resep"></div>
                  <div className="box-chat-cs-diproses-resep">
                    <div className="logo-cs-diproses"><img src={Chat} alt="" width="24px" height="24px"/></div>
                    <div className="keterangan-chat-diproses">Chat Customer Service</div>
                  </div>
              </div>
            </div>
            <button className="ml-5" id='btn-pagination'>1</button>
          </div>
        </div>
    )
}

export default TabDiproses