# Task Manager

I built this task manager with Node.js and Express for the backend and React with Tailwind CSS, for the frontend.

This project was done as Exercise 1 for the Studio Graphene Full Stack Developer Assessment.

## Live Demo

A live demo will be available soon.

## Tech Stack

- **Backend:** I used Node.js, Express and JavaScript. The data is stored in memory for now.

- **Frontend:** I built the frontend with React using Vite and styled it with Tailwind CSS.

## How to Run Locally

### Prerequisites

- You need to have Node.js version 18 or higher installed.

### Backend

To run the backend follow these steps:

```bash

cd server

npm install

npm run dev

```

The backend will run on http://localhost:3001.

### Frontend

To run the frontend follow these steps:

```bash

cd client

npm install

npm run dev

```

The frontend will run on http://localhost:5173.

## API Documentation

I will fill in the API documentation once the backend is complete.

## Project Structure
task-manager/
├── server/        # Express REST API
│   ├── routes/
│   ├── data/
│   └── index.js
├── client/        # React + Tailwind frontend
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── App.jsx
└── README.md
## Next Steps

- Persist tasks to a JSON file or SQLite
- Add drag-and-drop reordering
- Search by title
- User authentication