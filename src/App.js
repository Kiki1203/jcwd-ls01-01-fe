import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../src/Components/Navbar/Navbar.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
