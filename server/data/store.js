// data/store.js
// Persists tasks to a JSON file
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE_PATH = join(__dirname, 'tasks.json');

function loadTasks() {
  if (!existsSync(FILE_PATH)) return [];

  try {
    const data = JSON.parse(
      readFileSync(FILE_PATH, 'utf-8')
    );

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to load tasks:', error.message);
    return [];
  }
}

function saveTasks(tasks) {
  try {
    writeFileSync(
      FILE_PATH,
      JSON.stringify(tasks, null, 2),
      'utf-8'
    );
  } catch (error) {
    console.error('Failed to save tasks:', error.message);
  }
}

const tasks = loadTasks();

export { tasks, saveTasks };