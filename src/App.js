import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../src/Components/Navbar/Navbar.jsx';
import ProductList from './Pages/ProductList/ProductList';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="" />
          <Route path="/kategori" element={<ProductList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
