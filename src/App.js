import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
// USER
import Navbar from './Components/User/Navbar/Navbar.jsx';
import Footer from './Components/User/Footer/Footer.jsx';
import Login from './Pages/User/Login/Login.jsx';
import Register from './Pages/User/Register/Register.jsx';
import ResetPassword from './Pages/User/ResetPassword/ResetPassword.jsx';
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

// ADMIN
import LoginAdmin from './Pages/Admin/LoginAdmin/LoginAdmin.jsx';
import Dashboard from './Pages/Admin/Dashboard/Dashboard.jsx';


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
        {location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/loginadmin' ? null : <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
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
          <Route path="/UploadResep" element={<UploadResep />} />
          <Route path="/UploadSuccess" element={<UploadSuccess />} />
          <Route path="/loginadmin" element={<LoginAdmin />} />
          <Route path="/homeadmin" element={<Dashboard />} />
        </Routes>
        {/* {location.pathname === '/login' || location.pathname === '/register' ? null : <Footer />} */}
      </Provider>
    </>
  );
}

export default App;
