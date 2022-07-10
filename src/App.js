import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
// USER
import Navbar from './Components/User/Navbar/Navbar.jsx';
import Footer from './Components/User/Footer/Footer.jsx';
import Login from './Pages/User/Login/Login.jsx';
import Register from './Pages/User/Register/Register.jsx';
import ResetPassword from './Pages/User/ResetPassword/ResetPassword.jsx';
import NewPassword from './Pages/User/NewPassword/NewPassword.jsx';
import Cart from './Pages/User/Cart/Cart.jsx';
import Checkout from './Pages/User/Checkout/Checkout.jsx';
import Verification from './Pages/User/Verification/Verification.jsx';
import Confirmation from './Pages/User/Confirmation/Confirmation.jsx';
import FormAddress from './Pages/User/FormAddress/FormAddress.jsx';
import Home from './Pages/User/Home/Home.jsx';
import OrderProcess from './Pages/User/OrderProcess/OrderProcess.jsx';
import ProductDetail from './Pages/User/ProductDetail/ProductDetail.jsx';
import ProductList from './Pages/User/ProductList/ProductList.jsx';
import Profile from './Pages/User/Profile/Profile.jsx';
import UploadResep from './Pages/User/UploadResep/UploadResep.jsx';
import UploadSuccess from './Pages/User/UploadSuccess/UploadSuccess.jsx';
import ChangePassword from './Pages/User/ChangePassword/ChangePassword.jsx';
import EditProfile from './Pages/User/EditProfile/EditProfile.jsx';
import AlamatProfile from './Pages/User/AlamatProfile/AlamatPageProfile.jsx';
import MenungguKonfirmasi from './Pages/User/MenungguKonfirmasi/MenungguKonfirmasi.jsx';
import MenungguPembayaran from './Pages/User/MenungguKonfirmasi/MenungguPembayaran.jsx';
import Favorite from './Pages/User/Favorite/FavoritePage.jsx';
import MetodePembayaran from './Pages/User/MetodePembayaran/MetodePembayaranPage.jsx';
import Dibatalkan from './Components/User/ProsesPemesanan/Dibatalkan/TabDibatalkan.jsx';
import Dikirim from './Components/User/ProsesPemesanan/Dikirim/TabDikirim.jsx';
import Diproses from './Components/User/ProsesPemesanan/Diproses/TabDiproses.jsx';
import Ditunggu from './Components/User/ProsesPemesanan/Ditunggu/TabDitunggu.jsx';
import Selesai from './Components/User/ProsesPemesanan/Selesai/TabSelesai.jsx';
import SemuaPesanan from './Components/User/ProsesPemesanan/SemuaPesanan/SemuaPesanan.jsx';


// ADMIN
import LoginAdmin from './Pages/Admin/LoginAdmin/LoginAdmin.jsx';
import Dashboard from './Pages/Admin/Dashboard/Dashboard.jsx';
import DaftarProduk from './Pages/Admin/DaftarProduk/DaftarProduk.jsx';
import KartuStok from './Pages/Admin/KartuStok/KartuStok.jsx';



// Redux
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import allReducer from './Redux/Reducers/Index.js';

const store = createStore(allReducer, applyMiddleware(thunk));

function App() {
  const location = useLocation();

  return (
    <>
      <Provider store={store}>
        {location.pathname === '/login' || location.pathname === '/register'|| location.pathname === '/kartustok/:id'  || location.pathname === '/homeadmin' || location.pathname === '/daftarprodukadmin' || location.pathname === '/newpassword' || location.pathname === '/loginadmin' || location.pathname === '/resetpassword' ? null : <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/newpassword/:token" element={<NewPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/confirmation/:token" element={<Confirmation />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/FormAddress" element={<FormAddress />} />
          <Route path="/OrderProcess" element={<OrderProcess />} />
          <Route path="/ProductDetail/:id" element={<ProductDetail />} />
          <Route path="/kategori/:kategori" element={<ProductList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/uploadresep" element={<UploadResep />} />
          <Route path="/uploadresepsuccess" element={<UploadSuccess />} />
          <Route path="/loginadmin" element={<LoginAdmin />} />
          <Route path="/homeadmin" element={<Dashboard />} />
          <Route path="/daftarprodukadmin" element={<DaftarProduk />} />
          <Route path="/kartustok/:id" element={<KartuStok />} />
          <Route path="/alamatpengiriman" element={<AlamatProfile />} />
          <Route path="/menunggukonfirmasi" element={<MenungguKonfirmasi />} />
          <Route path="/menunggupembayaran" element={<MenungguPembayaran />} />
          <Route path="/metodepembayaran" element={<MetodePembayaran />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/dibatalkan" element={<Dibatalkan />} />
          <Route path="/dikirim" element={<Dikirim />} />
          <Route path="/diproses" element={<Diproses />} />
          <Route path="/ditunggu" element={<Ditunggu />} />
          <Route path="/selesai" element={<Selesai/>} />
          <Route path="/semuapesanan" element={<SemuaPesanan />} />
         
        </Routes>
        {location.pathname === '/login' || location.pathname === '/daftarprodukadmin' || location.pathname === '/kartustok/:id' || location.pathname === '/homeadmin' || location.pathname === '/register' || location.pathname === '/newpassword' || location.pathname === '/loginadmin'  || location.pathname === '/resetpassword' ? null : <Footer />}
      </Provider>
    </>
  );
}

export default App;
