import React, { useState } from "react";
import Chat from '../../../Assets/CHAT.svg';
import './MenungguPembayaran.css';


const MenungguPembayaran  = () => {
    return(
        <div className="container-menunggu-pembayaran">
            <div className="d-lg-none d-md-none d-block box-navbar-mobile-order">
                <span className="material-icons pinggiran-atas-menunggu-bayar">chevron_left</span>
                <div className="judul-menunggu-pembayaran">Menunggu Pembayaran</div>
            </div>
            <div className="judul-menunggu-pembayaran">Menunggu Pembayaran</div>
            <div className="box-batas-akhir-pembayaran">
                <div className="judul-page-batas-akhir-bayar">Batas Akhir Pembayaran</div>
                <div className="tanggal-batas-akhir-bayar">Kamis, 21 Maret 2022, 20:45 PM</div>
                <div className="timer-batas-akhir-bayar">Timer</div>
            </div>
            <div className="box-batas-akhir-pembayaran-2">
                <div className="judul-ringkasan-order">Ringkasan Order</div>
                <div className="garis-1-menunggu-order"></div>
                <div className="foto-order-obat"></div>
                <div className="nama-obat-ringkasan-order">Bisolvon 8MG 4 Tablet</div>
                <div className="jumlah-obat-ringkasan-order">1 Strip</div>
                <div className="harga-obat-ringkasan-order">Rp.13000</div>
                <div className="tampilkan-detail-ringkasan-order">Tampilkan Detail</div>
                <div className="garis-2-menunggu-order"></div>
                <div className="keterangan-sub-total-order">Sub Total</div>
                <div className="nominal-total-semua-order">Rp22.000 </div>
            </div>
            <div className="box-batas-akhir-pembayaran-3">
                <div className="nama-metode-pembayaran-order">BCA Virtual Account</div>
                <div className="logo-bca-order"></div>
                <div className="garis-box-3-order"></div>
                <div className="inside-box-1-order">
                    <div className="judul-nomor-va">Nomor Virtual Account</div>
                    <div className="nominal-va-order">80777082261130123</div>
                </div>
                <div className="tulisan-salin-va">Salin</div>
                <div className="logo-salin-va"><span className="material-icons">content_copy</span></div>
                <div className="inside-box-2-order">
                    <div className="judul-total-bayar-order">Total Pembayaran</div>
                    <div className="nominal-total-bayar-va">Rp. 22.000</div>
                </div>
            </div>
            <div className="button-ke-beranda-order">Kembali Ke Beranda</div>
            <div className="button-cek-status-bayar-order">Check Status Pembayaran</div>
            <div className="d-lg-none d-md-none d-block">
                <div className="logo-cs-order"><img src={Chat} alt="" width="24px" height="24px"/></div>
                <div className="keterangan-chat-order">Chat Customer Service</div>
            </div>
            <div className="garis-page-menunggu-pembayaran"></div>
            <div className="keterangan-cara-pembayaran">Cara Pembayaran</div>
            <div className="nama-atm-cara-pembayaran">ATM BCA</div>
            <div className="logo-atas-order"><span className="material-icons">expand_less</span></div>
            <div className="box-cara-pembayaran">
                <div>
                1. Masukkan Kartu ATM BCA dan PIN.
                <br></br>
                2. Pilih menu Transaksi Lainnya lalu Transfer dan menuju ke Rekening BCA Virtual Account.
                <br></br>
                3. Masukkan 5 angka kode perusahaan untuk Tokopedia (80777) dan Nomor HP yang kamu daftarkan di akun Tokopedia (Contoh: 80777081316951940).
                <br></br>
                4. Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai seperti No VA, Nama, Perus/Produk dan Total Tagihan.
                <br></br>
                5. Pastikan nama kamu dan Total Tagihannya benar.
                <br></br>
                6. Jika sudah benar, klik Ya.
                <br></br>
                7. Simpan struk transaksi sebagai bukti pembayaran.
                </div>
            </div>
            <div className="d-md-block d-lg-block d-none">
                <div className="garis-page-menunggu-pembayaran" style={{top: "1573px"}}></div>
                <div className="nama-atm-cara-pembayaran"  style={{top: "1609px"}}>m-BCA (BCA mobile)</div>
                <div className="logo-bawah-order"><span className="material-icons">expand_more</span></div>
                <div className="garis-page-menunggu-pembayaran" style={{top: "1665px"}}></div>
                <div className="nama-atm-cara-pembayaran"  style={{top: "1701px"}}>Internet Banking BCA</div>
                <div className="logo-bawah-order" style={{top: "1701px"}}><span className="material-icons">expand_more</span></div>
                <div className="garis-page-menunggu-pembayaran" style={{top: "1757px"}}></div>
                <div className="nama-atm-cara-pembayaran"  style={{top: "1793px"}}>Kantor Bank BCA</div>
                <div className="logo-bawah-order" style={{top: "1793px"}}><span className="material-icons">expand_more</span></div>
                <div className="garis-page-menunggu-pembayaran" style={{top: "1849px"}}></div>
            </div>
            <div className="d-md-none d-lg-none d-block">
                <div className="garis-page-menunggu-pembayaran" style={{top: "1300px"}}></div>
                <div className="nama-atm-cara-pembayaran"  style={{top: "1330px"}}>m-BCA (BCA mobile)</div>
                <div className="logo-bawah-order" style={{top: "1330px"}}><span className="material-icons">expand_more</span></div>
                <div className="garis-page-menunggu-pembayaran" style={{top: "1380px"}}></div>
                <div className="nama-atm-cara-pembayaran"  style={{top: "1410px"}}>Internet Banking BCA</div>
                <div className="logo-bawah-order" style={{top: "1410px"}}><span className="material-icons">expand_more</span></div>
                <div className="garis-page-menunggu-pembayaran" style={{top: "1460px"}}></div>
                <div className="nama-atm-cara-pembayaran"  style={{top: "1490px"}}>Kantor Bank BCA</div>
                <div className="logo-bawah-order" style={{top: "1490px"}}><span className="material-icons">expand_more</span></div>
                <div className="garis-page-menunggu-pembayaran" style={{top: "1540px"}}></div>
            </div>
        </div>
        
    )
}

export default MenungguPembayaran