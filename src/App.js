import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Navbar/Navbar.jsx';
// import Footer from './Components/Footer/Footer.jsx';
import Login from './Pages/Login/Login.jsx';
import Register from './Pages/Register/Register.jsx';
import ResetPassword from './Pages/ResetPassword/ResetPassword.jsx';
import Cart from './Pages/Cart/Cart.jsx';
import Checkout from './Pages/Checkout/Checkout.jsx';
import Confirmation from './Pages/Confirmation/Confirmation.jsx';
import FormAddress from './Pages/FormAddress/FormAddress.jsx';
import Home from './Pages/Home/Home.jsx';
import OrderProcess from './Pages/OrderProcess/OrderProcess.jsx';
import ProductDetail from './Pages/ProductDetail/ProductDetail.jsx';
import ProductList from './Pages/ProductList/ProductList.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import UploadResep from './Pages/UploadResep/UploadResep.jsx';
import UploadSuccess from './Pages/UploadSuccess/UploadSuccess.jsx';

function App() {
  // const location = useLocation();

  return (
    <>
      {/* {location.pathname === '/login' || location.pathname === '/register' ? null : <Navbar />} */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/Confirmation" element={<Confirmation />} />
          <Route path="/FormAddress" element={<FormAddress />} />
          <Route path="/OrderProcess" element={<OrderProcess />} />
          <Route path="/ProductDetail" element={<ProductDetail />} />
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/UploadResep" element={<UploadResep />} />
          <Route path="/UploadSuccess" element={<UploadSuccess />} />
        </Routes>
      </BrowserRouter>
      {/* {location.pathname === '/login' || location.pathname === '/register' ? null : <Footer />} */}
    </>
  );
}

export default App;
