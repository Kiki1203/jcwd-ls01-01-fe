import React, { useState } from "react";
import './SemuaPesanan.css';
import TemplateProsesPemesanan from "../TemplateProsesPemesanan";
import Chat from '../../../../Assets/CHAT.svg';

// PAGE INI MENAMPILKAN SEMUA PROSES PESANAN USER
const SemuaPesanan  = () => {
    
    
    return(
        <div className="container-semua-pesanan">
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
            <div className="box-semua-pesanan">
              <div className="inside-box-semua-pesanan">
                <div className="tanggal-semua-pesanan">Jumat, 5 April 2022, 15:45</div>
                {/* Keterangan disini sesuai dari tranksaksi yang dilakukan user */}
                <div className="notifikasi-semua-pesanan"><div className="status-semua-pesanan">Menunggu Konfirmasi</div></div>
                <div className="garis-semua-pesanan-1"></div>
                <div className="foto-semua-pesanan">
                  <img src="" alt="" className="foto-produk-semua"/>
                </div>
                <div className="nama-obat-semua-pesanan">Bisolvon 8MG 4 Tablet</div>
                <div className="harga-obat-semua-pesanan">Rp13.000</div>
                <div className="jumlah-obat-semua-pesanan">1 Strip</div>
                <div className="button-tampilkan-detail-semua">Tampilkan Detail</div>
                <div className="keterangan-sub-total-semua">Sub Total</div>
                <div className="total-yang-dibayarkan">Rp22.000</div>
                <div className="garis-semua-2"></div>
                <div className="box-chat-cs-semua">
                  <div className="logo-cs-semua"><img src={Chat} alt="" width="24px" height="24px"/></div>
                  <div className="keterangan-chat-semua">Chat Customer Service</div>
                </div>
                <div className="belum-bayar-semua">Bayar Sebelum 6 April 2022, 15:45</div>
                <div className="button-bayar-sekarang-semua">Bayar Sekarang</div>
              </div>
            </div>
            <button className="ml-5" id='btn-pagination'>1</button>
          </div>

           {/* CONTOH JIKA RESEP */}
          <div className='position-all-box'>
            <div className="box-semua-pesanan">
              <div className="inside-box-semua-pesanan">
                <div className="tanggal-semua-pesanan">Jumat, 5 April 2022, 15:45</div>
                <div className="notifikasi-semua-pesanan"><div className="status-semua-pesanan">Menunggu Konfirmasi</div></div>
                <div className="garis-semua-pesanan-1"></div>
                <div className="foto-semua-pesanan">
                  <img src="" alt="" className="foto-produk-semua"/>
                </div>
                <div className="nama-obat-semua-pesanan">Nomor Resep</div>
                <div>TIMER</div>
                <div className="jumlah-obat-semua-pesanan">#123abc456def</div>
                <div className="button-tampilkan-detail-semua">Tampilkan Detail</div>
                <div className="garis-semua-2-resep"></div>
                  <div className="box-chat-cs-semua-resep">
                    <div className="logo-cs-semua"><img src={Chat} alt="" width="24px" height="24px"/></div>
                    <div className="keterangan-chat-semua">Chat Customer Service</div>
                  </div>
                <div className="belum-bayar-semua-resep">Bayar Sebelum 6 April 2022, 15:45</div>
                <div className="button-bayar-sekarang-semua-resep">Bayar Sekarang</div>
              </div>
            </div>
            <button className="ml-5" id='btn-pagination'>1</button>
          </div>
        </div>
    )
}

export default SemuaPesanan