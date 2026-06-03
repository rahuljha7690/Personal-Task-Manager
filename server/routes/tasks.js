// routes/tasks.js
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { tasks, saveTasks } from '../data/store.js';

const router = express.Router();

// ── GET /api/tasks ─────────────────────────────────────────────
router.get('/', async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
});

// ── POST /api/tasks ────────────────────────────────────────────
router.post('/', async (req, res, next) => {
  try {
    const { title, description = '', dueDate = null } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required.' });
    }

    if (typeof title !== 'string') {
      return res.status(400).json({ error: 'Title must be a string.' });
    }

    if (title.trim().length > 200) {
      return res.status(400).json({ error: 'Title must be under 200 characters.' });
    }

    if (dueDate && isNaN(new Date(dueDate).getTime())) {
      return res.status(400).json({ error: 'Invalid due date format.' });
    }

    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      order: tasks.length,
    };

    tasks.push(newTask);
    saveTasks(tasks);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

// ── PATCH /api/tasks/reorder/apply ────────────────────────────
// Must be defined BEFORE /:id so Express doesn't treat 'reorder' as an id
router.patch('/reorder/apply', async (req, res, next) => {
  try {
    const { orderedIds } = req.body;

    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ error: 'orderedIds must be an array.' });
    }

    if (orderedIds.some((id) => typeof id !== 'string')) {
      return res.status(400).json({ error: 'All ids must be strings.' });
    }

    orderedIds.forEach((id, index) => {
      const task = tasks.find((t) => t.id === id);
      if (task) task.order = index;
    });

    saveTasks(tasks);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// ── PATCH /api/tasks/:id ───────────────────────────────────────
router.patch('/:id', async (req, res, next) => {
  try {
    const task = tasks.find((t) => t.id === req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    const { title, description, dueDate, completed } = req.body;

    // Reject empty request body
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body cannot be empty.' });
    }

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title must be a non-empty string.' });
      }
      if (title.trim().length > 200) {
        return res.status(400).json({ error: 'Title must be under 200 characters.' });
      }
      task.title = title.trim();
    }

    if (description !== undefined) {
      if (typeof description !== 'string') {
        return res.status(400).json({ error: 'Description must be a string.' });
      }
      task.description = description.trim();
    }

    if (dueDate !== undefined) {
      if (dueDate !== null && isNaN(new Date(dueDate).getTime())) {
        return res.status(400).json({ error: 'Invalid due date format.' });
      }
      task.dueDate = dueDate;
    }

    if (completed !== undefined) {
      if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Completed must be a boolean.' });
      }
      task.completed = completed;
    }

    saveTasks(tasks);
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// ── DELETE /api/tasks/:id ──────────────────────────────────────
router.delete('/:id', async (req, res, next) => {
  try {
    const index = tasks.findIndex((t) => t.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    tasks.splice(index, 1);
    saveTasks(tasks);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;