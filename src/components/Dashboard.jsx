import React, { useContext, useState, useEffect, useCallback } from 'react';
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
  const [weeklyAttendance, setWeeklyAttendance] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(0); // 0 = current week, -1 = previous week, etc.
  
  const totalStudents = students.length;
  const avgAttendance = students.reduce((sum, student) => sum + student.attendance, 0) / totalStudents || 0;
  const enrolledThisMonth = students.filter(student => {
    const enrollmentDate = new Date(student.enrollmentDate);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return enrollmentDate >= thirtyDaysAgo;
  }).length;
  
  // Memoize the calculateWeeklyAttendance function with useCallback
  const calculateWeeklyAttendance = useCallback((weekOffset) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1 + (weekOffset * 7)); // Monday of selected week
    
    // Initialize attendance by day
    const attendanceByDay = {};
    for (let i = 0; i < 5; i++) { // Only weekdays
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + i);
      const dayName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i];
      attendanceByDay[dayName] = [];
    }
    
    // For this demo, we'll simulate attendance data based on student records
    students.forEach(student => {
      // Simulate attendance for each day of the week
      for (let i = 0; i < 5; i++) {
        const dayName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i];
        // Randomize attendance for demo purposes (between 70-100% of student's attendance)
        const dayAttendance = Math.round(student.attendance * (0.7 + Math.random() * 0.3));
        attendanceByDay[dayName].push(dayAttendance);
      }
    });
    
    // Calculate averages for each day
    const weeklyAverages = Object.keys(attendanceByDay).map(day => {
      const attendances = attendanceByDay[day];
      const average = attendances.length > 0 
        ? attendances.reduce((sum, value) => sum + value, 0) / attendances.length
        : null;
      
      return {
        day,
        attendance: average !== null ? Math.round(average) : null
      };
    });
    
    setWeeklyAttendance(weeklyAverages);
  }, [students]); // Add students as dependency since it's used inside the function

  // Calculate weekly attendance when component mounts or selectedWeek changes
  useEffect(() => {
    calculateWeeklyAttendance(selectedWeek);
  }, [selectedWeek, calculateWeeklyAttendance]); // Now include calculateWeeklyAttendance in dependencies
  
  // Get week label for display
  const getWeekLabel = (offset) => {
    if (offset === 0) return "This Week";
    if (offset === -1) return "Last Week";
    if (offset === -2) return "Two Weeks Ago";
    return `${Math.abs(offset)} Weeks Ago`;
  };

  // Top programs by enrollment
  const topPrograms = [
    { name: 'Computer Science', enrollment: 240, color: '#FF6B6B' },
    { name: 'Engineering', enrollment: 180, color: '#4ECDC4' },
    { name: 'Business', enrollment: 150, color: '#FFE66D' },
    { name: 'Education', enrollment: 120, color: '#6A0572' }
  ];
  
  // Recent announcements
  const announcements = [
    { id: 1, title: 'Semester Break', date: '2023-12-15', content: 'The semester break will begin on December 20th.' },
    { id: 2, title: 'New Library Hours', date: '2023-12-10', content: 'Library hours have been extended for finals week.' },
    { id: 3, title: 'Graduation Ceremony', date: '2023-12-05', content: 'Graduation ceremony will be held on January 15th.' }
  ];

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
    students.forEach(student => {
      const randomAttendance = Math.floor(Math.random() * 20) + 80;
      markAttendance(student.id, randomAttendance);
    });
    // Recalculate weekly attendance after marking
    calculateWeeklyAttendance(selectedWeek);
    alert('Attendance marked for all students!');
  };
  
  // Handle generating a report
  const handleGenerateReport = () => {
    const report = `Taita Taveta University Report\nDate: ${new Date().toLocaleDateString()}\n\nTotal Students: ${totalStudents}\nAverage Attendance: ${avgAttendance.toFixed(1)}%\nNew Enrollments This Month: ${enrolledThisMonth}\n\nWeekly Attendance:\n${weeklyAttendance.map(day => `  ${day.day}: ${day.attendance !== null ? day.attendance + '%' : 'No data'}`).join('\n')}`;
    
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
      }
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Taita Taveta University Dashboard</h1>
          <p>Welcome to your university management portal</p>
        </div>
        <div className="header-actions">
          <div className="date-filter">
            <i className="fas fa-calendar"></i>
            <select>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <button className="notification-btn">
            <i className="fas fa-bell"></i>
            <span className="notification-badge">3</span>
          </button>
          <div className="user-profile">
            <div className="avatar">AD</div>
            <span>Admin</span>
          </div>
        </div>
      </header>
      
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>Total Students</h3>
            <p className="stat-number">{totalStudents}</p>
            <div className="progress-container">
              <div className="progress-bar" style={{width: '75%'}}></div>
            </div>
            <p className="stat-trend positive">+5% from last month</p>
          </div>
        </div>
        
        <div className="stat-card success">
          <div className="stat-icon">
            <i className="fas fa-user-check"></i>
          </div>
          <div className="stat-content">
            <h3>Average Attendance</h3>
            <p className="stat-number">{avgAttendance.toFixed(1)}%</p>
            <div className="progress-container">
              <div className="progress-bar" style={{width: `${avgAttendance}%`}}></div>
            </div>
            <p className="stat-trend positive">+2% from last week</p>
          </div>
        </div>
        
        <div className="stat-card warning">
          <div className="stat-icon">
            <i className="fas fa-user-plus"></i>
          </div>
          <div className="stat-content">
            <h3>New Enrollments</h3>
            <p className="stat-number">{enrolledThisMonth}</p>
            <div className="progress-container">
              <div className="progress-bar" style={{width: '60%'}}></div>
            </div>
            <p className="stat-trend positive">+12% from last month</p>
          </div>
        </div>
        
        <div className="stat-card info">
          <div className="stat-icon">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="stat-content">
            <h3>Upcoming Events</h3>
            <p className="stat-number">3</p>
            <div className="progress-container">
              <div className="progress-bar" style={{width: '30%'}}></div>
            </div>
            <p className="stat-trend">Next: Graduation Ceremony</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="charts-container">
          <div className="chart-card">
            <div className="chart-header">
              <h3>Weekly Attendance Trend</h3>
              <div className="week-selector">
                <button 
                  onClick={() => setSelectedWeek(selectedWeek - 1)}
                  className="week-nav-btn"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <span className="week-label">{getWeekLabel(selectedWeek)}</span>
                <button 
                  onClick={() => setSelectedWeek(selectedWeek + 1)}
                  disabled={selectedWeek === 0}
                  className="week-nav-btn"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
            <div className="attendance-chart">
              {weeklyAttendance.map((item, index) => (
                <div key={index} className="chart-bar">
                  <div className="bar-tooltip">
                    {item.attendance !== null ? `${item.attendance}%` : 'No data'}
                  </div>
                  <div 
                    className="bar-fill" 
                    style={{ height: item.attendance !== null ? `${item.attendance}%` : '10%' }}
                    data-empty={item.attendance === null}
                  ></div>
                  <span>{item.day}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="chart-card">
            <div className="chart-header">
              <h3>Program Distribution</h3>
              <button className="chart-action-btn">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </div>
            <div className="program-chart">
              {[
                { program: 'Computer Science', count: 120 },
                { program: 'Engineering', count: 95 },
                { program: 'Business', count: 85 },
                { program: 'Education', count: 65 }
              ].map((item, index) => {
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
        
        <div className="side-panel">
          <div className="announcements-card">
            <div className="card-header">
              <h3>Announcements</h3>
              <button className="see-all-btn">See All</button>
            </div>
            <div className="announcements-list">
              {announcements.map(announcement => (
                <div key={announcement.id} className="announcement-item">
                  <div className="announcement-badge"></div>
                  <div className="announcement-content">
                    <h4>{announcement.title}</h4>
                    <p>{announcement.content}</p>
                    <span className="announcement-date">{announcement.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="programs-card">
            <div className="card-header">
              <h3>Top Programs</h3>
            </div>
            <div className="programs-list">
              {topPrograms.map((program, index) => (
                <div key={index} className="program-item-circle">
                  <div className="program-circle">
                    <div 
                      className="circle-progress" 
                      style={{
                        background: `conic-gradient(${program.color} ${program.enrollment/10}%, #f0f0f0 0)`
                      }}
                    >
                      <div className="circle-inner">
                        <span>{program.enrollment}</span>
                      </div>
                    </div>
                    <span className="program-name">{program.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn" onClick={() => setShowAddStudent(true)}>
            <div className="action-icon">
              <i className="fas fa-plus"></i>
            </div>
            <span>Add New Student</span>
          </button>
          <button className="action-btn" onClick={handleMarkAttendance}>
            <div className="action-icon">
              <i className="fas fa-clipboard-check"></i>
            </div>
            <span>Mark Attendance</span>
          </button>
          <button className="action-btn" onClick={handleGenerateReport}>
            <div className="action-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <span>Generate Report</span>
          </button>
          <button className="action-btn" onClick={handleScheduleEvent}>
            <div className="action-icon">
              <i className="fas fa-calendar-plus"></i>
            </div>
            <span>Schedule Event</span>
          </button>
        </div>
      </div>
      
      {/* Add Student Modal */}
      {showAddStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Student</h3>
              <button className="modal-close" onClick={() => setShowAddStudent(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
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
                <select
                  value={newStudent.program}
                  onChange={(e) => setNewStudent({...newStudent, program: e.target.value})}
                >
                  <option value="">Select a program</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business">Business</option>
                  <option value="Education">Education</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
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