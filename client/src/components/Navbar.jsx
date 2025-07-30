import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components/Navbar.css';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Pitara</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#pitaraNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="pitaraNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/shop">Shop</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
          </ul>

          <div className="d-flex nav-icons align-items-center">
            {isAuthenticated ? (
              <>
              <div className="nav-item">
                <Link className="nav-link" to="/cart">Cart</Link>
              </div>
                <span className="nav-link fw-bold text-dark">{user.fullName}</span>
                <button onClick={handleLogout} className="btn btn-sm btn-outline-danger ms-2">Logout</button>
              </>
            ) : (
              <Link className="btn btn-outline-dark btn-sm" to="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
