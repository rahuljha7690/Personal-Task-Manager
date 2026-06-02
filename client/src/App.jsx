// App.jsx
import { useTasks } from './hooks/useTasks.js';

export default function App() {
  const { tasks, loading, error } = useTasks();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Task Manager</h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <p className="text-gray-600">
          {tasks.length === 0 ? 'No tasks yet.' : `${tasks.length} task(s) loaded.`}
        </p>
      )}
    </div>
  );
}