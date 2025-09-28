import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ProgressTracker from './components/ProgressTracker';
import EditTaskModal from './components/EditTaskModal';
import SearchBar from './components/SearchBar';
import EmptyState from './components/EmptyState'; // Import EmptyState here
import Confetti from 'react-confetti';
import './Style.css';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [editingTask, setEditingTask] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    const allCompleted = tasks.length > 0 && tasks.every(task => task.completed);
    if (allCompleted) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    } else {
      setShowConfetti(false);
    }
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };
  const updateTask = (updatedTask, index) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
    setEditingTask(null);
    setEditingIndex(null);
  };
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };
  const clearTasks = () => {
    setTasks([]);
  };
  const handleEdit = (index) => {
    setEditingTask(tasks[index]);
    setEditingIndex(index);
  };
  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditingIndex(null);
  };

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='App'>
      {showConfetti && <Confetti />}
      <div className="aurora-container">
        <div className="blob one"></div>
        <div className="blob two"></div>
        <div className="blob three"></div>
      </div>
      <main>
        <header>
          <h1 className='title'>OrganizeX</h1>
          <p className='tagline'>Your friendly Task Manager</p>
        </header>

        <TaskForm addTask={addTask} />
        
        <div className="tasks-section">
          {/* We only show the search bar if there are tasks to search through */}
          {tasks.length > 0 && (
            <SearchBar searchQuery={searchQuery} onSearch={setSearchQuery} />
          )}

          {/* === THIS IS THE KEY LOGIC CHANGE === */}
          {tasks.length === 0 ? (
            <EmptyState />
          ) : (
            <TaskList
              tasks={filteredTasks}
              updateTask={updateTask}
              deleteTask={deleteTask}
              onEdit={handleEdit}
            />
          )}
        </div>
        
        {tasks.length > 0 && <ProgressTracker tasks={tasks} />}

        {tasks.length > 0 && (
          <button className='clear-btn' onClick={clearTasks}>
            Clear All Tasks
          </button>
        )}
      </main>
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={(updatedTask) => updateTask(updatedTask, editingIndex)}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}

