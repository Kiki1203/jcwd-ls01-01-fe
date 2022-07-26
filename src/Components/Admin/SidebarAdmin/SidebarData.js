import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPills, faReceipt, faAngleDown, faAngleUp, faChartLine } from '@fortawesome/free-solid-svg-icons';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/homeadmin',
    icons: <FontAwesomeIcon icon={faHouse} className="sefruit-font-size-20 sefruit-main-dark" />,
  },
  {
    title: 'Produk',
    icons: <FontAwesomeIcon icon={faPills} className="sefruit-font-size-20 sefruit-main-dark" />,
    iconClosed: <FontAwesomeIcon icon={faAngleDown} className="sefruit-font-size-20 sefruit-main-dark" />,
    iconOpened: <FontAwesomeIcon icon={faAngleUp} className="sefruit-font-size-20 sefruit-main-dark" />,

    subNav: [
      {
        title: 'Daftar Produk',
        path: '/daftarprodukadmin',
      }
    ],
  },
  {
    title: 'Transaksi',
    icons: <FontAwesomeIcon icon={faReceipt} className="sefruit-font-size-20 sefruit-main-dark" />,
    iconClosed: <FontAwesomeIcon icon={faAngleDown} className="sefruit-font-size-20 sefruit-main-dark" />,
    iconOpened: <FontAwesomeIcon icon={faAngleUp} className="sefruit-font-size-20 sefruit-main-dark" />,

    subNav: [
      {
        title: 'Semua Pesanan',
        path: '/transaksiadmin/semua-pesanan',
        className: 'sub-nav'
      },
      {
        title: 'Resep Baru',
        path: '/transaksiadmin/resep-baru',
        className: 'sub-nav'
      },
      {
        title: 'Menunggu Checkout',
        path: '/transaksiadmin/menunggu-checkout',
        className: 'sub-nav'
      },
      {
        title: 'Menunggu Bukti Pembayaran',
        path: '/transaksiadmin/menunggu-bukti-pembayaran',
        className: 'sub-nav'
      },
      {
        title: 'Cek Bukti Pembayaran',
        path: '/transaksiadmin/cek-bukti-pembayaran',
        className: 'sub-nav'
      },
      {
        title: 'Pesanan Diproses',
        path: '/transaksiadmin/pesanan-diproses',
        className: 'sub-nav'
      },
      {
        title: 'Dalam Pengiriman',
        path: '/transaksiadmin/dalam-pengiriman',
        className: 'sub-nav'
      },
      {
        title: 'Pesanan Selesai',
        path: '/transaksiadmin/pesanan-selesai',
        className: 'sub-nav'
      },
      {
        title: 'Pesanan Dibatalkan',
        path: '/transaksiadmin/pesanan-dibatalkan',
        className: 'sub-nav'
      }
    ]
  },
  {
    title: 'Sales & Revenue',
    icons: <FontAwesomeIcon icon={faChartLine} className="sefruit-font-size-20 sefruit-main-dark" />,
    iconClosed: <FontAwesomeIcon icon={faAngleDown} className="sefruit-font-size-20 sefruit-main-dark" />,
    iconOpened: <FontAwesomeIcon icon={faAngleUp} className="sefruit-font-size-20 sefruit-main-dark" />,

    subNav: [
      {
        title: 'Ringkasan Statistik',
        path: '/ringkasanstatistik',
      },
      {
        title: 'Buku Kas',
        path: '/bukukas',
      },
      {
        title: 'Laba dan Rugi',
        path: '/labarugi',
      },
    ],
  },
];
