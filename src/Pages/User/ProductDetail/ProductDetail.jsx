import React from 'react';
import './ProductDetail.css';
import ProductCardSmall from '../../../Components/User/ProductCardSmall/ProductCardSmall.jsx';
import CartModal from '../../../Components/User/CartModal/CartModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faShareNodes, faMinus, faPlus, faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import { useEffect, useState } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';

function ProductDetail(props) {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState('deskripsi');
  const [qty, setQty] = useState(1);
  let params = useParams();
  const productId = params.id;
  const token = localStorage.getItem('myTkn');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(false);
    const fetchData = async () => {
      await axios
        .get(`${API_URL}/product/productdetail?id=${productId}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
        .then((res) => {
          setProduct({ ...res.data });
        })
        .catch((e) => {
          setLoading(false);
          setError(true);
          setErrorMsg(e.message);
        });
    };
    fetchData();
  }, [productId]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    if (Object.keys(product).length !== 0) {
      axios
        .get(`${API_URL}/product/relatedproducts?id=${productId}&keluhanid=${product.keluhanId}&golonganobatid=${product.golonganObatId}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
        .then((res) => {
          setRelatedProducts([...res.data]);
          setLoading(false);
          console.log(relatedProducts);
        })
        .catch((e) => {
          setLoading(false);
          setError(true);
          setErrorMsg(e.message);
        });
    }
  }, [product]);

  const addToCart = () => {
    if (!token) {
      navigate('/login');
    } else {
      axios
        .post(
          `${API_URL}/transaction/addtocart`,
          {
            productId: product.id,
            quantity: qty,
          },
          { headers: { authorization: token } }
        )
        .then((res) => {
          setOpenModal(true);
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error!',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'Okay!',
          });
        });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', overflowX: 'hidden' }}>
      <div id="corner-gradient" />
      {openModal && <CartModal product={product} setOpenModal={setOpenModal} />}
      <div id="page-container">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <div className="d-flex">
              <div>
                <img id="product-image" src={`${API_URL}/${product.gambar}`} alt="" />
                <div className="d-flex mt-4">
                  <button className="left-button">
                    <FontAwesomeIcon icon={faCommentDots} className="button-icon" />
                    Chat Admin
                  </button>
                  <button className="left-button" style={{ marginLeft: '10px' }}>
                    <FontAwesomeIcon icon={faShareNodes} className="button-icon" />
                    Bagikan
                  </button>
                </div>
              </div>
              <div id="right-side">
                <p id="kategori-obat">{product.kategoriObat}</p>
                <p id="nama-obat">{product.namaObat}</p>
                <div className="d-flex align-items-center">
                  <p id="harga-obat">{`Rp${product.harga.toLocaleString('de-DE', { minimumFractionDigits: 0 })}`}</p>
                  <p id="satuan-obat">{`/  ${product.satuanObat}`}</p>
                </div>
                {product.butuhResep === 'Ya' ? (
                  <div style={{ marginTop: '20px' }}>
                    <span id="butuh-resep">Pembelian produk ini membutuhkan resep dokter.</span>
                  </div>
                ) : (
                  <div className="d-flex align-items-center mt-2">
                    <button id="qty-button-left" disabled={qty === 1} onClick={() => setQty(qty - 1)}>
                      <FontAwesomeIcon icon={faMinus} className="qty-icon" />
                    </button>
                    <input
                      type="number"
                      value={qty}
                      id="qty-number"
                      onChange={(e) => {
                        if (e.target.value.length !== 0) {
                          setQty(e.target.valueAsNumber);
                        }
                      }}
                    />
                    <button id="qty-button-right" disabled={qty >= product.stok} onClick={() => setQty(qty + 1)}>
                      <FontAwesomeIcon icon={faPlus} className="qty-icon" />
                    </button>
                    <p id="sisa-produk">{`Sisa ${product.stok} ${product.satuanObat}`}</p>
                  </div>
                )}
                {qty > product.stok && <p style={{ color: '#E0004D', marginTop: '10px', fontSize: '14px' }}>Jumlah produk melebihi stok, tolong dikurangi, ya!</p>}
                <div className="d-flex" style={{ marginTop: '40px' }}>
                  {product.butuhResep === 'Ya' ? (
                    <button id="button-beli" style={{ marginLeft: '0px' }}>
                      Upload Resep
                    </button>
                  ) : (
                    <>
                      <button id="button-keranjang" disabled={qty > product.stok} onClick={() => addToCart()}>
                        <FontAwesomeIcon icon={faCartShopping} style={{ marginRight: '20px', fontSize: '18px' }} />
                        Keranjang
                      </button>
                      <button id="button-beli" disabled={qty > product.stok} onClick={() => navigate("/checkout/beli-langsung", { state: { productId: productId, quantity: qty } })}>
                        Beli
                      </button>
                    </>
                  )}
                  <button id="button-favorit">
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </div>
                <div id="box-deskripsi">
                  <div className="d-flex">
                    <div className={'header-tab ' + (activeTab === 'deskripsi' && 'header-tab-highlight')} onClick={() => setActiveTab('deskripsi')}>
                      Deskripsi
                    </div>
                    <div className={'header-tab ' + (activeTab === 'caraPakai' && 'header-tab-highlight')} onClick={() => setActiveTab('caraPakai')}>
                      Cara Pakai
                    </div>
                    <div className={'header-tab ' + (activeTab === 'peringatan' && 'header-tab-highlight')} onClick={() => setActiveTab('peringatan')}>
                      Peringatan
                    </div>
                  </div>
                  <div id="deskripsi" className={activeTab === 'deskripsi' && 'd-block'}>
                    <div className="deskripsi-row">
                      <p className="deskripsi-title">Indikasi / Kegunaan</p>
                      <p className="deskripsi-content">{product.indikasi}</p>
                    </div>
                    <div className="deskripsi-row">
                      <p className="deskripsi-title">Kandungan / Komposisi</p>
                      <p className="deskripsi-content">{product.komposisi}</p>
                    </div>
                    <div className="deskripsi-row">
                      <p className="deskripsi-title">Kemasan</p>
                      <p className="deskripsi-content">{product.kemasan}</p>
                    </div>
                    <div className="deskripsi-row">
                      <p className="deskripsi-title">Golongan</p>
                      <p className="deskripsi-content">{product.golonganObat}</p>
                    </div>
                    <div className="deskripsi-row">
                      <p className="deskripsi-title">Butuh Resep</p>
                      <p className="deskripsi-content">{product.butuhResep}</p>
                    </div>
                    <div className="deskripsi-row">
                      <p className="deskripsi-title">Cara Penyimpanan</p>
                      <p className="deskripsi-content">{product.caraPenyimpanan}</p>
                    </div>
                    <div className="deskripsi-row">
                      <p className="deskripsi-title">Principal</p>
                      <p className="deskripsi-content">{product.principal}</p>
                    </div>
                    <div className="deskripsi-row" style={{ borderBottom: 'none' }}>
                      <p className="deskripsi-title">Nomor Izin Edar (NIE)</p>
                      <p className="deskripsi-content">{product.nie}</p>
                    </div>
                  </div>
                  <div className={'deskripsi-paragraf ' + (activeTab === 'caraPakai' && 'd-block')}>{product.caraPakai}</div>
                  <div className={'deskripsi-paragraf ' + (activeTab === 'peringatan' && 'd-block')}>{product.peringatan}</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '70px', borderTop: '2px solid #D5D7DD' }}>
              <p id="produk-terkait">Produk Terkait</p>
              <div className="d-flex justify-content-between">
                {relatedProducts.map((product, index) => {
                  return <ProductCardSmall key={product.id} product={product} />;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
