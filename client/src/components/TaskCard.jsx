// components/TaskCard.jsx

function isOverdue(dueDate, completed) {
  if (!dueDate || completed) return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const overdue = isOverdue(task.dueDate, task.completed);

  return (
    <div
      className={`bg-white rounded-xl border p-4 shadow-sm transition-all ${
        task.completed
          ? 'border-gray-100 opacity-60'
          : overdue
          ? 'border-red-200 bg-red-50'
          : 'border-gray-200 hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-3">

        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id, task.completed)}
          className={`mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
            task.completed
              ? 'bg-green-500 border-green-500'
              : overdue
              ? 'border-red-400 hover:border-red-500'
              : 'border-gray-300 hover:border-blue-400'
          }`}
          aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.completed && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className={`font-medium text-gray-800 truncate ${
              task.completed ? 'line-through text-gray-400' : ''
            }`}
          >
            {task.title}
          </p>

          {task.description && (
            <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
              {task.description}
            </p>
          )}

          {task.dueDate && (
            <p
              className={`text-xs mt-1.5 font-medium ${
                overdue ? 'text-red-500' : 'text-gray-400'
              }`}
            >
              {overdue ? '⚠ Overdue · ' : '📅 '}
              {formatDate(task.dueDate)}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-1 shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Edit task"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 0110 16H8v-2a2 2 0 01.586-1.414z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task)}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Delete task"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a1 1 0 00-1-1h-4a1 1 0 00-1 1m-4 0h10" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}