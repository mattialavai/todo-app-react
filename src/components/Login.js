import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import welcomeImage from '../images/undraw_To_do_list.png';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem(email));
    if (user && user.password === password) {
      setUser({ name: user.name, email: user.email, profileImage: user.profileImage });
      navigate('/todo');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome back</h2>
      <div className="image-container">
        <img src={welcomeImage} alt="Welcome" className="welcome-image" />
      </div>
      <form onSubmit={handleLogin} className="login-form">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className="forgot-password">
          <a href="/forgot-password">Forgot password?</a>
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="signup-link">
        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
      </div>
    </div>
  );
};

export default Login;
