import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Lawrence Kiplagat', department: 'Computer Science', attendance: 85 },
    { id: 2, name: 'Nasra Mummy', department: 'Electrical Engineering', attendance: 92 },
    { id: 3, name: 'Eddy Otieno', department: 'Mechanical Engineering', attendance: 78 },
  ]);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const addStudent = (student) => {
    setStudents([...students, student]);
  };
  
  const updateAttendance = (id, attendance) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, attendance } : student
    ));
  };
  
  return (
    <AppContext.Provider value={{ 
      students, 
      addStudent, 
      updateAttendance,
      activeTab,
      setActiveTab
    }}>
      {children}
    </AppContext.Provider>
  );
};