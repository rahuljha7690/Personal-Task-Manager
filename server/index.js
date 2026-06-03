// index.js
import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/tasks.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ── CORS ───────────────────────────────────────────────────────
// Allow requests from local dev and the deployed Vercel frontend.
// FRONTEND_URL is set as an environment variable on Render.
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

app.use(express.json());

// ── Routes ────────────────────────────────────────────────────
app.use('/api/tasks', taskRoutes);

// ── Health check ──────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ── 404 handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ── Global error handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});