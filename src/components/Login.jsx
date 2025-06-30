import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to login: ' + err.message);
    }
  }

  return (
    <div className="login-container">
      <h2>TTU Attendance System Login</h2>
      {error && <div className="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required 
               onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required
               onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}