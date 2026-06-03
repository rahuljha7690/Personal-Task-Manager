# Task Manager

A full-stack task management application built with **Node.js, Express, React, and Tailwind CSS**. This project was developed as part of the **Studio Graphene Full Stack Developer Assessment** and focuses on building a clean, responsive, and user-friendly task management experience with persistent storage and drag-and-drop functionality.

---

## Overview

The application allows users to create, organize, update, and manage daily tasks through an intuitive interface. Tasks are stored on the server and remain available even after server restarts through a lightweight JSON-based persistence layer.

### Key Features

* Create, edit, and delete tasks
* Mark tasks as completed or active
* Search tasks by title
* Filter tasks by status (All, Active, Completed)
* Drag-and-drop task reordering
* Due date support with overdue highlighting
* Real-time task statistics
* Persistent storage using a JSON file
* Responsive and clean user interface
* Loading states and empty-state handling

---

## Tech Stack

| Layer        | Technology            |
| ------------ | --------------------- |
| Frontend     | React + Vite          |
| Styling      | Tailwind CSS          |
| Backend      | Node.js + Express     |
| Data Storage | JSON File Persistence |
| HTTP Client  | Axios                 |
| Drag & Drop  | @dnd-kit/core         |

---

## Getting Started

### Prerequisites

* Node.js (v22 or later)
* npm

---

### Backend Setup

```bash
cd server
npm install
npm run dev
```

The backend server runs at:

```text
http://localhost:3001
```

---

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

The frontend application runs at:

```text
http://localhost:5173
```

---

## API Endpoints

### Get All Tasks

```http
GET /api/tasks
```

Optional query parameters:

```http
/api/tasks?status=active
/api/tasks?status=completed
/api/tasks?search=meeting
```

---

### Create Task

```http
POST /api/tasks
```

Request Body:

```json
{
  "title": "Buy groceries",
  "description": "Milk and eggs",
  "dueDate": "2026-06-10"
}
```

---

### Update Task

```http
PATCH /api/tasks/:id
```

Request Body:

```json
{
  "title": "Updated title",
  "completed": true
}
```

---

### Reorder Tasks

```http
PATCH /api/tasks/reorder/apply
```

Request Body:

```json
{
  "orderedIds": ["id1", "id2", "id3"]
}
```

---

### Delete Task

```http
DELETE /api/tasks/:id
```

Returns:

```http
204 No Content
```

---

## Task Data Model

```json
{
  "id": "uuid",
  "title": "Buy groceries",
  "description": "Milk and eggs",
  "dueDate": "2026-06-10",
  "completed": false,
  "createdAt": "2026-06-03T10:00:00.000Z",
  "order": 0
}
```

---

## Project Structure

```text
task-manager/
├── server/
│   ├── data/
│   │   └── store.js        # JSON file persistence layer
│   ├── routes/
│   │   └── tasks.js        # All REST endpoints
│   └── index.js            # Express app entry point
├── client/
│   └── src/
│       ├── api/
│       │   └── tasks.js    # Axios API calls
│       ├── components/
│       │   ├── TaskForm.jsx        # Add task form
│       │   ├── TaskList.jsx        # List with DnD context
│       │   ├── TaskCard.jsx        # Individual task card
│       │   ├── SortableTaskCard.jsx # DnD wrapper for card
│       │   ├── EditModal.jsx       # Edit task modal
│       │   ├── DeleteDialog.jsx    # Delete confirmation
│       │   ├── FilterTabs.jsx      # All/Active/Completed tabs
│       │   ├── SearchBar.jsx       # Search by title
│       │   └── TaskStats.jsx       # Active/Done counts
│       ├── hooks/
│       │   └── useTasks.js  # All task state and actions
│       └── App.jsx
└── README.md
```

---

## Functionality Implemented

### Task Management

* Create new tasks
* Edit existing tasks
* Delete tasks
* Mark tasks as completed or active

### Organization

* Drag-and-drop task ordering
* Search by title
* Filter by status

### User Experience

* Responsive layout
* Loading skeletons
* Empty-state messaging
* Task completion statistics
* Overdue task indicators

### Persistence

* Tasks remain available after server restarts through file-based storage

---

## Design Decisions

For this assessment, a JSON file was chosen instead of a database to keep the application lightweight and easy to set up. The architecture was intentionally kept modular so that the persistence layer can later be replaced with SQLite, PostgreSQL, or MongoDB with minimal changes to the API layer.

The drag-and-drop functionality was implemented using **@dnd-kit/core** because of its accessibility support, performance, and flexibility compared to heavier alternatives.

---

## Future Improvements

Some enhancements that could be added in future iterations include:

* User authentication and authorization
* Multi-user task management
* Task priority levels
* Dark mode support
* Due date reminders and notifications
* Database integration (PostgreSQL/SQLite)
* Task categories and labels
* Pagination for larger task lists
* Automated testing and CI/CD pipeline

---

## Author

Rahul Kumar Jha

Built as part of the Studio Graphene Full Stack Developer Assessment.
