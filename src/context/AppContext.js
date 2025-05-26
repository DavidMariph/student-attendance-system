import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Lawrence Kiplagat', department: 'Computer Science', attendance: 85, email: 'l.kiplagat@ttu.ac.ke' },
    { id: 2, name: 'Nasra Mummy', department: 'Electrical Engineering', attendance: 92, email: 'n.mummy@ttu.ac.ke' },
    { id: 3, name: 'Eddy Otieno', department: 'Mechanical Engineering', attendance: 78, email: 'e.otieno@ttu.ac.ke' },
    { id: 4, name: 'John Mwangi', department: 'Computer Science', attendance: 85, email: 'j.mwangi@ttu.ac.ke' },
    { id: 5, name: 'Mark Mwai', department: 'Electrical Engineering', attendance: 92, email: 'm.mwai@ttu.ac.ke' },
    { id: 6, name: 'Michael Ochieng', department: 'Mechanical Engineering', attendance: 78, email: 'm.ochieng@ttu.ac.ke' },
    { id: 7, name: 'Grace Akinyi', department: 'Education', attendance: 88, email: 'g.akinyi@ttu.ac.ke' },
    { id: 8, name: 'David Kamau', department: 'Business Administration', attendance: 75, email: 'd.kamau@ttu.ac.ke' },
    { id: 9, name: 'Esther Njoroge', department: 'Hospitality', attendance: 91, email: 'e.njoroge@ttu.ac.ke' },
    { id: 10, name: 'Peter Omollo', department: 'Agriculture', attendance: 82, email: 'p.omollo@ttu.ac.ke' },
    { id: 11, name: 'Joyce Medza', department: 'Computer Science', attendance: 79, email: 'j.medza@ttu.ac.ke' },
    { id: 12, name: 'James Righa', department: 'Electrical Engineering', attendance: 87, email: 'j.righa@ttu.ac.ke' },
    { id: 13, name: 'Lilian Wanjiru', department: 'Education', attendance: 93, email: 'l.wanjiru@ttu.ac.ke' },
    { id: 14, name: 'Brian Otieno', department: 'Business Administration', attendance: 81, email: 'b.otieno@ttu.ac.ke' },
    { id: 15, name: 'Nancy Wawuda', department: 'Hospitality', attendance: 76, email: 'n.wawuda@ttu.ac.ke' },
    { id: 16, name: 'Kevin Maina', department: 'Agriculture', attendance: 89, email: 'k.maina@ttu.ac.ke' },
    { id: 17, name: 'Susan Mumbi', department: 'Computer Science', attendance: 84, email: 's.mumbi@ttu.ac.ke' },
    { id: 18, name: 'Paul Gitonga', department: 'Electrical Engineering', attendance: 90, email: 'p.gitonga@ttu.ac.ke' },
    { id: 19, name: 'Diana Kathure', department: 'Education', attendance: 77, email: 'd.kathure@ttu.ac.ke' },
    { id: 20, name: 'Victor Odhiambo', department: 'Business Administration', attendance: 83, email: 'v.odhiambo@ttu.ac.ke' },
    { id: 21, name: 'Waheeda Juma', department: 'Hospitality', attendance: 86, email: 'w.juma@ttu.ac.ke' },
    { id: 22, name: 'Samuel Kariuki', department: 'Agriculture', attendance: 80, email: 's.kariuki@ttu.ac.ke' },
    { id: 23, name: 'Mercy Wangui', department: 'Computer Science', attendance: 94, email: 'm.wangui@ttu.ac.ke' }
  ]);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Email notification function
  const sendEmailNotification = async (studentId, action) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    let subject, message;

    if (action.type === 'attendance') {
      subject = 'Attendance Update Notification';
      message = `Dear ${student.name},\n\nYour attendance in ${student.department} has been updated to ${action.value}%.\n\nRegards,\nTaita Taveta University`;
    } else if (action.type === 'enrollment') {
      subject = 'Welcome to Taita Taveta University';
      message = `Dear ${student.name},\n\nYou have been successfully enrolled in ${student.department} with student ID ${student.id}.\n\nRegards,\nTaita Taveta University`;
    }

    try {
      // In production, replace this with actual email service API call
      console.log(`Would send email to: ${student.email}`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);

      /* ACTUAL IMPLEMENTATION (uncomment when ready)
      const response = await fetch('YOUR_EMAIL_API_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: student.email,
          subject: subject,
          text: message
        })
      });
      if (!response.ok) throw new Error('Email failed');
      */
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  const addStudent = (student) => {
    const newStudent = { 
      ...student, 
      id: Math.max(...students.map(s => s.id)) + 1,
      email: `${student.name.split(' ')[0].toLowerCase()}.${student.name.split(' ')[1].toLowerCase()}@ttu.ac.ke`
    };
    setStudents([...students, newStudent]);
    sendEmailNotification(newStudent.id, { type: 'enrollment' });
  };
  
  const updateAttendance = (id, attendance) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, attendance } : student
    ));
    sendEmailNotification(id, { type: 'attendance', value: attendance });
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