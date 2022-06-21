import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../src/Components/Navbar/Navbar.jsx';
import Footer from '../src/Components/Footer/Footer.jsx';
import Login from '../src/Pages/Login/Login.jsx';
import Register from '../src/Pages/Register/Register.jsx';
import ResetPassword from '../src/Pages/ResetPassword/ResetPassword.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Footer />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
