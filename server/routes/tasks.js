// routes/tasks.js
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import tasks from '../data/store.js';

const router = express.Router();

// ── GET /api/tasks ─────────────────────────────────────────────
// Returns all tasks sorted by createdAt descending (newest first).
// Optional query param: ?status=active|completed

router.get('/', (req, res) => {
  const { status } = req.query;

  let result = [...tasks].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (status === 'active') {
    result = result.filter((t) => !t.completed);
  } else if (status === 'completed') {
    result = result.filter((t) => t.completed);
  }

  res.json(result);
});

// ── POST /api/tasks ────────────────────────────────────────────
// Creates a new task.
// Body: { title, description?, dueDate? }
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
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ── PATCH /api/tasks/:id ───────────────────────────────────────
// Updates any fields on a task (title, description, dueDate, completed).
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

  res.json(task);
});

// ── DELETE /api/tasks/:id ──────────────────────────────────────
// Deletes a task by id.
router.delete('/:id', (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

export default router;