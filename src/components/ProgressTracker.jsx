import React from 'react';

export default function ProgressTracker({ tasks }) {
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <div className='progress-tracker'>
      <p>
        {completedTasks} of {totalTasks} tasks completed
      </p>
      <div className='progress-bar-container'>
        <div 
          className='progress-bar-fill'
          style={{ width: `${percentage}%` }}
        >
        </div>
      </div>
    </div>
  );
}
