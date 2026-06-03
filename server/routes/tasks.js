// routes/tasks.js
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { tasks, saveTasks } from '../data/store.js';

const router = express.Router();

// ── GET /api/tasks ─────────────────────────────────────────────
// Returns tasks sorted by order field first, then createdAt.
// Optional query param: ?status=active|completed&search=keyword
router.get('/', (req, res) => {
  const { status, search } = req.query;

  let result = [...tasks].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (status === 'active') {
    result = result.filter((t) => !t.completed);
  } else if (status === 'completed') {
    result = result.filter((t) => t.completed);
  }

  if (search && search.trim() !== '') {
    const keyword = search.trim().toLowerCase();
    result = result.filter((t) =>
      t.title.toLowerCase().includes(keyword)
    );
  }

  res.json(result);
});

// ── POST /api/tasks ────────────────────────────────────────────
router.post('/', (req, res) => {
  const { title, description = '', dueDate = null } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required.' });
  }

  const newTask = {
    id: uuidv4(),
    title: title.trim(),
    description: description.trim(),
    dueDate,
    completed: false,
    createdAt: new Date().toISOString(),
    order: tasks.length,
  };

  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
});

// ── PATCH /api/tasks/:id ───────────────────────────────────────
router.patch('/:id', (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  const { title, description, dueDate, completed } = req.body;

  if (title !== undefined) {
    if (title.trim() === '') {
      return res.status(400).json({ error: 'Title cannot be empty.' });
    }
    task.title = title.trim();
  }

  if (description !== undefined) task.description = description.trim();
  if (dueDate !== undefined) task.dueDate = dueDate;
  if (completed !== undefined) task.completed = completed;

  saveTasks(tasks);
  res.json(task);
});

// ── PATCH /api/tasks/reorder ───────────────────────────────────
// Accepts a new ordered array of task ids and updates order field.
// Body: { orderedIds: ['id1', 'id2', ...] }
router.patch('/reorder/apply', (req, res) => {
  const { orderedIds } = req.body;

  if (!Array.isArray(orderedIds)) {
    return res.status(400).json({ error: 'orderedIds must be an array.' });
  }

  orderedIds.forEach((id, index) => {
    const task = tasks.find((t) => t.id === id);
    if (task) task.order = index;
  });

  saveTasks(tasks);
  res.json({ success: true });
});

// ── DELETE /api/tasks/:id ──────────────────────────────────────
router.delete('/:id', (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  tasks.splice(index, 1);
  saveTasks(tasks);
  res.status(204).send();
});

export default router;