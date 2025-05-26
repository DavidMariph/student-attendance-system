import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Enrollment = () => {
  const { addStudent } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    department: 'Computer Science'
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate email from name
  const generateEmail = (name) => {
    if (!name) return '';
    const [firstName, lastName] = name.toLowerCase().split(' ');
    return `${firstName}.${lastName || 'student'}@ttu.ac.ke`;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newStudent = {
      ...formData,
      id: Date.now(), // Unique ID based on timestamp
      attendance: 0, // Default attendance set to 0
      email: generateEmail(formData.name)
    };
    
    addStudent(newStudent);
    
    // Reset form
    setFormData({
      name: '',
      department: 'Computer Science'
    });
    
    alert(`${newStudent.name} enrolled successfully!`);
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
            placeholder="Enter new student name"
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
        
        <button type="submit" className="btn-primary">Enroll Student</button>
      </form>
    </div>
  );
};

export default Enrollment;