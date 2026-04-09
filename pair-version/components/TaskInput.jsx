import { useState } from 'react';

function TaskInput({ onAddTask }) {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTask(value);
    setValue('');
  };

  return (
    <form className="task-input-form" onSubmit={handleSubmit}>
      <input
        className="task-input-field"
        type="text"
        placeholder="Add a new task"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button className="task-add-button" type="submit">
        Add
      </button>
    </form>
  );
}

export default TaskInput;
