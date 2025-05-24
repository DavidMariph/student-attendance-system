import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Sidebar = () => {
  const { activeTab, setActiveTab } = useContext(AppContext);
  
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li className={activeTab === 'dashboard' ? 'active' : ''}>
            <button onClick={() => setActiveTab('dashboard')}>
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </button>
          </li>
          <li className={activeTab === 'attendance' ? 'active' : ''}>
            <button onClick={() => setActiveTab('attendance')}>
              <i className="fas fa-calendar-check"></i>
              <span>Attendance</span>
            </button>
          </li>
          <li className={activeTab === 'enrollment' ? 'active' : ''}>
            <button onClick={() => setActiveTab('enrollment')}>
              <i className="fas fa-user-plus"></i>
              <span>Enrollment</span>
            </button>
          </li>
          <li className={activeTab === 'students' ? 'active' : ''}>
            <button onClick={() => setActiveTab('students')}>
              <i className="fas fa-users"></i>
              <span>Student List</span>
            </button>
          </li>
        </ul>
      </nav>
      <div className="calendar-integration">
        <h3>Calendar</h3>
        <div className="mini-calendar">
          {/* Calendar integration would go here */}
          <p>Calendar integration placeholder</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;