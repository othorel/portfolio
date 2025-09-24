# 🌐 Full-Stack Portfolio Web Application

By Olivier Thorel – Fullstack Developer & Student from 42 Perpignan, France

This is my personal portfolio project, built to showcase my full-stack development skills. It demonstrates user management, secure authentication, profile customization, friend relationships, and a dynamic frontend—all built with modern web technologies.


<p align="center">
  <img src="https://github.com/othorel/portfolio/blob/main/images/index.png" />
</p>

---

### FEATURES

- User Authentication
  - Secure signup and login with password hashing
  - JWT-based authentication
  - Password reset and email updates
- User Profile Management
  - Update avatar, email, and password
  - Display detailed user information
  - Edit personal settings dynamically
- Social Features
  - Add, remove, and manage friends
  - View friends’ profiles and statuses
  - Manage friend requests and relationships
- Portfolio Showcase
  - Display my projects, skills, and experiences
  - Responsive design for desktop and mobile
  - Interactive UI built with Next.js
- Full Stack Architecture
  - Frontend: Next.js
  - Backend: Node.js with Express and Prisma ORM
  - Database: PostgreSQL
  - Containerized: Docker Compose for backend and database
  - Secure: JWT authentication, validation, and hashed passwords

---

### Tech Stack

- Frontend: Next.js, React
- Backend: Node.js, Express.js
- Database: PostgreSQL
- ORM: Prisma
- Authentication: JWT
- Containerization: Docker & Docker Compose
- Optional: Tailwind CSS for UI styling

---

### Project Structure with docker-compose

```bash

/frontend    - Next.js frontend
/backend     - Node.js backend with Express & Prisma
/database    - PostgreSQL

```

<p align="center">
  <img src="https://github.com/othorel/portfolio/blob/main/images/docker.png" />
</p>

---

### Getting Started

Prerequisites

- Node.js >= 18
- Docker & Docker Compose
- PostgreSQL (or run via Docker)

---

### Setup

1 - Clone the repository

```bash

git clone https://github.com/USERNAME/REPO_NAME.git
cd REPO_NAME

```
2 - Create environment files

- Backend: .env in /backend

```bash

DATABASE_URL=postgresql://user:password@localhost:5432/dbname
DEFAULT_AVATAR="/avatars/default.png"
JWT_SECRET="your jwt_secret"

```

- Frontend: .env in /frontend

```bash

NEXT_PUBLIC_API_URL=http://localhost:4000

```
Adjust values according to your local setup.

3 - Run everything with the Makefile

```bash

make

```

This will start the backend, database, and frontend automatically.

4 - Open in browser

Navigate to http://localhost:3000 to see the application.

---
