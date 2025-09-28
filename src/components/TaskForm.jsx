import React, { useState } from 'react';

export default function TaskForm({ addTask }) {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");
  const [dueDate, setDueDate] = useState(""); // Add state for due date

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTask({ text: task, priority, category, dueDate, completed: false });
    // Reset State:
    setTask("");
    setPriority("Medium");
    setCategory('General');
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className='task-form'>
      <input
        type="text"
        placeholder='Enter Your Task...'
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className='task-input'
      />
      <div className='task-options'>
        {/* Add the date input field */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="date-input"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        <button type='submit'>Add Task</button>
      </div>
    </form>
  );
}

