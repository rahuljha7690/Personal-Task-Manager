// api/tasks.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '';
const BASE = `${BASE_URL}/api/tasks`;

// Extracting a clean error message from an Axios error
function extractError(err) {
  if (err.response) {
    return err.response.data?.error || `Server error: ${err.response.status}`;
  }
  if (err.request) {
    // Request was made but no response received
    return 'Cannot reach the server. Is the backend running?';
  }
  // Something else went wrong
  return err.message || 'An unexpected error occurred.';
}

export const fetchTasks = async (status, search) => {
  try {
    const params = {};
    if (status && status !== 'all') params.status = status;
    if (search && search.trim() !== '') params.search = search.trim();
    const res = await axios.get(BASE, { params });
    return res.data;
  } catch (err) {
    throw new Error(extractError(err));
  }
};

export const createTask = async (data) => {
  try {
    const res = await axios.post(BASE, data);
    return res.data;
  } catch (err) {
    throw new Error(extractError(err));
  }
};

export const updateTask = async (id, data) => {
  try {
    const res = await axios.patch(`${BASE}/${id}`, data);
    return res.data;
  } catch (err) {
    throw new Error(extractError(err));
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${BASE}/${id}`);
  } catch (err) {
    throw new Error(extractError(err));
  }
};

export const reorderTasks = async (orderedIds) => {
  try {
    await axios.patch(`${BASE}/reorder/apply`, { orderedIds });
  } catch (err) {
    throw new Error(extractError(err));
  }
};