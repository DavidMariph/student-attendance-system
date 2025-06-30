import { createContext, useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  onSnapshot,
  serverTimestamp,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Track auth state and user role
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setUserRole(userDoc.data()?.role || 'student');
      } else {
        setUserRole(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Load students with real-time updates
  useEffect(() => {
    const unsubscribeStudents = onSnapshot(collection(db, 'students'), (snapshot) => {
      const studentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudents(studentsData);
      setLoading(false);
    });

    return () => unsubscribeStudents();
  }, []);

  // Add new student (admin only)
  const addStudent = async (student) => {
    if (userRole !== 'admin') {
      throw new Error('Only admins can add students');
    }

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

  // Update attendance (admin/lecturer only)
  const updateAttendance = async (id, attendance) => {
    if (!['admin', 'lecturer'].includes(userRole)) {
      throw new Error('Permission denied');
    }

    try {
      await updateDoc(doc(db, 'students', id), {
        attendance: parseInt(attendance)
      });
    } catch (error) {
      console.error("Error updating attendance:", error);
      throw error;
    }
  };

  // Add user role (admin only)
  const addUserRole = async (userId, role) => {
    if (userRole !== 'admin') {
      throw new Error('Only admins can assign roles');
    }

    await setDoc(doc(db, 'users', userId), { role }, { merge: true });
  };

  const generateEmail = (name) => {
    const [first, last] = name.toLowerCase().split(' ');
    return `${first}.${last || 'student'}@ttu.ac.ke`;
  };

  return (
    <AppContext.Provider value={{
      // State
      students,
      loading,
      activeTab,
      currentUser,
      userRole,
      
      // Actions
      addStudent,
      updateAttendance,
      addUserRole,
      setActiveTab,
      
      // Permissions
      canEdit: ['admin', 'lecturer'].includes(userRole),
      isAdmin: userRole === 'admin'
    }}>
      {children}
    </AppContext.Provider>
  );
};