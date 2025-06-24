import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', data);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input className="form-control mb-2" placeholder="Email" onChange={e => setData({ ...data, email: e.target.value })} />
      <input className="form-control mb-2" type="password" placeholder="Password" onChange={e => setData({ ...data, password: e.target.value })} />
      <button className="btn btn-primary" type="submit">Login</button>
    </form>
  );
}
