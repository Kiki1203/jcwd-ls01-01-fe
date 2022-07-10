import React, { useState } from "react";
import './TabDikirim.css';
import TemplateProsesPemesanan from "../TemplateProsesPemesanan";
import Chat from '../../../../Assets/CHAT.svg';


const TabDikirim  = () => {
    
    
    return(
        <div className="container-dikirim">
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
            <div className="box-dikirim-pesanan">
              <div className="inside-box-dikirim-pesanan">
                <div className="tanggal-dikirim-pesanan">Jumat, 5 April 2022, 15:45</div>
                <div className="notifikasi-dikirim-pesanan"><div className="status-dikirim-pesanan">Sedang Pengiriman</div></div>
                <div className="garis-dikirim-pesanan-1"></div>
                <div className="foto-dikirim-pesanan">
                  <img src="" alt="" className="foto-produk-dikirim"/>
                </div>
                <div className="nama-obat-dikirim-pesanan">Bisolvon 8MG 4 Tablet</div>
                <div className="harga-obat-dikirim-pesanan">Rp13.000</div>
                <div className="jumlah-obat-dikirim-pesanan">1 Strip</div>
                <div className="button-tampilkan-detail-dikirim">Tampilkan Detail</div>
                <div className="keterangan-sub-total-dikirim">Sub Total</div>
                <div className="total-yang-dibayarkan">Rp22.000</div>
                <div className="garis-dikirim-2"></div>
                <div className="box-chat-cs-dikirim">
                  <span className="material-icons logo-cs-dikirim">textsms</span>
                  <div className="keterangan-chat-dikirim">Chat Customer Service</div>
                </div>
                <div className="konfirmasi-dikirim">Konfirmasi Terima Sebelum 12 April 2022, 15:45</div>
                <div className="button-dikirim">Pesanan Diterima</div>
              </div>
            </div>
            <button className="ml-5" id='btn-pagination'>1</button>
          </div>

           {/* CONTOH JIKA RESEP */}
          <div className='position-all-box'>
            <div className="box-dikirim-pesanan">
              <div className="inside-box-dikirim-pesanan">
                <div className="tanggal-dikirim-pesanan">Jumat, 5 April 2022, 15:45</div>
                <div className="notifikasi-dikirim-pesanan"><div className="status-dikirim-pesanan">Sedang Pengiriman</div></div>
                <div className="garis-dikirim-pesanan-1"></div>
                <div className="foto-dikirim-pesanan">
                  <img src="" alt="" className="foto-produk-dikirim"/>
                </div>
                <div className="nama-obat-dikirim-pesanan">Nomor Resep</div>
                <div className="harga-obat-dikirim-pesanan">Timer</div>
                <div className="jumlah-obat-dikirim-pesanan">#123abc456def</div>
                <div className="button-tampilkan-detail-dikirim">Tampilkan Detail</div>
                <div className="garis-dikirim-2-resep"></div>
                  <div className="box-chat-cs-dikirim-resep">
                    <div className="logo-cs-dikirim"><img src={Chat} alt="" width="24px" height="24px"/></div>
                    <div className="keterangan-chat-dikirim">Chat Customer Service</div>
                  </div>
                <div className="konfirmasi-dikirim-resep">Konfirmasi Terima Sebelum 12 April 2022, 15:45</div>
                <div className="button-dikirim-resep">Pesanan Diterima</div>
              </div>
            </div>
            <button className="ml-5" id='btn-pagination'>1</button>
          </div>
        </div>
    )
}

export default TabDikirim