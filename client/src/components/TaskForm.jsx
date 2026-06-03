// components/TaskForm.jsx
import { useState } from 'react';

const EMPTY_FORM = { title: '', description: '', dueDate: '' };

export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === 'title') setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }
    setLoading(true);
    try {
      await onAdd({
        title: form.title.trim(),
        description: form.description.trim(),
        dueDate: form.dueDate || null,
      });
      setForm(EMPTY_FORM);
      setExpanded(false);
    } catch (err) {
      setError('Failed to add task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6"
    >
      {/* Title row */}
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            onFocus={() => setExpanded(true)}
            placeholder="Add a new task..."
            className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors ${
              error
                ? 'border-red-400 focus:border-red-500'
                : 'border-gray-200 focus:border-blue-400'
            }`}
          />
          {error && (
            <p className="text-red-500 text-xs mt-1">{error}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shrink-0"
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>

      {/* Expanded fields */}
      {expanded && (
        <div className="mt-3 flex flex-col gap-2">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description (optional)"
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-400 text-sm outline-none resize-none transition-colors"
          />
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-400 shrink-0">Due date</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="px-3 py-1.5 rounded-lg border border-gray-200 focus:border-blue-400 text-sm outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => { setExpanded(false); setForm(EMPTY_FORM); setError(''); }}
              className="ml-auto text-xs text-gray-400 hover:text-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </form>
  );
}