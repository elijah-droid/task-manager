// src/components/TaskForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    }
    setError(''); // Clear error when the user starts typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the title and description fields
    if (!title.trim()) {
      setError('Please enter a title for the task.');
      return;
    }

    // Create a new task
    const newTask = { title, description };

    axios.post('http://localhost:8000/api/tasks/', newTask)
      .then(response => {
        console.log('Task created:', response.data);
        setTitle('');
        setDescription('');
        navigate('/view');
      })
      .catch(error => {
        console.error('Error creating task:', error);
        // You can customize the error handling, for example, show a message to the user.
        alert('Error creating task. Please try again.');
      });
  };

  return (
    <div className="mt-4">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            name="title"
            className={`form-control ${error ? 'is-invalid' : ''}`}
            id="title"
            value={title}
            onChange={handleInputChange}
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            name="description"
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
