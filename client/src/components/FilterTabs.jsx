// components/FilterTabs.jsx
const FILTERS = ['all', 'active', 'completed'];

export default function FilterTabs({ filter, onFilterChange }) {
  return (
    <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
            filter === f
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}