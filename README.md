# AIES — Frontend (React)

The React website for the **Academic Internship Evaluation System**. It talks to the AIES backend API and gives each role a real interface: login, dashboards, browsing and applying to internships, posting internships, and reviewing applicants.

Built with **React + Vite + React Router**.

---

## Before you start

Your **backend must be running first** (on `http://localhost:5000`). In the `aies-backend` folder, run `npm run dev`. Then come back here.

---

## Run it (Windows)

1. Open a terminal **inside this `aies-frontend` folder** (open the folder in File Explorer, type `cmd` in the address bar, Enter).
2. Install the packages (one time):
   ```
   npm install
   ```
3. Start it:
   ```
   npm run dev
   ```
4. Your browser opens automatically at **http://localhost:3000**. If it doesn't, open that address yourself.

> The app runs on port **3000** on purpose — that's the address your backend already allows (CORS), so the two connect with no extra setup.

---

## Try it out

On the login page, click a **demo account** chip to auto-fill it (all use password `password123`):

- **Student** (`student@aies.dev`) — browse internships, apply, track applications.
- **Company** (`company@aies.dev`) — post internships, review and accept/reject applicants.
- **Admin** (`admin@aies.dev`) — see system-wide dashboard stats.

A good demo flow: log in as the **company** and post an internship → log out → log in as the **student**, find it, and apply → log back in as the **company** and accept the applicant.

---

## What's inside

```
src/
├─ main.jsx           app entry
├─ App.jsx            routes
├─ api.js             talks to the backend (change the URL here if needed)
├─ auth.jsx           login state + token handling
├─ styles.css         all styling
├─ components/        Navbar, ProtectedRoute
└─ pages/             Login, Register, Dashboard, Internships,
                      PostInternship, MyApplications, Applicants
```

## If the page loads but nothing works
Almost always it means the backend isn't running. Check that the `aies-backend` terminal still shows *"AIES API running on http://localhost:5000"*, and that `http://localhost:5000/api/health` shows `{"ok":true}` in your browser.
