import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Enrollment = () => {
  const { addStudent } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    department: 'Computer Science',
    attendance: 0
  });
  const [bulkInput, setBulkInput] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  // Handle manual enrollment form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle bulk enrollment textarea changes
  const handleBulkChange = (e) => {
    setBulkInput(e.target.value);
  };

  // Process bulk enrollment
  const handleBulkEnroll = () => {
    setIsImporting(true);
    
    try {
      // Parse the array input
      const studentsArray = JSON.parse(bulkInput);
      
      if (!Array.isArray(studentsArray)) {
        throw new Error('Input must be a valid array of student objects');
      }

      // Add each student
      studentsArray.forEach((student, index) => {
        const newStudent = {
          name: student.name || `Student ${index + 1}`,
          department: student.department || 'Computer Science',
          attendance: student.attendance || 0,
          id: Date.now() + index, // Unique ID
          email: generateEmail(student.name, index)
        };
        addStudent(newStudent);
      });

      alert(`${studentsArray.length} students enrolled successfully!`);
      setBulkInput('');
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsImporting(false);
    }
  };

  // Generate email from name
  const generateEmail = (name, index) => {
    if (!name) return `student${index}@ttu.ac.ke`;
    const [firstName, lastName] = name.toLowerCase().split(' ');
    return `${firstName}.${lastName || 'student'}@ttu.ac.ke`;
  };

  // Handle manual submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      ...formData,
      id: Math.floor(Math.random() * 10000) + 1,
      attendance: parseInt(formData.attendance),
      email: generateEmail(formData.name, Math.random())
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
      
      {/* Manual Enrollment Form */}
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
        
        <button type="submit" className="btn-primary">Enroll Student</button>
      </form>

      {/* Bulk Enrollment Section */}
      <div className="bulk-enrollment" style={{ marginTop: '2rem' }}>
        <h3>Bulk Enrollment</h3>
        <div className="form-group">
          <label htmlFor="bulkInput">
            Paste student array (JSON format):
          </label>
          <textarea
            id="bulkInput"
            value={bulkInput}
            onChange={handleBulkChange}
            placeholder={`[\n  {\n    "name": "John Doe",\n    "department": "Computer Science",\n    "attendance": 85\n  },\n  {\n    "name": "Jane Smith",\n    "department": "Electrical Engineering"\n  }\n]`}
            rows={10}
            style={{ 
              width: '100%',
              fontFamily: 'monospace',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
        <button
          onClick={handleBulkEnroll}
          className="btn-primary"
          disabled={!bulkInput || isImporting}
        >
          {isImporting ? 'Enrolling...' : 'Enroll Students'}
        </button>
        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
          <strong>Example format:</strong>
          <pre style={{ background: '#f5f5f5', padding: '0.5rem', borderRadius: '4px' }}>
            {`[
  {
    "name": "Student Name",
    "department": "Computer Science",
    "attendance": 85
  },
  // ... more students
]`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Enrollment;