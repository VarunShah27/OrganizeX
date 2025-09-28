import React, { useState, useEffect } from 'react';

export default function EditTaskModal({ task, onSave, onCancel }) {
  // Initialize state with the task being edited
  const [editedTask, setEditedTask] = useState(task);

  // Update the modal's state if a different task is selected
  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };

  if (!task) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit} className="edit-form">
          <input
            name="text"
            type="text"
            className="task-input"
            value={editedTask.text}
            onChange={handleChange}
          />
          <div className="task-options">
            <input
              name="dueDate"
              type="date"
              className="date-input"
              value={editedTask.dueDate || ''}
              onChange={handleChange}
            />
            <select name="priority" value={editedTask.priority} onChange={handleChange}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select name="category" value={editedTask.category} onChange={handleChange}>
              <option value="General">General</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
            <button type="submit" className="save-btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
