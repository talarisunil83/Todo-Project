import React from 'react'
import Action from '../Action'
import './index.css'

function Layout({
  level,
  getTasksByPriority,
  setSelectedTask,
  selectedTask,
  handleEditTask,
  handleChangePriority,
  handleDeleteTask,
}) {
  const tasks = getTasksByPriority(level)

  return (
    <div className="task-container">
      <h2>
        {level} {/* This will now show updated priority levels */}
      </h2>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <div key={task.text} className="task-list-container">
            {' '}
            {/* Use a unique identifier */}
            <p className="task-name" onClick={() => setSelectedTask(task)}>
              - {task.text}
            </p>
            {selectedTask === task && (
              <Action
                priority={level}
                handleEditTask={handleEditTask}
                handleChangePriority={handleChangePriority}
                handleDeleteTask={handleDeleteTask}
                selectedTask={selectedTask}
              />
            )}
          </div>
        ))
      ) : (
        <div></div>
        // Handle empty task list
      )}
    </div>
  )
}

export default Layout
