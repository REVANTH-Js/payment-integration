import { Link } from 'react-router-dom';
// import './Navbar.css'; // optional if you want to isolate navbar styles

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">TestWeb</Link>
      </div>
      <div className="navbar-links">
        <Link to="/register" className="nav-button">Register</Link>
        <Link to="/login" className="nav-button">Login</Link>
        <Link to="/payment" className="nav-button">Pay</Link>
      </div>
    </div>
  );
}
