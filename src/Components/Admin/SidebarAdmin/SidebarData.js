import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPills, faReceipt, faAngleDown, faAngleUp, faChartLine} from '@fortawesome/free-solid-svg-icons'

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/homeadmin',
    icons:  <FontAwesomeIcon icon={faHouse} className='sefruit-font-size-20 sefruit-main-dark' />,
  },
  {
    title: 'Produk',
    icons:  <FontAwesomeIcon icon={faPills} className='sefruit-font-size-20 sefruit-main-dark' />,
    iconClosed:  <FontAwesomeIcon icon={faAngleDown} className='sefruit-font-size-20 sefruit-main-dark' />,
    iconOpened:  <FontAwesomeIcon icon={faAngleUp} className='sefruit-font-size-20 sefruit-main-dark' />,

    subNav: [
      {
        title: 'Daftar Produk',
        path: '/daftarprodukadmin',
        
      },
      {
        title: 'Tambah Produk',
        path: '/tambahproduk',
      }
    ]
  },
  {
    title: 'Transaksi',
    icons:  <FontAwesomeIcon icon={faReceipt} className='sefruit-font-size-20 sefruit-main-dark' />,
    iconClosed:  <FontAwesomeIcon icon={faAngleDown} className='sefruit-font-size-20 sefruit-main-dark' />,
    iconOpened:  <FontAwesomeIcon icon={faAngleUp} className='sefruit-font-size-20 sefruit-main-dark' />,
  
    subNav: [
      {
        title: 'Semua Pesanan',
        path: '/transaksiadmin/semua-pesanan',
        className: 'sub-nav'
      },
      {
        title: 'Pesanan Baru',
        path: '/transaksiadmin/pesanan-baru',
        className: 'sub-nav'
      },
      {
        title: 'Siap Dikirim',
        path: '/transaksiadmin/siap-dikirim',
      },
      {
        title: 'Dalam Pengiriman',
        path: '/transaksiadmin/dalam-pengiriman',
      },
      {
        title: 'Selesai',
        path: '/transaksiadmin/selesai',
      },
      {
        title: 'Dibatalkan',
        path: '/transaksiadmin/dibatalkan',
      }
    ]
  },
  {
    title: 'Sales & Revenue',
    icons:  <FontAwesomeIcon icon={faChartLine} className='sefruit-font-size-20 sefruit-main-dark' />,
    iconClosed:  <FontAwesomeIcon icon={faAngleDown} className='sefruit-font-size-20 sefruit-main-dark' />,
    iconOpened:  <FontAwesomeIcon icon={faAngleUp} className='sefruit-font-size-20 sefruit-main-dark' />,

    subNav: [
      {
        title: 'Ringkasan Statistik',
        path: '/',
      },
      {
        title: 'Buku Kas',
        path: '/',
      },
      {
        title: 'Laba dan Rugi',
        path: '/',
      }
    ]
  }
];