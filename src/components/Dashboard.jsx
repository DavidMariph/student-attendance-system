import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
  const { students } = useContext(AppContext);
  
  const totalStudents = students.length;
  const avgAttendance = students.reduce((sum, student) => sum + student.attendance, 0) / totalStudents;
  
  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </div>
        <div className="stat-card">
          <h3>Average Attendance</h3>
          <p>{avgAttendance.toFixed(1)}%</p>
        </div>
        <div className="stat-card">
          <h3>Upcoming Events</h3>
          <p>3</p>
        </div>
      </div>
      
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul>
          <li>New student enrolled - Joy Dali</li>
          <li>Attendance marked for 05/24/2025</li>
          <li>System updated to v1.2</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;