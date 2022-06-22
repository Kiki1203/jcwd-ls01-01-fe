import './App.css';
import {Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Navbar/Navbar.jsx';
// import Footer from './Components/Footer/Footer.jsx';
import Login from './Pages/User/Login/Login.jsx';
import Register from './Pages/User/Register/Register.jsx';
import ResetPassword from './Pages/User/ResetPassword/ResetPassword.jsx';
import Cart from './Pages/User/Cart/Cart.jsx';
import Checkout from './Pages/User/Checkout/Checkout.jsx';
import Verification from './Pages/User/Verification/Verification.jsx';
import FormAddress from './Pages/User/FormAddress/FormAddress.jsx';
import Home from './Pages/User/Home/Home.jsx';
import OrderProcess from './Pages/User/OrderProcess/OrderProcess.jsx';
import ProductDetail from './Pages/User/ProductDetail/ProductDetail.jsx';
import ProductList from './Pages/User/ProductList/ProductList.jsx';
import Profile from './Pages/User/Profile/Profile.jsx';
import UploadResep from './Pages/User/UploadResep/UploadResep.jsx';
import UploadSuccess from './Pages/User/UploadSuccess/UploadSuccess.jsx';

// Redux
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import allReducer from './Redux/Reducers/Index.js';

const store = createStore(allReducer, applyMiddleware(thunk))

function App() {
  // const location = useLocation();

  return (
    <>
      {/* {location.pathname === '/login' || location.pathname === '/register' ? null : <Navbar />} */}
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/Verification" element={<Verification />} />
          <Route path="/FormAddress" element={<FormAddress />} />
          <Route path="/OrderProcess" element={<OrderProcess />} />
          <Route path="/ProductDetail" element={<ProductDetail />} />
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/UploadResep" element={<UploadResep />} />
          <Route path="/UploadSuccess" element={<UploadSuccess />} />
        </Routes>
      </Provider>
      {/* {location.pathname === '/login' || location.pathname === '/register' ? null : <Footer />} */}
    </>
  );
}

export default App;
