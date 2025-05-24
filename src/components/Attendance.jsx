import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Attendance = () => {
  const { students, updateAttendance } = useContext(AppContext);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const handleAttendanceChange = (id, e) => {
    updateAttendance(id, parseInt(e.target.value));
  };
  
  return (
    <div className="attendance">
      <h2>Attendance Management</h2>
      <div className="attendance-header">
        <div className="date-selector">
          <label htmlFor="attendance-date">Date:</label>
          <input 
            type="date" 
            id="attendance-date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button className="btn-primary">Save All</button>
      </div>
      
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Attendance (%)</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.department}</td>
              <td>
                <input 
                  type="number" 
                  min="0" 
                  max="100" 
                  value={student.attendance}
                  onChange={(e) => handleAttendanceChange(student.id, e)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;