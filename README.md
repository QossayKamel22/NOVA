# NOVA
**Your Day. Organized.**

<img width="1254" height="1254" alt="image" src="https://github.com/user-attachments/assets/c2075e2f-f9b9-42db-86ee-9a854d780329" />

---

NOVA is a premium personal productivity command center for managing tasks, goals, notes, a calendar, and productivity insights — all in one calm, minimal workspace. Built with React, Vite, and Firebase.

---


## Description

NOVA brings together everything a focused person needs to run their day: a task list with priorities and categories, goal tracking with visual progress, a notes workspace, a monthly calendar, and a lightweight insights dashboard. The design language draws from Apple, Linear, and Notion — generous whitespace, restrained color, and quiet, confident typography.

## Features

- Email/password and social (Google, Apple) authentication via Firebase Auth, with password reset
- Protected routing — signed-out users are redirected to `/login`; signed-in users are redirected away from `/login` and `/register`
- Real-time task management: create, edit, complete, delete, search, and filter tasks by status
- Goal tracking with circular and linear progress, due dates, and task-completion counts
- Notes workspace with categories and soft color themes
- Monthly calendar with day selection, event pills, and an upcoming-events sidebar (agenda view on mobile)
- Insights dashboard with productivity trend, priority breakdown, focus-time breakdown, and top-category charts
- Editable profile and account settings, including theme (light/dark/system), language, notifications, and timezone preferences
- A unified Quick Add flow for creating a task, goal, note, or event from anywhere in the app
- Fully responsive layout with a dedicated bottom navigation bar and stacked layouts on mobile
- Loading skeletons, empty states, and friendly error messages throughout — no blank screens, no raw Firebase errors

## Tech Stack

- **React 18** + **Vite** — UI and build tooling
- **React Router 6** — client-side routing, protected routes, lazy-loaded pages
- **Firebase Authentication** — email/password, Google, Apple sign-in
- **Cloud Firestore** — real-time per-user data storage
- **CSS Modules** — a centralized design system (colors, spacing, radii, shadows) with scoped component styles
- **Recharts** — lightweight, minimalist charts for the Insights page

No custom backend, no REST API server, no additional database — Firebase is the only backend/data layer.

## Screenshots

_Add screenshots of the Landing page, Dashboard, Tasks, Goals, Notes, Calendar, and Insights here once deployed._

## Architecture

```text
src/
  components/     Reusable UI primitives (Button, Input, Modal, Card, Badge, ProgressBar, Avatar, EmptyState, Skeleton, Toast, Logo, Icons)
  layouts/        App shell — Sidebar, Topbar, MobileNav, AppLayout
  pages/          Route-level screens (Landing, Login, Register, Dashboard, Tasks, Goals, Notes, Calendar, Insights, Profile, Settings)
  features/       Feature-specific logic and forms (task/goal/note/event modals, quick add, insight charts)
  hooks/          Shared hooks (Firestore collection subscriptions)
  context/        React context providers (Auth, Theme, Toast, Quick Add)
  firebase/       Firebase app config, auth helpers, Firestore helpers
  constants/      Shared option lists (categories, priorities, statuses)
  styles/         Design system tokens and global styles
```


## Screenshots

<img width="1402" height="1122" alt="image" src="https://github.com/user-attachments/assets/6c945dbb-df17-448c-975e-d4373731c0a0" /> 

---

<img width="1402" height="1122" alt="image" src="https://github.com/user-attachments/assets/9dd78996-3882-40ec-9145-a7d34b465634" />

---

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/02fc6e07-b8fd-4992-921c-718a38892c62" />

---



## Credits

Designed and built for **Qossay Kamel**. Visual direction inspired by Apple, Linear, and Notion — implemented as an original design system, not a copy of any existing product.
