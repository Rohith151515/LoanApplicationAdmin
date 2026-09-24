# Ledger — User & Auth Console

A React + Axios web app wired directly to the endpoints in your `New Collection.postman_collection.json`. It includes a login/register flow, a dashboard, and a Users screen with a "realtime" (polling-based) live feed, search, create, and update.

## Endpoint mapping

| Postman request        | Method | Path                | Used in                          |
|-------------------------|--------|----------------------|-----------------------------------|
| Create users             | POST   | `/users`             | `src/api/userApi.js` → `createUser` |
| Get all users            | GET    | `/users`             | `src/api/userApi.js` → `getAllUsers` |
| Get all users By Id      | GET    | `/users/:id`         | `src/api/userApi.js` → `getUserById` |
| New Request (update)     | PUT    | `/users/:id`         | `src/api/userApi.js` → `updateUser` |
| Register                 | POST   | `/auth/register`     | `src/api/authApi.js` → `registerUser` |
| Login                    | POST   | `/auth/login`        | `src/api/authApi.js` → `loginUser` |

All requests go through `src/api/axiosClient.js`, which:
- Reads the base URL from `VITE_API_BASE_URL` (defaults to `http://localhost:8080/api/v1`, matching the collection).
- Attaches `Authorization: Bearer <token>` automatically once you're logged in.
- Normalizes error messages and clears the session on a 401.

## "Realtime" behavior

There's no websocket endpoint in the collection, so realtime is implemented as **smart polling**: `src/hooks/usePolling.js` refetches `GET /users` on an interval (default every 5s, configurable via `VITE_POLL_INTERVAL`), with a live/paused toggle and a manual "Refresh now" button. Swap the fetcher inside `usePolling` for a WebSocket/SSE subscription later without touching the pages that consume it.

## Getting started

```bash
npm install
cp .env.example .env   # adjust VITE_API_BASE_URL if your API isn't on localhost:8080
npm run dev
```

Open http://localhost:5173. Register a user via `/register`, then sign in at `/login`.

> Note: the app expects your `/auth/login` response to include a token (checked as `token`, `accessToken`, or `data.token`). If your backend returns it under a different key, adjust `login()` in `src/context/AuthContext.jsx`.

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  api/            axios instance + one module per Postman folder (userApi, authApi)
  hooks/          usePolling — the realtime refresh engine
  context/        AuthContext (session/token), ToastContext (notifications)
  components/     Sidebar, StatusBadge, Loader/LiveIndicator, UserFormPanel, ProtectedRoute
  pages/          Login, Register, Dashboard, Users
  index.css       design tokens + component styles (no UI framework required)
```
