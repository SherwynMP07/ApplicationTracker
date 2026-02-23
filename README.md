# Application Tracker

A small web app I built to keep track of my job applications and to keep all the important details in one place.
The goal was to make something simple, fast and informative, with a clean UI that’s easy to scan.

### You can:
- Create, edit, view and delete job applications
- Track things like company, role, status, dates and notes
- Filter by status, company and dates to quickly find what you need
- Register and log in so your data is protected

---

## Tech stack

- **Frontend:** React
- **Backend:** Node.js + Express
- **Database:** PostgreSQL 
- **Auth & security:** JWT-based auth, passwords hashed with bcrypt
- **Hosting:**
  - Frontend on Vercel
  - Backend on Render
  - Database on Neon

---

## Running it locally

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
npm install
node server.js
```

You’ll need a few environment variables for the backend (for example: database connection string, JWT secret, port, etc.).
In my local setup I keep them in a .env file that isn’t committed to Git.

---

## What the app does

- **Application management**  
  Add new applications with fields like company, title, status, dates and notes.  
  You can also edit or delete them later.

- **Filtering**  
  Filter your applications by status (e.g. applied, interviewing, rejected), company and dates so you can focus on what matters.

- **Authentication**  
  Simple registration and login flow using JWT and bcrypt.  
  Only logged-in users can see and manage their applications.

- **UI / UX**  
  Focused on being readable and practical rather than flashy.  
  The layout is built to show the most useful info at a glance.

---

## Why I built this

Mainly as a way to practice:

- Building a small full‑stack app end to end
- Working with React on the frontend and Node.js/Express on the backend
- Using PostgreSQL
- Implementing basic auth with JWT and hashed passwords
- Structuring a project so it’s understandable to other developers
