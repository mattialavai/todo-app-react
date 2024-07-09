import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const Signup = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const fileInputRef = useRef(null);

    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const user = { name, email, password, profileImage }; // Include profileImage in user object
        localStorage.setItem(email, JSON.stringify(user)); // Store user information in localStorage
        setUser({ name, email, profileImage }); // Set user context
        navigate('/todo');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file)); // Set profile image from file input
        } else {
            setProfileImage('');
        }
    };

    const handleRemoveImage = () => {
        setProfileImage('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="signup-container">
            <h2>Welcome on Board!</h2>
            <p>We're here to help you stay organized, prioritize tasks, and achieve your goals. Let's get started and make productivity a breeze.</p>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="profileImage">Upload Profile Image:</label>
                    <input type="file" id="profileImage" ref={fileInputRef} onChange={handleImageChange} />
                </div>
                {profileImage && (
                    <button type="button" onClick={handleRemoveImage} className="remove-image-button">Remove Image</button>
                )}
                <button type="submit">Signup</button>
            </form>
            <p className="login-link">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Signup;
