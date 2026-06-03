// App.jsx
import { useTasks } from './hooks/useTasks.js';
import FilterTabs from './components/FilterTabs.jsx';
import TaskStats from './components/TaskStats.jsx';
import TaskList from './components/TaskList.jsx';

export default function App() {
  const {
    tasks,
    filter,
    setFilter,
    loading,
    error,
    toggleTask,
    activeCount,
    completedCount,
  } = useTasks();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <p className="text-gray-400 text-sm mt-1">Stay on top of your work</p>
        </div>

        {/* Stats */}
        <div className="mb-6">
          <TaskStats activeCount={activeCount} completedCount={completedCount} />
        </div>

        {/* Filter tabs */}
        <div className="mb-6">
          <FilterTabs filter={filter} onFilterChange={setFilter} />
        </div>

        {/* Task list */}
        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onToggle={toggleTask}
          onEdit={(task) => console.log('edit', task)}
          onDelete={(task) => console.log('delete', task)}
        />

      </div>
    </div>
  );
}