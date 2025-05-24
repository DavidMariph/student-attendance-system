import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const StudentList = () => {
  const { students } = useContext(AppContext);
  
  return (
    <div className="student-list">
      <h2>Student Directory</h2>
      <div className="search-bar">
        <input type="text" placeholder="Search students..." />
        <button className="btn-primary">
          <i className="fas fa-search"></i> Search
        </button>
      </div>
      
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Attendance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.department}</td>
              <td>
                <div className="attendance-bar">
                  <div 
                    className="attendance-fill" 
                    style={{ width: `${student.attendance}%` }}
                  ></div>
                  <span>{student.attendance}%</span>
                </div>
              </td>
              <td>
                <button className="btn-action">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="btn-action btn-danger">
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;