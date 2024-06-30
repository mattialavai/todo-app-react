import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import TodoList from './components/TodoList';
import Navbar from './components/Navbar';
import './App.css';  // Import the CSS file

const App = () => (
  <UserProvider>
    <div className="container">
      <header className="header">
        <Navbar />
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Route for ForgotPassword */}
          <Route path="/todo" element={<TodoList />} />
        </Routes>
      </main>
    </div>
  </UserProvider>
);

export default App;
