import './index.css'

const Action = ({
  priority,
  selectedTask,
  handleEditTask,
  handleChangePriority,
  handleDeleteTask,
}) => (
  <div className="button-container">
    <button
      type="button"
      className="action-btn"
      onClick={() => handleEditTask(prompt('Edit task:', selectedTask.text))}
    >
      Edit
    </button>
    <button
      type="button"
      className="action-btn"
      onClick={() => {
        window.alert(`Press Sure Want to Delete ${priority} Priority Task`)
        handleDeleteTask()
      }}
    >
      Delete
    </button>
  </div>
)

export default Action
