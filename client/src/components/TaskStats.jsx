// components/TaskStats.jsx
export default function TaskStats({ activeCount, completedCount }) {
  return (
    <div className="flex gap-4">
      <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 text-center">
        <p className="text-2xl font-bold text-blue-600">{activeCount}</p>
        <p className="text-xs text-blue-400 uppercase tracking-wide">Active</p>
      </div>
      <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-2 text-center">
        <p className="text-2xl font-bold text-green-600">{completedCount}</p>
        <p className="text-xs text-green-400 uppercase tracking-wide">Done</p>
      </div>
    </div>
  );
}