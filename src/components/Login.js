import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import '../styles/login.css'; // Import the CSS file for styling
import welcomeImage from '../images/undraw_To_do_list.png'; // Import your image

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., form validation, API call)
    // For simplicity, just navigate to the todo page
    navigate('/todo');
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
