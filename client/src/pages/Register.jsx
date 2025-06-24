import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/register', data);
    if (res.status === 201) {
      localStorage.setItem('email', data.email);
      navigate('/verify');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input className="form-control mb-2" placeholder="Name" onChange={e => setData({ ...data, name: e.target.value })} />
      <input className="form-control mb-2" placeholder="Email" onChange={e => setData({ ...data, email: e.target.value })} />
      <input className="form-control mb-2" type="password" placeholder="Password" onChange={e => setData({ ...data, password: e.target.value })} />
      <button className="btn btn-primary" type="submit">Register</button>
    </form>
  );
}
