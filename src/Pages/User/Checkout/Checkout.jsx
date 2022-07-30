import React, { useState, useEffect } from 'react';
import './Checkout.css';
import axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import PaymentMethod from '../../../Components/User/PaymentMethod/PaymentMethod.jsx';
import ChangeAddress from '../../../Components/User/ChangeAddress/ChangeAddress.jsx';
import PulseLoader from 'react-spinners/PulseLoader';
import { useSelector } from 'react-redux';
const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [berat1, setBerat] = useState('');
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedKurir, setSelectedKurir] = useState(null);
  const [selectedPaymentMtd, setSelectedPaymentMtd] = useState(null);
  const [kurirOpen, setKurirOpen] = useState(false);
  const [openMdlAlamat, setOpenMdlAlamat] = useState(false);
  const [openMdlPembayaran, setOpenMdlPembayaran] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingbutton, setLoadingButton] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [arraykurir, setArraykurir] = useState([]);
  const token = localStorage.getItem('myTkn');
  const navigate = useNavigate();
  const params = useParams();
  const jenisTransaksi = params.jenis;
  const { state } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  let idTransaksi = searchParams.get('id');
  const verified = useSelector(state => state.user.isConfirmed)

  useEffect(() => {
    setLoading(true)
    if (!token) {
      navigate('/');
    } else if (verified === 0){
      navigate('/verification')
    }
    setError(false)
    
  }, [])

  useEffect(() => {
    setLoading(true);
    setError(false);
    if (jenisTransaksi === 'beli-langsung') {
      axios
        .get(`${API_URL}/transaction/getcheckoutdatabeli?productId=${state?.productId}&quantity=${state?.quantity}`, { headers: { authorization: token } })
        .then((res) => {
          setLoading(false);
          setProducts([...res.data.product]);
          setAddresses([...res.data.alamat]);
          setSelectedAddress(res.data.alamat.find((item) => item.alamat_utama === 1));
        })
        .catch((e) => {
          setLoading(false);
          setError(true);
          setErrorMsg(e.message);
        });
    } else if (jenisTransaksi === 'produk-bebas') {
      axios
        .get(`${API_URL}/transaction/getcheckoutdata`, { headers: { authorization: token } })
        .then((res) => {
          setLoading(false);
          setProducts([...res.data.products]);
          setAddresses([...res.data.alamat]);
          setSelectedAddress(res.data.alamat.find((item) => item.alamat_utama === 1));
        })
        .catch((e) => {
          setLoading(false);
          setError(true);
          setErrorMsg(e.message);
        });
    } else if (jenisTransaksi.includes('resep')) {
      axios
        .get(`${API_URL}/transaction/getcheckoutdataresep?id=${idTransaksi}`, { headers: { authorization: token } })
        .then((res) => {
          setLoading(false);
          setProducts([...res.data.products]);
          setAddresses([...res.data.alamat]);
          let mainAddress = res.data.alamat.find((item) => item.alamat_utama === 1);
          mainAddress ? setSelectedAddress(mainAddress) : setSelectedAddress(res.data.alamat[0]);
        })
        .catch((e) => {
          setLoading(false);
          setError(true);
          setErrorMsg(e.message);
        });
    }
  }, []);

  useEffect(() => {
    let berat2 = 0;

    for (let index = 0; index < products.length; index++) {
      berat2 += products[index].berat * products[index].quantity;
    }
    setBerat(berat2);
  }, [products]);

  useEffect(() => {
    if (berat1 > 0) {
      setLoadingButton(true);
      axios
        .get(`${API_URL}/rajaongkir/getCost`, { headers: { authorization: token, berat: berat1, kota: selectedAddress.id_kabupaten_kota } })
        .then((res) => {
          setLoadingButton(false);
          let hasilOngkir = [];
          res.data.dataOngkir.jne.forEach((element) => {
            let data = { nama: 'JNE', etd: '', tarif: 0 };
            data.nama += ` ${element.service}`;
            data.etd = element.cost[0].etd;
            data.tarif = element.cost[0].value;
            hasilOngkir.push(data);
          });
          res.data.dataOngkir.pos.forEach((element) => {
            let data = { nama: 'POS', etd: '', tarif: 0 };
            data.nama += ` ${element.service}`;
            data.etd = element.cost[0].etd.split('')[0];
            data.tarif = element.cost[0].value;
            hasilOngkir.push(data);
          });
          res.data.dataOngkir.tiki.forEach((element) => {
            let data = { nama: 'TIKI', etd: '', tarif: 0 };
            data.nama += ` ${element.service}`;
            data.etd = element.cost[0].etd;
            data.tarif = element.cost[0].value;
            hasilOngkir.push(data);
          });

          setArraykurir(hasilOngkir);
          setLoadingButton(false);
        })
        .catch((err) => {
          setLoadingButton(false);
          console.log(err);
        });
    }
  }, [selectedAddress, berat1]);

  const totalHargaFunc = () => {
    let total = 0;
    products.forEach((p) => {
      p.diskon ? (total += p.diskon * p.quantity) : (total += p.harga * p.quantity);
    });
    return total;
  };

  const totalQtyFunc = () => {
    let total = 0;
    products.forEach((p) => {
      total += Number(p.quantity);
    });
    return total;
  };

  return (
    <div style={{ position: 'relative', width: '100vw', overflowX: 'hidden' }}>
      <div id="corner-gradient" />
      {openMdlPembayaran && (
        <PaymentMethod
          total={totalHargaFunc() + selectedKurir.tarif}
          setOpenModal={setOpenMdlPembayaran}
          selected={selectedPaymentMtd}
          setSelected={setSelectedPaymentMtd}
          products={products}
          address={selectedAddress}
          jenis={jenisTransaksi}
          kurir={selectedKurir}
        />
      )}
      {openMdlAlamat && <ChangeAddress addresses={addresses} setOpenModal={setOpenMdlAlamat} selected={selectedAddress} setSelected={setSelectedAddress} setSelectedKurir={setSelectedKurir} />}
      <div id="page-container">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="d-flex justify-content-between" style={{ minWidth: '1100px' }}>
            <div>
              <div className="produk-keranjang-container">
                <p style={{ fontSize: '20px', fontWeight: '700', color: '#213360' }}>Alamat Pengiriman</p>
                <div style={{ padding: '20px 0px', borderTop: '2px solid #D5D7DD', borderBottom: '2px solid #D5D7DD' }}>
                  <div className="d-flex justify-content-between">
                    <p style={{ fontSize: '14px', fontWeight: '700', color: '#213360' }}>{`${selectedAddress.nama_depan_penerima} ${selectedAddress.nama_belakang_penerima}, ${selectedAddress.no_hp}`}</p>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: '#E0004D', cursor: 'pointer' }} onClick={() => setOpenMdlAlamat(true)}>
                      Pilih Alamat Lain
                    </p>
                  </div>
                  <p style={{ fontSize: '14px', color: '#213360', margin: '0px' }}>{selectedAddress.label_alamat}</p>
                  <p style={{ fontSize: '14px', color: '#4F618E', margin: '0px 100px 0px 0px' }}>{`${selectedAddress.alamat}, ${selectedAddress.kabupaten_kota}, ${selectedAddress.provinsi}, ${selectedAddress.kode_pos}`}</p>
                </div>
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#213360', marginTop: '20px', marginBottom: '0px' }}>Pilih jasa pengiriman:</p>
                <div style={{ position: 'relative' }}>
                  <div className="custom-select-checkout" style={{ borderRadius: kurirOpen && '10px 10px 0px 0px' }} onClick={() => setKurirOpen(!kurirOpen)}>
                    {loadingbutton ? (
                      <div type="button" disabled>
                        <PulseLoader color={'#FFFFFF'} cssOverride={{ borderColor: 'white', margin: '0 auto' }} size={10} />
                      </div>
                    ) : (
                      <div>
                        {selectedKurir ? selectedKurir.nama : 'Pengiriman'}
                        <FontAwesomeIcon icon={faAngleDown} style={{ position: 'absolute', top: '12px', right: '20px' }} />
                      </div>
                    )}
                  </div>
                  {kurirOpen && (
                    <div className={`options-container`}>
                      {arraykurir.map((kurir) => {
                        return (
                          <div
                            className="kurir-option"
                            onClick={() => {
                              setSelectedKurir(kurir);
                              setKurirOpen(false);
                            }}
                          >
                            <div>
                              <p className="kurir-nama">{kurir.nama}</p>
                              <p className="kurir-etd">{`Estimasi tiba dalam ${kurir.etd} hari`}</p>
                            </div>
                            <p className="kurir-tarif">{`Rp${kurir.tarif.toLocaleString('de-DE', { minimumFractionDigits: 0 })}`}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className="produk-keranjang-container">
                <p style={{ fontSize: '20px', fontWeight: '700', color: '#213360' }}>Ringkasan Order</p>
                {products.map((product) => {
                  return (
                    <div style={{ borderTop: '2px solid #D5D7DD' }} key={product.produkId}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <img className="gambar-produk-keranjang" src={`${API_URL}/${product.gambar}`} onClick={() => navigate(`/productdetail/${product.produkId}`)} alt="" />
                          <div>
                            <p className="nama-produk-keranjang" onClick={() => navigate(`/productdetail/${product.produkId}`)}>
                              {product.namaObat}
                            </p>
                            <p className="quantity-produk-keranjang">{`${product.quantity} ${product.satuanObat} (${product.berat * product.quantity} gr)`}</p>
                          </div>
                        </div>
                        <p className="harga-produk-keranjang">{'Rp' + ((product.diskon ? product.diskon : product.harga) * product.quantity).toLocaleString('de-DE', { minimumFractionDigits: 0 })}</p>
                      </div>
                    </div>
                  );
                })}
                <div className="d-flex justify-content-between" style={{ borderTop: '2px solid #D5D7DD' }}>
                  <p style={{ margin: '20px 0px 0px 140px', color: '#213360' }}>Subtotal</p>
                  <p className="harga-produk-keranjang" style={{ margin: '20px 0px 0px' }}>
                    {`Rp${totalHargaFunc().toLocaleString('de-DE', { minimumFractionDigits: 0 })}`}
                  </p>
                </div>
              </div>
            </div>
            <div id="tab-total" style={{ height: '410px' }}>
              <p className="header-total" style={{ marginBottom: '20px' }}>
                Ringkasan Belanja
              </p>
              <div className="d-flex justify-content-between">
                <p className="detail-ringkasan">{`Subtotal (${totalQtyFunc()} Produk)`}</p>
                <p className="detail-ringkasan">
                  <b>{`Rp${totalHargaFunc().toLocaleString('de-DE', { minimumFractionDigits: 0 })}`}</b>
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="detail-ringkasan">Biaya Pengiriman</p>
                <p className="detail-ringkasan">
                  <b>{`Rp${selectedKurir ? selectedKurir.tarif.toLocaleString('de-DE', { minimumFractionDigits: 0 }) : 0}`}</b>
                </p>
              </div>
              <div className="total-harga-container-checkout">
                <p className="total-harga">Total</p>
                <p className="total-harga" style={{ color: '#E0004D' }}>{`Rp${(totalHargaFunc() + (selectedKurir ? selectedKurir.tarif : 0)).toLocaleString('de-DE', { minimumFractionDigits: 0 })}`}</p>
              </div>
              <p className="header-total">Metode Pembayaran</p>
              <p style={{ fontSize: '12px', color: '#4F618E', margin: '10px 0 0' }}>Sebelum memilih metode pembayaran, pastikan Anda telah memilih jasa pengiriman.</p>
              <button className="button-bayar" disabled={selectedKurir === null} style={{ marginTop: '20px', fontSize: '14px', padding: '15px' }} onClick={() => setOpenMdlPembayaran(true)}>
                {`Pilih Metode Pembayaran`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
