import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from './UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim()) {
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
                <button type="submit" className="todo-btn">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
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
                    <p
                        className={`${task.completed ? 'completed' : 'incompleted'}`}
                        onClick={() => toggleComplete(task.id)}
                    >
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
    const { email, name } = user;

    const [currentTime, setCurrentTime] = useState(new Date());
    const [todos, setTodos] = useState([]);
    const [profileImage, setProfileImage] = useState(null); // Initialize as null

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem(`todos_${email}`)) || [];
        setTodos(savedTodos);

        const savedUser = JSON.parse(localStorage.getItem(email));
        if (savedUser && savedUser.profileImage) {
            setProfileImage(savedUser.profileImage);
        } else {
            setProfileImage(null); // Set profile image to null if not found
        }
    }, [email]);

    useEffect(() => {
        localStorage.setItem(`todos_${email}`, JSON.stringify(todos));
    }, [todos, email]);

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

    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const second = currentTime.getSeconds();
    const hourDegrees = (hour % 12) * 30 + minute / 2;
    const minuteDegrees = minute * 6;
    const secondDegrees = second * 6;

    useEffect(() => {
        document.querySelector('.hour').style.transform = `rotate(${hourDegrees}deg)`;
        document.querySelector('.minute').style.transform = `rotate(${minuteDegrees}deg)`;
        document.querySelector('.second').style.transform = `rotate(${secondDegrees}deg)`;
    }, [hourDegrees, minuteDegrees, secondDegrees]);

    return (
        <div className="todo-container">
            <div className="user-profile">
                {profileImage ? (
                    <img src={profileImage} alt="Profile" className="profile-image" />
                ) : (
                    <div className="default-profile-image"></div> // Add a default profile image or placeholder
                )}
                <h2>Welcome back, {name}!</h2>
            </div>
            <div className="clock">
                <div className="numbers">
                    <div className="twelve">12</div>
                    <div className="three">3</div>
                    <div className="six">6</div>
                    <div className="nine">9</div>
                </div>
                <div className="arrows">
                    <div className="hour"></div>
                    <div className="minute"></div>
                    <div className="second"></div>
                </div>
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Rolex_logo.svg/1200px-Rolex_logo.svg.png" alt="rolex-logo" />
            </div>
            <div className="greeting">
                <p style={{ marginLeft: '20px' }}>Good {hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening'}, {name}!</p>
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
