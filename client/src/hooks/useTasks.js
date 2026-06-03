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
  const [allTasks, setAllTasks] = useState([]);
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

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks(filter, debouncedSearch);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filter, debouncedSearch]);

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
    try {
      const newTask = await createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
      setAllTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      throw err; // TaskForm handle and show the error
    }
  };

  const toggleTask = async (id, completed) => {
    // Optimistic update — flip immediately, revert on failure
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
    );
    setAllTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
    );
    try {
      const updated = await updateTask(id, { completed: !completed });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      setAllTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed } : t))
      );
      setAllTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed } : t))
      );
      setError(err.message);
    }
  };

  const editTask = async (id, data) => {
    try {
      const updated = await updateTask(id, data);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      setAllTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      throw err; 
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setAllTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const reorderTaskList = async (newTasks) => {
    // Optimistic update — reorder immediately, revert on failure
    const previousTasks = tasks;
    setTasks(newTasks);
    try {
      await reorderTasks(newTasks.map((t) => t.id));
    } catch (err) {
      setTasks(previousTasks); // revert
      setError(err.message);
    }
  };

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
    setError,
    addTask,
    toggleTask,
    editTask,
    removeTask,
    reorderTaskList,
    activeCount,
    completedCount,
  };
}