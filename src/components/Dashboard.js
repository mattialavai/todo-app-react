import React from 'react';
import { Link } from 'react-router-dom';
import todoImage from '../images/undraw_mobile_123.png'; // Import the image
// import './Dashboard.css'; // Import CSS file for styling

const Dashboard = () => (
  <div className="dashboard-container">
    <div className="header-section">
      <h2>Get Things Done with Todo</h2>
      <p>Start organizing your tasks efficiently with our simple and intuitive todo app.</p>
    </div>
    <div className="image-section">
      <img src={todoImage} alt="Get Things Done" />
    </div>
    <div className="button-section">
      <Link to="/signup" className="get-started-button">Get Started</Link>
    </div>
  </div>
);

export default Dashboard;
