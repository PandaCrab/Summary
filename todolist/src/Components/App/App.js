import React, { useState, useEffect } from 'react';

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
      id: Date.now(),
      isCompleted: false
    }));
  };

  const [allTasks, setAllTasks] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTask.title || /^\s*$/.test(newTask.title)) return
    setAllTasks((prev) => [newTask, ...prev]);
    setNewTask({});
  };

  const completeTask = id => {
    const isComplite = allTasks.map(task => {
      if (task.id === id) {
        task.isCompleted = !task.isCompleted;
      }
      return task
    })
    setAllTasks(isComplite);
  }

  const addToTasks = (task) => {
    setAllTasks(task);
  }

  const handleDelete = (taskIdToRemove) => {
    setAllTasks((prev) => prev.filter((task) => task.id !== taskIdToRemove));
  };

  useEffect(() => {
    const temp = localStorage.getItem("tasks")
    const loadedTasks = JSON.parse(temp)

    if (loadedTasks) {
      setAllTasks(loadedTasks)
    }
  }, [])

  useEffect(() => {
    const temp = JSON.stringify(allTasks)
    localStorage.setItem("tasks", temp)
  }, [allTasks])


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
        <TodoList 
          allTasks={allTasks} 
          handleDelete={handleDelete}
          addToTasks={addToTasks}
          completeTask={completeTask} />
      </main>
    </>
  );
}

export default App;
