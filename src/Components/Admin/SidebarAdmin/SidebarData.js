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
      },
      {
        title: 'Tambah Produk',
        path: '/tambahproduk',
      },
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
        path: '/',
        className: 'sub-nav',
      },
      {
        title: 'Pesanan Baru',
        path: '/',
        className: 'sub-nav',
      },
      {
        title: 'Siap Dikirim',
        path: '/',
      },
      {
        title: 'Dalam Pengiriman',
        path: '/',
      },
      {
        title: 'Selesai',
        path: '/',
      },
      {
        title: 'Dibatalkan',
        path: '/',
      },
    ],
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
        path: '/',
      },
      {
        title: 'Laba dan Rugi',
        path: '/',
      },
    ],
  },
];
