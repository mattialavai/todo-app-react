import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from './UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
// import './Todo.css'; // Ensure your CSS file is imported for styling

const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim()) { // Check if value is not empty or only whitespace
            addTodo(value);
            setValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <div className="form-group">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="todo-input"
                    placeholder="What is the task today?"
                />
                <button type="submit" className="todo-btn">Add Task</button>
            </div>
        </form>
    );
};

const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
    const [editedTask, setEditedTask] = useState(task.task);
    const [editing, setEditing] = useState(false);

    const handleEditStart = () => {
        setEditing(true);
    };

    const handleInputChange = (e) => {
        setEditedTask(e.target.value);
    };

    const handleEditSave = () => {
        console.log('Saving edited task:', editedTask);
        editTodo(editedTask, task.id);
        setEditing(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleEditSave();
        }
    };

    return (
        <div className="Todo">
            {!editing ? (
                <div className="todo-text">
                    <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task.id)}>
                        {task.task}
                    </p>
                    <div className="icon-container">
                        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={handleEditStart} />
                        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTodo(task.id)} />
                    </div>
                </div>
            ) : (
                <div className="edit-form">
                    <input
                        type="text"
                        value={editedTask}
                        onChange={handleInputChange}
                        onBlur={handleEditSave}
                        onKeyPress={handleKeyPress}
                        autoFocus
                    />
                </div>
            )}
        </div>
    );
};

const TodoList = () => {
    const { user } = useContext(UserContext);
    const { id: userId, name, profileImage } = user; // Assuming 'id' is the user's unique identifier

    const [currentTime, setCurrentTime] = useState(new Date());
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // Load todos for the current user from localStorage or backend
        const savedTodos = JSON.parse(localStorage.getItem(`todos_${userId}`)) || [];
        setTodos(savedTodos);
    }, [userId]); // Reload todos whenever userId changes

    useEffect(() => {
        // Save todos to localStorage whenever todos change
        localStorage.setItem(`todos_${userId}`, JSON.stringify(todos));
    }, [todos, userId]); // Save todos whenever todos or userId changes

    const addTodo = (todo) => {
        const newTodos = [...todos, { id: uuidv4(), task: todo, completed: false }];
        setTodos(newTodos);
    };

    const toggleComplete = (id) => {
        const newTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
    };

    const deleteTodo = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    const editTodo = (editedTask, id) => {
        const newTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, task: editedTask } : todo
        );
        setTodos(newTodos);
    };

    // Calculate current time values
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const second = currentTime.getSeconds();
    const hourDegrees = (hour % 12) * 30 + minute / 2; // 360 / 12 = 30
    const minuteDegrees = minute * 6; // 360 / 60 = 6
    const secondDegrees = second * 6; // 360 / 60 = 6

    return (
        <div className="todo-container">
            <div className="user-profile">
                {profileImage && <img src={profileImage} alt="Profile" className="profile-image" />}
                <h2>Welcome back, {name}!</h2>
            </div>
            <div className="clock">
                <div className="clock-face">
                    {[...Array(12).keys()].map((num) => (
                        <div key={num} className="clock-label" style={{ transform: `rotate(${num * 30}deg)` }}>
                            <span style={{ transform: `rotate(-${num * 30}deg)` }}>{num === 0 ? 12 : num}</span>
                        </div>
                    ))}
                    <div className="hand hour-hand" style={{ transform: `rotate(${hourDegrees}deg)` }}></div>
                    <div className="hand minute-hand" style={{ transform: `rotate(${minuteDegrees}deg)` }}></div>
                    <div className="hand second-hand" style={{ transform: `rotate(${secondDegrees}deg)` }}></div>
                </div>
            </div>
            <div className="greeting">
                <p style={{ marginLeft: '20px' }}>Good {hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening'},!</p>
            </div>
            <div className="tasks">
                <h1>Get Things Done!</h1>
                <TodoForm addTodo={addTodo} />
                {todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        task={todo}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                        toggleComplete={toggleComplete}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
