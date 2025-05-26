import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const addStudent = async (student) => {
  await addDoc(collection(db, 'students'), student);
};

export const getStudents = async () => {
  const snapshot = await getDocs(collection(db, 'students'));
  return snapshot.docs.map(doc => doc.data());
};