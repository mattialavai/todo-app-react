import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
// import './Todo.css'; // Ensure this file exists and includes necessary styles

const TodoList = () => {
  const { user } = useContext(UserContext);
  const { name, profileImage } = user;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const second = currentTime.getSeconds();
  const hourDegrees = (hour % 12) * 30 + minute / 2; // 360 / 12 = 30
  const minuteDegrees = minute * 6; // 360 / 60 = 6
  const secondDegrees = second * 6; // 360 / 60 = 6

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, done: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

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
        <h3>Today's Tasks</h3>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={task.done ? 'task-done' : ''}>
              {task.text}
              <button onClick={() => toggleTask(index)}>{task.done ? 'Undo' : 'Done'}</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <div className="add-task">
          <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add a new task" />
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
