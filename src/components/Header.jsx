import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1>Student Attendance System</h1>
        <div className="header-actions">
          <button className="btn-notification">
            <i className="fas fa-bell"></i>
          </button>
          <div className="user-profile">
            <span>Admin</span>
            <div className="avatar">A</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;