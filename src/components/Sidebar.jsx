import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import './Sidebar.css';

const Sidebar = () => {
  const { activeTab, setActiveTab } = useContext(AppContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Navigation items data
  const navItems = [
    { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { id: 'attendance', icon: 'fas fa-calendar-check', label: 'Attendance' },
    { id: 'enrollment', icon: 'fas fa-user-plus', label: 'Enrollment' },
    { id: 'students', icon: 'fas fa-users', label: 'Student List' },
    { id: 'reports', icon: 'fas fa-chart-bar', label: 'Reports' },
    { id: 'settings', icon: 'fas fa-cog', label: 'Settings' }
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar header */}
      <div className="sidebar-header">
        {!isCollapsed && (
          <div className="logo">
            <i className="fas fa-graduation-cap"></i>
            <span>Taita University</span>
          </div>
        )}
        <button 
          className="toggle-sidebar"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul>
          {navItems.map(item => (
            <li key={item.id} className={activeTab === item.id ? 'active' : ''}>
              <button 
                onClick={() => setActiveTab(item.id)}
                className="nav-button"
                aria-label={item.label}
              >
                <i className={item.icon}></i>
                {!isCollapsed && <span>{item.label}</span>}
                {activeTab === item.id && !isCollapsed && (
                  <div className="active-indicator"></div>
                )}
              </button>
              {isCollapsed && activeTab === item.id && (
                <div className="tooltip">{item.label}</div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* User profile at bottom */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">
            <i className="fas fa-user"></i>
          </div>
          {!isCollapsed && (
            <div className="user-info">
              <span className="user-name">Admin User</span>
              <span className="user-role">Administrator</span>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button className="logout-btn" aria-label="Log out">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;