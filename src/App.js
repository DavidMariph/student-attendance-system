import React from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Attendance from './components/Attendance';
import Enrollment from './components/Enrollment';
import StudentList from './components/StudentList';
import './App.css';
import './styles/main.css';
import './styles/responsive.css';

function App() {
  return (
    <AppProvider>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </AppProvider>
  );
}

function MainContent() {
  const { activeTab } = React.useContext(AppContext);
  
  return (
    <div className="content-area">
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'attendance' && <Attendance />}
      {activeTab === 'enrollment' && <Enrollment />}
      {activeTab === 'students' && <StudentList />}
    </div>
  );
}

export default App;