import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">CodeForGood</Link>
      <div className="ml-auto">
        <Link className="btn btn-outline-light mx-2" to="/register">Register</Link>
        <Link className="btn btn-outline-light" to="/login">Login</Link>
        <Link className="btn btn-outline-light" to="/payment">Pay</Link>
        {/* <Link className="btn btn-outline-light" to="/ai">AI</Link> */}
 <Link className="btn btn-outline-light" to="/gemini">AI</Link>
          {/* <Link className="nav-link" to="/ai">AI Assistant</NavLink> */}

      {/* <NavLink to="/payment" className="nav-link">Pay</NavLink> */}

      </div>
    </nav>
  );
}
