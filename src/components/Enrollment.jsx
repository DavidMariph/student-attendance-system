import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Enrollment = () => {
  const { addStudent } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    department: 'Computer Science'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(formData);
      setFormData({
        name: '',
        department: 'Computer Science'
      });
      alert('Student enrolled successfully!');
    } catch (error) {
      alert(`Enrollment failed: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Student Name"
        required
      />
      <select
        value={formData.department}
        onChange={(e) => setFormData({...formData, department: e.target.value})}
      >
        <option value="Computer Science">Computer Science</option>
        <option value="Electrical Engineering">Electrical Engineering</option>
        <option value="Hospitality">Hospitality</option>
        <option value="Building Engineering">Building Engineering</option>
        <option value="Applied science">Applied science</option>
      </select>
      <button type="submit">Enroll Student</button>
    </form>
  );
};

export default Enrollment;