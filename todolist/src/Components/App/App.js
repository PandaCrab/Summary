import React, { useState } from 'react';

import './App.css';

import TodoList from '../Todo/TodoList/TodoList';
import TodoForm from '../Todo/TodoForm';

function App() {

  const [newTask, setNewTask] = useState({});
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
      id: Date.now()
    }));
  };

  const [allTasks, setAllTasks] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTask.title) return
    setAllTasks((prev) => [newTask, ...prev]);
    setNewTask({});
  };

  const handleDelete = (taskIdToRemove) => {
    setAllTasks((prev) => prev.filter((task) => task.id !== taskIdToRemove));
  };

  return (
    <>
        <div className="header">
          <h1 className="header-t">Todos</h1>
        </div>
        <main>
        <TodoForm
        newTask={newTask}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        />
        <TodoList allTasks={allTasks} handleDelete={handleDelete} />
      </main>
    </>
  );
}

export default App;
