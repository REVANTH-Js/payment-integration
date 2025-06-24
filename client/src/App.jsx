import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Verify from './pages/Verify';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Payment from './components/Payment';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
            <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
