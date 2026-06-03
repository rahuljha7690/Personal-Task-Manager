// hooks/useTasks.js
import { useState, useEffect, useCallback } from 'react';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  reorderTasks,
} from '../api/tasks.js';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]); // used only for counts
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce search by 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Load filtered + searched tasks for the list
  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks(filter, debouncedSearch);
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, [filter, debouncedSearch]);

  // Load ALL tasks (no filter, no search) just for accurate counts
  const loadAllTasks = useCallback(async () => {
    try {
      const data = await fetchTasks();
      setAllTasks(data);
    } catch {
      // silently fail — counts are non-critical
    }
  }, []);

  useEffect(() => {
    loadTasks();
    loadAllTasks();
  }, [loadTasks, loadAllTasks]);

  const addTask = async (taskData) => {
    const newTask = await createTask(taskData);
    setTasks((prev) => [newTask, ...prev]);
    setAllTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = async (id, completed) => {
    const updated = await updateTask(id, { completed: !completed });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    setAllTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const editTask = async (id, data) => {
    const updated = await updateTask(id, data);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    setAllTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setAllTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const reorderTaskList = async (newTasks) => {
    setTasks(newTasks);
    await reorderTasks(newTasks.map((t) => t.id));
  };

  // Counts always based on allTasks, never affected by search or filter
  const activeCount = allTasks.filter((t) => !t.completed).length;
  const completedCount = allTasks.filter((t) => t.completed).length;

  return {
    tasks,
    filter,
    setFilter,
    search,
    setSearch,
    loading,
    error,
    addTask,
    toggleTask,
    editTask,
    removeTask,
    reorderTaskList,
    activeCount,
    completedCount,
  };
}