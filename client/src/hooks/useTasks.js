// hooks/useTasks.js
import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/tasks.js';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks(filter);
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  // Reload whenever filter changes
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (taskData) => {
    const newTask = await createTask(taskData);
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = async (id, completed) => {
    const updated = await updateTask(id, { completed: !completed });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const editTask = async (id, data) => {
    const updated = await updateTask(id, data);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return {
    tasks,
    filter,
    setFilter,
    loading,
    error,
    addTask,
    toggleTask,
    editTask,
    removeTask,
    activeCount,
    completedCount,
  };
}