import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Reports = () => {
  const { students } = useContext(AppContext);

  const departmentStats = students.reduce((acc, student) => {
    if (!acc[student.department]) {
      acc[student.department] = { total: 0, sum: 0 };
    }
    acc[student.department].total++;
    acc[student.department].sum += student.attendance;
    return acc;
  }, {});

  return (
    <div className="reports">
      <h2>Attendance Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Students</th>
            <th>Average Attendance</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(departmentStats).map(([dept, stats]) => (
            <tr key={dept}>
              <td>{dept}</td>
              <td>{stats.total}</td>
              <td>{(stats.sum / stats.total).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;