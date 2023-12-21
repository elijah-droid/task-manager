// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import Home from './components/Home';
import ViewTasks from './components/ViewTasks';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <NavLink to="/" className="navbar-brand">Task Manager</NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link" activeClassName="active" end>Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/add" className="nav-link" activeClassName="active">Add Task</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/view" className="nav-link" activeClassName="active">View Tasks</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <hr />

        <Routes>
          <Route path="/add" element={<TaskForm />} />
          <Route path="/view" element={<ViewTasks />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
