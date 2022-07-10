import React, { useState } from "react";
import './TabDitunggu.css';
import TemplateProsesPemesanan from "../TemplateProsesPemesanan";
import Chat from '../../../../Assets/CHAT.svg';


const TabDitunggu  = () => {
    
    
    return(
        <div className="container-ditunggu">
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
            <div className="box-menunggu-pesanan">
              <div className="inside-box-menunggu-pesanan">
                <div className="tanggal-menunggu-pesanan">Jumat, 5 April 2022, 15:45</div>
                <div className="notifikasi-menunggu-pesanan"><div className="status-menunggu-pesanan">Menunggu Konfirmasi</div></div>
                <div className="garis-menunggu-pesanan-1"></div>
                <div className="foto-menunggu-pesanan">
                  <img src="" alt="" className="foto-produk-menunggu"/>
                </div>
                <div className="nama-obat-menunggu-pesanan">Bisolvon 8MG 4 Tablet</div>
                <div>TIMER</div>
                <div className="harga-obat-menunggu-pesanan">Rp13.000</div>
                <div className="jumlah-obat-menunggu-pesanan">1 Strip</div>
                <div className="button-tampilkan-detail-menunggu">Tampilkan Detail</div>
                <div className="keterangan-sub-total-menunggu">Sub Total</div>
                <div className="total-yang-dibayarkan">Rp22.000</div>
                <div className="garis-menunggu-2"></div>
                <div className="box-chat-cs-menunggu">
                  <span className="material-icons logo-cs-menunggu">textsms</span>
                  <div className="keterangan-chat-menunggu">Chat Customer Service</div>
                </div>
                <div className="belum-bayar-menunggu">Bayar Sebelum 6 April 2022, 15:45</div>
                <div className="button-bayar-sekarang-menunggu">Bayar Sekarang</div>
              </div>
            </div>
            <button className="ml-5" id='btn-pagination'>1</button>
          </div>

           {/* CONTOH JIKA RESEP */}
          <div className='position-all-box'>
            <div className="box-menunggu-pesanan">
              <div className="inside-box-menunggu-pesanan">
                <div className="tanggal-menunggu-pesanan">Jumat, 5 April 2022, 15:45</div>
                <div className="notifikasi-menunggu-pesanan"><div className="status-menunggu-pesanan">Menunggu Konfirmasi</div></div>
                <div className="garis-menunggu-pesanan-1"></div>
                <div className="foto-menunggu-pesanan">
                  <img src="" alt="" className="foto-produk-menunggu"/>
                </div>
                <div className="nama-obat-menunggu-pesanan">Nomor Resep</div>
                <div>TIMER</div>
                <div className="jumlah-obat-menunggu-pesanan">#123abc456def</div>
                <div className="button-tampilkan-detail-menunggu">Tampilkan Detail</div>
                <div className="garis-menunggu-2-resep"></div>
                  <div className="box-chat-cs-menunggu-resep">
                    <div className="logo-cs-menunggu"><img src={Chat} alt="" width="24px" height="24px"/></div>
                    <div className="keterangan-chat-menunggu">Chat Customer Service</div>
                  </div>
                <div className="belum-bayar-menunggu-resep">Bayar Sebelum 6 April 2022, 15:45</div>
                <div className="button-bayar-sekarang-menunggu-resep">Bayar Sekarang</div>
              </div>
            </div>
            <button className="ml-5" id='btn-pagination'>1</button>
          </div>
        </div>
    )
}

export default TabDitunggu