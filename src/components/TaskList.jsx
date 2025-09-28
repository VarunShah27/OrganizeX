import React from 'react';
// We no longer need to import EmptyState here

export default function TaskList({ tasks, updateTask, deleteTask, onEdit }) {
  const toggleComplete = (originalTask, index) => {
    const updatedTask = { ...originalTask, completed: !originalTask.completed };
    updateTask(updatedTask, index);
  };

  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return '';
    const today = new Date();
    const taskDate = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);

    if (taskDate < today) return 'overdue';
    if (taskDate.getTime() === today.getTime()) return 'due-today';
    return '';
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    const category = task.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(task);
    return acc;
  }, {});

  const categoryOrder = ['Work', 'Personal', 'General'];

  // If search finds no results, we can show a message here.
  if (tasks.length === 0) {
    return <p className="no-results">No tasks match your search.</p>;
  }

  return (
    <div className="task-list-container">
      {categoryOrder.map(category => {
        if (!groupedTasks[category] || groupedTasks[category].length === 0) {
          return null;
        }

        const sortedTasks = groupedTasks[category].sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });

        return (
          <div key={category} className="task-category-section">
            <h2 className="category-title">{category}</h2>
            <ul className="task-list">
              {sortedTasks.map((task) => {
                const originalIndex = tasks.findIndex(t => t === task); // Note: this might need adjustment for production apps
                const dueDateStatus = getDueDateStatus(task.dueDate);

                return (
                  <li key={originalIndex} className={`${task.completed ? 'completed' : ''} ${dueDateStatus}`}>
                    <div className="task-details">
                      <span className="task-text">{task.text} </span>
                      {task.dueDate && <small className="due-date">Due: {task.dueDate}</small>}
                      <div className="task-tags">
                        <small className={`priority-tag ${task.priority.toLowerCase()}`}>{task.priority}</small>
                        <small className="category-tag">{task.category}</small>
                      </div>
                    </div>
                    <div className="task-actions">
                      <button onClick={() => onEdit(originalIndex)}>Edit</button>
                      <button onClick={() => toggleComplete(task, originalIndex)}>
                        {task.completed ? 'Undo' : 'Complete'}
                      </button>
                      <button className="delete-btn" onClick={() => deleteTask(originalIndex)}>Delete</button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

