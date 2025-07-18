import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Verify from './pages/Verify';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Payment from './components/Payment';
import GeminiChat from "./components/Gemini";
import FloatingChatButton from "./components/FloatingChatButton";
import Footer from "./components/Footer"; // ✅ Import
import FullChatPage from './pages/FullChatPage';


function App() {
  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingBottom: "100px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
            <Route path="/payment" element={<Payment />} />
            {/* <Route path="/ai" element={<AiChat />} />
             */}
             <Route path="/gemini" element={<GeminiChat />} />
             <Route path="/chatbot" element={<FullChatPage />} />
              {/* <FloatingChatButton /> */}
        </Routes>
        
      </div>
            <FloatingChatButton />
             <Footer /> {/* ✅ Added here */}
    </>
  );
}

export default App;
