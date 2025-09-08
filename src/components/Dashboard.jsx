import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import './Dashboard.css';

const Dashboard = () => {
  const { students, addStudent, markAttendance } = useContext(AppContext);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    id: '',
    program: '',
    attendance: 0
  });
  
  const totalStudents = students.length;
  const avgAttendance = students.reduce((sum, student) => sum + student.attendance, 0) / totalStudents || 0;
  const enrolledThisMonth = students.filter(student => {
    const enrollmentDate = new Date(student.enrollmentDate);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return enrollmentDate >= thirtyDaysAgo;
  }).length;
  
  // Handle adding a new student
  const handleAddStudent = () => {
    if (newStudent.name && newStudent.id) {
      addStudent({
        ...newStudent,
        id: newStudent.id,
        enrollmentDate: new Date().toISOString()
      });
      setNewStudent({ name: '', id: '', program: '', attendance: 0 });
      setShowAddStudent(false);
      alert('Student added successfully!');
    } else {
      alert('Please fill in all required fields');
    }
  };
  
  // Handle marking attendance for all students
  const handleMarkAttendance = () => {
    // This would typically open a modal or navigate to an attendance page
    // For demonstration, we'll just mark a random attendance for all students
    students.forEach(student => {
      const randomAttendance = Math.floor(Math.random() * 20) + 80; // Random between 80-100
      markAttendance(student.id, randomAttendance);
    });
    alert('Attendance marked for all students!');
  };
  
  // Handle generating a report
  const handleGenerateReport = () => {
    // Create a simple text report
    const report = `Taita Taveta University Report\nDate: ${new Date().toLocaleDateString()}\n\nTotal Students: ${totalStudents}\nAverage Attendance: ${avgAttendance.toFixed(1)}%\nNew Enrollments This Month: ${enrolledThisMonth}`;
    
    // Create a downloadable report
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `university-report-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Handle scheduling an event
  const handleScheduleEvent = () => {
    const eventName = prompt('Enter event name:');
    if (eventName) {
      const eventDate = prompt('Enter event date (YYYY-MM-DD):');
      if (eventDate) {
        alert(`Event "${eventName}" scheduled for ${eventDate}`);
        // Here you would typically save this to your context or backend
      }
    }
  };

  // Sample data for charts
  const attendanceData = [
    { day: 'Mon', attendance: 85 },
    { day: 'Tue', attendance: 78 },
    { day: 'Wed', attendance: 92 },
    { day: 'Thu', attendance: 88 },
    { day: 'Fri', attendance: 80 }
  ];
  
  const programDistribution = [
    { program: 'Computer Science', count: 120 },
    { program: 'Engineering', count: 95 },
    { program: 'Business', count: 85 },
    { program: 'Education', count: 65 }
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Taita Taveta University Dashboard</h1>
        <div className="date-filter">
          <select>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </header>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>Total Students</h3>
            <p className="stat-number">{totalStudents}</p>
            <p className="stat-trend positive">+5% from last month</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-user-check"></i>
          </div>
          <div className="stat-content">
            <h3>Average Attendance</h3>
            <p className="stat-number">{avgAttendance.toFixed(1)}%</p>
            <p className="stat-trend positive">+2% from last week</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-user-plus"></i>
          </div>
          <div className="stat-content">
            <h3>New Enrollments</h3>
            <p className="stat-number">{enrolledThisMonth}</p>
            <p className="stat-trend positive">+12% from last month</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="stat-content">
            <h3>Upcoming Events</h3>
            <p className="stat-number">3</p>
            <p className="stat-trend">Next: Graduation Ceremony</p>
          </div>
        </div>
      </div>
      
      <div className="charts-container">
        <div className="chart-card">
          <h3>Weekly Attendance Trend</h3>
          <div className="attendance-chart">
            {attendanceData.map((item, index) => (
              <div key={index} className="chart-bar">
                <div 
                  className="bar-fill" 
                  style={{ height: `${item.attendance}%` }}
                ></div>
                <span>{item.day}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="chart-card">
          <h3>Program Distribution</h3>
          <div className="program-chart">
            {programDistribution.map((item, index) => {
              const percentage = totalStudents > 0 ? (item.count / totalStudents * 100).toFixed(1) : 0;
              return (
                <div key={index} className="program-item">
                  <div className="program-info">
                    <span className="program-name">{item.program}</span>
                    <span className="program-count">{item.count} students</span>
                  </div>
                  <div className="program-bar">
                    <div 
                      className="program-fill" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="program-percentage">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn" onClick={() => setShowAddStudent(true)}>
            <i className="fas fa-plus"></i>
            Add New Student
          </button>
          <button className="action-btn" onClick={handleMarkAttendance}>
            <i className="fas fa-clipboard-check"></i>
            Mark Attendance
          </button>
          <button className="action-btn" onClick={handleGenerateReport}>
            <i className="fas fa-chart-line"></i>
            Generate Report
          </button>
          <button className="action-btn" onClick={handleScheduleEvent}>
            <i className="fas fa-calendar-plus"></i>
            Schedule Event
          </button>
        </div>
      </div>
      
      {/* Add Student Modal */}
      {showAddStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Student</h3>
            <div className="form-group">
              <label>Full Name *</label>
              <input 
                type="text" 
                value={newStudent.name}
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                placeholder="Enter student name"
              />
            </div>
            <div className="form-group">
              <label>Student ID *</label>
              <input 
                type="text" 
                value={newStudent.id}
                onChange={(e) => setNewStudent({...newStudent, id: e.target.value})}
                placeholder="Enter student ID"
              />
            </div>
            <div className="form-group">
              <label>Program</label>
              <input 
                type="text" 
                value={newStudent.program}
                onChange={(e) => setNewStudent({...newStudent, program: e.target.value})}
                placeholder="Enter program"
              />
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowAddStudent(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleAddStudent}>
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;