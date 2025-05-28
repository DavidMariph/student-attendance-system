import { createContext, useState, useEffect } from 'react';
import { db } from './firebase'; // Ensure this path is correct
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc,
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';

// Create and export context
export const AppContext = createContext();

// Helper function to generate student emails
const generateEmail = (name) => {
  if (!name) return '';
  const [firstName, lastName] = name.toLowerCase().split(' ');
  return `${firstName}.${lastName || 'student'}@ttu.ac.ke`;
};

export const AppProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  // Real-time listener for students collection
  useEffect(() => {
    const studentsRef = collection(db, 'students');
    const unsubscribe = onSnapshot(studentsRef, (snapshot) => {
      const studentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentsData);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // Add a new student to Firestore
  const addStudent = async (student) => {
    try {
      const newStudent = {
        ...student,
        email: generateEmail(student.name),
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, 'students'), newStudent);
    } catch (error) {
      console.error('Error adding student:', error);
      throw error; // Re-throw to handle in UI if needed
    }
  };

  // Update a student's attendance
  const updateAttendance = async (id, attendance) => {
    try {
      const studentRef = doc(db, 'students', id);
      await updateDoc(studentRef, { attendance });
    } catch (error) {
      console.error('Error updating attendance:', error);
      throw error;
    }
  };

  // Context value to be provided
  const contextValue = {
    students,
    addStudent,
    updateAttendance,
    activeTab,
    setActiveTab,
    loading,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};