'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react'
import TaskList from './components/TaskList';

const task = {id: 1, text: "Todo Test", completed: false}

export default function Home() {
  // const tasks = []; // rewrite using states
  // const filter = 'all'; // rewrite using states
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [input, setInput] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      setTasks([...tasks, {id: tasks.length + 1, text: trimmedInput, completed: false}]);
      setInput('');
    } 
  };

  const handleToggleTask = (id) => {
      // Implement toggle completed/uncompleted task logic here
      setTasks(
        tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleDeleteTask = (id) => {
      // Implement delete task logic here
      setTasks(
        tasks.filter(task => task.id !== id));
  };

  const handleClearing = () => {
      setTasks( 
        tasks.filter(task => !task.completed)
      );
  }

  const uncompletedTasks = tasks.filter(task => !task.completed).length

  const filteredTasks = tasks.filter( task =>
   {if (filter === 'all' ) return true;
   if (filter === 'active' ) return !task.completed;
   if (filter === 'completed' ) return task.completed;})

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
        
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
          value={input}
          onChange={(event) => {setInput(event.target.value)}}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        {/* Medium level: extract todo's listing to TaskList component */}
        {/* Basic level: map through tasks state by using this code: */}
        <TaskList filteredTasks={filteredTasks} onToggle={handleToggleTask} onDelete={handleDeleteTask}/>
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span> {uncompletedTasks} items left</span>  {/* show how many uncompleted items left */}
          <div>
            <button onClick={() => setFilter('all')} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
            <button onClick={() => setFilter('active')} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
            <button onClick={() => setFilter('completed')} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
          </div>
          <button
            onClick={() => handleClearing()}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
