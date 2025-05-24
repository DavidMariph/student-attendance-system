import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Enrollment = () => {
  const { addStudent } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    department: 'Computer Science',
    attendance: 0
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      ...formData,
      id: Math.floor(Math.random() * 10000) + 1, // Generate random ID
      attendance: parseInt(formData.attendance)
    };
    addStudent(newStudent);
    setFormData({
      name: '',
      department: 'Computer Science',
      attendance: 0
    });
    alert('Student enrolled successfully!');
  };
  
  return (
    <div className="enrollment">
      <h2>Student Enrollment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Student Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <select 
            id="department" 
            name="department" 
            value={formData.department}
            onChange={handleChange}
          >
            <option value="Computer Science">Computer Science</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Business Administration">Business Administration</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="attendance">Initial Attendance (%):</label>
          <input 
            type="number" 
            id="attendance" 
            name="attendance" 
            min="0" 
            max="100" 
            value={formData.attendance}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="btn-primary">Enroll Student</button>
      </form>
    </div>
  );
};

export default Enrollment;