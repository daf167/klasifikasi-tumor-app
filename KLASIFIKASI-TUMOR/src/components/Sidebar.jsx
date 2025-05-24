import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaMicroscope,
  FaHistory,
  FaChartPie,
  FaUser,
  FaTimes,
} from 'react-icons/fa';

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { to: '/new-detection', label: 'New Detection', icon: <FaMicroscope /> },
    { to: '/history', label: 'History', icon: <FaHistory /> },
    { to: '/statistics', label: 'Statistics', icon: <FaChartPie /> },
    { to: '/profile', label: 'Profile', icon: <FaUser /> },
  ];

  return (
    <div
      className="vh-100 text-white"
      style={{
        background: 'linear-gradient(180deg, #40E0D0, #20B2AA)',
        position: 'fixed',
        top: 0,
        left: isOpen ? '0' : '-260px',
        width: '250px',
        transition: 'left 0.3s ease',
        overflowX: 'hidden',
        zIndex: 1050,
        boxShadow: '2px 0 8px rgba(0,0,0,0.2)',
        padding: '20px',
      }}
    >
      {/* Tombol close di tampilan mobile */}
      <div className="d-md-none text-end mb-3">
        <button
          className="btn btn-sm btn-outline-light"
          onClick={onClose}
        >
          <FaTimes />
        </button>
      </div>

      <h4 className="fw-bold mb-4">🧠 Brain Detection</h4>
      <ul className="nav flex-column">
        {navItems.map((item, idx) => (
          <li className="nav-item mb-2" key={idx}>
            <Link
              to={item.to}
              className={`nav-link d-flex align-items-center gap-2 ${
                location.pathname === item.to ? 'active' : ''
              }`}
              style={{
                color: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                backgroundColor:
                  location.pathname === item.to ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                transition: 'background 0.2s',
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
