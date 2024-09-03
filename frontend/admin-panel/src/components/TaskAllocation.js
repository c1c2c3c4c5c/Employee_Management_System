import React, { useState, useEffect } from 'react';
import './TaskAllocation.css';

// Function to fetch tasks from the backend
const fetchTasks = async () => {
  try {
    const response = await fetch('/api/tasks');
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

// Function to add a new task to the backend
const addTask = async (task) => {
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to add task');
    return await response.json();
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

const TaskAllocation = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', deadline: '' });

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };
    loadTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addedTask = await addTask(newTask);
    if (addedTask) {
      setTasks([...tasks, addedTask]);
      setNewTask({ title: '', description: '', deadline: '' });
    }
  };

  return (
    <div className="task-allocation-container">
      <div className="task-allocation-form">
        <h2>Allocate Task</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="description">Task Description</label>
          <textarea
            id="description"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            required
          ></textarea>

          <label htmlFor="deadline">Task Deadline</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={newTask.deadline}
            onChange={handleInputChange}
            required
          />

          <button type="submit">Allocate Task</button>
        </form>
      </div>
      <div className="task-list">
        <h2>Task List</h2>
        {tasks.map((task, index) => (
          <div
            key={index}
            className="task-item"
          >
            <div className="task-details">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
            </div>
            <div className="task-progress">
              <span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskAllocation;
