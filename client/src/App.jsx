// App.jsx
import { useState } from 'react';
import { useTasks } from './hooks/useTasks.js';
import FilterTabs from './components/FilterTabs.jsx';
import TaskStats from './components/TaskStats.jsx';
import TaskList from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';
import EditModal from './components/EditModal.jsx';
import DeleteDialog from './components/DeleteDialog.jsx';
import SearchBar from './components/SearchBar.jsx';

export default function App() {
  const {
    tasks,
    filter,
    setFilter,
    search,
    setSearch,
    loading,
    error,
    setError,
    addTask,
    toggleTask,
    editTask,
    removeTask,
    reorderTaskList,
    activeCount,
    completedCount,
  } = useTasks();

  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const handleConfirmDelete = async (id) => {
    await removeTask(id);
    setDeletingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <p className="text-gray-400 text-sm mt-1">Stay on top of your work</p>
        </div>

        {/* Global error toast */}
        {error && (
          <div className="mb-4 flex items-start justify-between gap-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-600 shrink-0"
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mb-6">
          <TaskStats activeCount={activeCount} completedCount={completedCount} />
        </div>

        {/* Add task form */}
        <TaskForm onAdd={addTask} />

        {/* Search */}
        <SearchBar search={search} onSearchChange={setSearch} />

        {/* Filter tabs */}
        <div className="mb-4">
          <FilterTabs filter={filter} onFilterChange={setFilter} />
        </div>

        {/* Task list */}
        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onToggle={toggleTask}
          onEdit={(task) => setEditingTask(task)}
          onDelete={(task) => setDeletingTask(task)}
          onReorder={reorderTaskList}
        />
      </div>

      <EditModal
        task={editingTask}
        onSave={editTask}
        onClose={() => setEditingTask(null)}
      />

      <DeleteDialog
        task={deletingTask}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingTask(null)}
      />
    </div>
  );
}