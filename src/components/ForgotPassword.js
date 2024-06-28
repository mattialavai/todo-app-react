import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../styles/forgot-password.css'; // Import the CSS file for styling

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate password reset request (replace with actual API call)
    alert(`Password reset link sent to ${email}`);
    navigate('/login'); // Redirect to login page after submitting
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <p>Please enter your email address to receive a password reset link.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
