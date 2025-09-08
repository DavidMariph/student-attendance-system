import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import './Enrollment.css'; // We'll create this CSS file

const Enrollment = () => {
  const { addStudent } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    department: 'Computer Science'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addStudent(formData);
      setFormData({
        name: '',
        department: 'Computer Science'
      });
      alert('Student enrolled successfully!');
    } catch (error) {
      alert(`Enrollment failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="enrollment-container">
      <div className="enrollment-card">
        <div className="enrollment-header">
          <h2>🎓 Student Enrollment</h2>
          <p>Add new students to the attendance system</p>
        </div>
        
        <form onSubmit={handleSubmit} className="enrollment-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter student's full name"
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="form-select"
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Building Engineering">Building Engineering</option>
              <option value="Applied science">Applied Science</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Enrolling...
              </>
            ) : (
              'Enroll Student'
            )}
          </button>
        </form>
        
        <div className="enrollment-footer">
          <p>📧 Student email will be auto-generated</p>
        </div>
      </div>
    </div>
  );
};

export default Enrollment;