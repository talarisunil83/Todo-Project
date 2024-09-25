import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom' // Import useNavigate
import Cookies from 'js-cookie'
import Layout from '../Layout'

import './index.css'

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([])
  const [textInput, setTextInput] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('Complete Task')
  const [selectedTask, setSelectedTask] = useState(null)
  const navigate = useNavigate() // Use the useNavigate hook

  const onClickLogout = () => {
    Cookies.remove('jwt_token') // Remove the JWT token
    navigate('/login') // Use navigate to redirect to login
  }

  // UseEffect for StoredTasks in Local Storage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // Input change handlers
  const handleTextInputChange = event => setTextInput(event.target.value)
  const handlePriorityChange = event => setSelectedPriority(event.target.value)

  // Handle function when clicking on submit
  const handleTaskSubmit = () => {
    if (textInput.trim() === '') return

    const newTask = {
      text: textInput,
      priority: selectedPriority,
    }

    setTasks([...tasks, newTask])
    setTextInput('')
    setSelectedPriority('Complete Task') // Reset to updated value
  }

  const getTasksByPriority = priority =>
    tasks.filter(task => task.priority === priority)

  // Edit, change priority, and delete task functions
  const handleEditTask = editedText => {
    const updatedTasks = tasks.map(task =>
      task === selectedTask ? {...task, text: editedText} : task,
    )
    setTasks(updatedTasks)
    setSelectedTask(null)
  }

  const handleChangePriority = newPriority => {
    const updatedTasks = tasks.map(task =>
      task === selectedTask ? {...task, priority: newPriority} : task,
    )
    setTasks(updatedTasks)
    setSelectedTask(null)
  }

  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter(task => task !== selectedTask)
    setTasks(updatedTasks)
    setSelectedTask(null)
  }

  return (
    <div className="bg-main-conntainer">
      <div className="user-input-container">
        <input
          type="text"
          value={textInput}
          onChange={handleTextInputChange}
          placeholder="Enter task"
          className="input-task"
        />
        <div>
          <select
            className="select-input"
            value={selectedPriority}
            onChange={handlePriorityChange}
          >
            <option value="Complete Task">Complete Task</option>
            <option value="InProgress Task">InProgress Task</option>
            <option value="Pending Task">Pending Task</option>
          </select>
        </div>
        <button type="button" className="add-btn" onClick={handleTaskSubmit}>
          Add Task
        </button>
        <button
          type="button"
          className="logout-add-btn"
          onClick={onClickLogout}
        >
          LogOut
        </button>
      </div>

      <div className="task-item-container">
        {/* Completed Tasks */}
        <Layout
          getTasksByPriority={getTasksByPriority}
          setSelectedTask={setSelectedTask}
          selectedTask={selectedTask}
          handleEditTask={handleEditTask}
          handleChangePriority={handleChangePriority}
          handleDeleteTask={handleDeleteTask}
          level="Complete Task"
        />
        {/* InProgress Tasks */}
        <Layout
          getTasksByPriority={getTasksByPriority}
          setSelectedTask={setSelectedTask}
          selectedTask={selectedTask}
          handleEditTask={handleEditTask}
          handleChangePriority={handleChangePriority}
          handleDeleteTask={handleDeleteTask}
          level="InProgress Task"
        />
        {/* Pending Tasks */}
        <Layout
          getTasksByPriority={getTasksByPriority}
          setSelectedTask={setSelectedTask}
          selectedTask={selectedTask}
          handleEditTask={handleEditTask}
          handleChangePriority={handleChangePriority}
          handleDeleteTask={handleDeleteTask}
          level="Pending Task"
        />
      </div>
    </div>
  )
}

export default TaskDashboard
