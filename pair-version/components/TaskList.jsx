function TaskList({ tasks, onToggleTask }) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks yet. Add one to get started.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${task.completed ? 'completed' : ''}`}
        >
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
            />
          </label>
          <p className={`task-title ${task.completed ? 'completed' : ''}`}>
            {task.title}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
