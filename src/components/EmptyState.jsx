import React from 'react';

export default function EmptyState() {
  return (
    <div className="empty-state-container">
      <div className="empty-state-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.5a.5.5 0 0 0 1 0V5.5z"/>
          <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 8l-2.147 2.146a.5.5 0 0 0 .708.708l3-3zM1 8a.5.5 0 0 0 .5.5h11.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L13.293 8H1.5A.5.5 0 0 0 1 8z"/>
        </svg>
      </div>
      <h2>Welcome to OrganizeX!</h2>
      <p>Your task list is currently empty. Get started by adding a new task above.</p>
    </div>
  );
}
