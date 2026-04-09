import { useMemo, useState } from 'react';
import TaskInput from './components/TaskInput.jsx';
import TaskList from './components/TaskList.jsx';
import Filter from './components/Filter.jsx';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' }
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleAddTask = (title) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    setTasks((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        title: trimmed,
        completed: false
      }
    ]);
  };

  const handleToggleTask = (taskId) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((task) => !task.completed);
    if (filter === 'completed') return tasks.filter((task) => task.completed);
    return tasks;
  }, [filter, tasks]);

  return (
    <div className="app-shell">
      <div className="task-card">
        <header className="task-header">
          <h1>Task Manager</h1>
          <p>Keep your tasks simple, focused, and complete.</p>
        </header>

        <TaskInput onAddTask={handleAddTask} />

        <Filter
          filters={FILTERS}
          activeFilter={filter}
          onChangeFilter={setFilter}
        />

        <TaskList tasks={filteredTasks} onToggleTask={handleToggleTask} />

        <footer className="task-footer">
          <p>{tasks.length} task{tasks.length === 1 ? '' : 's'} total</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
