// src/components/ViewTasks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTask, setEditedTask] = useState({ id: null, title: '', description: '' });

  useEffect(() => {
    // Fetch tasks from the API
    axios.get('http://localhost:8000/api/tasks/')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleDelete = (taskId) => {
    // Delete a task
    axios.delete(`http://localhost:8000/api/tasks/${taskId}`)
      .then(response => {
        console.log('Task deleted:', response.data);
        // Update the tasks list after deletion
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleEdit = (taskId) => {
    // Find the task by ID
    const taskToEdit = tasks.find(task => task.id === taskId);
    // Set the edited task and show the modal
    setEditedTask(taskToEdit);
    setShowEditModal(true);
  };

  const handleModalClose = () => {
    // Close the modal and reset the edited task
    setShowEditModal(false);
    setEditedTask({ id: null, title: '', description: '' });
  };

  const handleModalSave = () => {
    // Save the edited task by sending a PUT request to the API
    axios.put(`http://localhost:8000/api/tasks/${editedTask.id}/`, editedTask)
      .then(response => {
        console.log('Task updated:', response.data);
        // Fetch the updated tasks
        axios.get('http://localhost:8000/api/tasks/')
          .then(response => setTasks(response.data))
          .catch(error => console.error('Error fetching tasks:', error));
        // Close the modal
        setShowEditModal(false);
        // Reset the edited task
        setEditedTask({ id: null, title: '', description: '' });
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const handleInputChange = (e) => {
    // Update the edited task based on user input
    setEditedTask({
      ...editedTask,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>View Tasks</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEdit(task.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Task Modal */}
      <Modal show={showEditModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTaskTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                name="title"
                value={editedTask.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                name="description"
                value={editedTask.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewTasks;
