import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Verify() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('email');
    const res = await axios.post('http://localhost:5000/api/verify', { email, otp });
    if (res.status === 200) {
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <h2>Enter OTP</h2>
      <input className="form-control mb-2" placeholder="OTP" onChange={e => setOtp(e.target.value)} />
      <button className="btn btn-success" type="submit">Verify</button>
    </form>
  );
}
