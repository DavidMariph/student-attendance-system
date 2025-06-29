import { createContext, useState, useEffect } from 'react';
import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'students'), (snapshot) => {
      const studentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudents(studentsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addStudent = async (student) => {
    try {
      await addDoc(collection(db, 'students'), {
        ...student,
        email: generateEmail(student.name),
        createdAt: serverTimestamp(),
        attendance: parseInt(student.attendance) || 0
      });
    } catch (error) {
      console.error("Error adding student:", error);
      throw error;
    }
  };

  const updateAttendance = async (id, attendance) => {
    try {
      await updateDoc(doc(db, 'students', id), {
        attendance: parseInt(attendance)
      });
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const generateEmail = (name) => {
    const [first, last] = name.toLowerCase().split(' ');
    return `${first}.${last || 'student'}@ttu.ac.ke`;
  };

  return (
    <AppContext.Provider value={{
      students,
      loading,
      addStudent,
      updateAttendance,
      activeTab,          
      setActiveTab        
    }}>
      {children}
    </AppContext.Provider>
  );
};
