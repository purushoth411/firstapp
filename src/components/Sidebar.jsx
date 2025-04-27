import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className="bg-dark text-white p-3 vh-100" style={{ width: "220px", position: "fixed" }}>
      <h2 className="text-center mb-4">Menu</h2>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/dashboard" className='nav-link text-white'>Dashboard</Link>
        </li>
        <li className="nav-item mb-2">
        <Link to="/products" className='nav-link text-white'>Products</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
