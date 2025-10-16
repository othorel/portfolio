# 🌐 Full-Stack Portfolio Web Application

By Olivier Thorel – Fullstack Developer & Student from 42 Perpignan, France

This is my personal portfolio project, built to showcase my full-stack development skills. It demonstrates user management, secure authentication, profile customization, friend relationships, and a dynamic frontend—all built with modern web technologies.

<p align="center">
  <a href="https://github.com/othorel/portfolio" target="_blank">
    <img src="https://github.com/othorel/portfolio/blob/main/frontend/public/projects/portfolio.png" width="120" alt="Portfolio Logo"/>
  </a>
</p>

<p align="center">
  <img src="https://github.com/othorel/portfolio/blob/main/images/index.png" width="600" />
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

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

---

### Project Structure with docker-compose

```bash

/frontend    - Next.js frontend
/backend     - Node.js backend with Express & Prisma
/database    - PostgreSQL
/nginx       - Nginx reverse proxy with HTTPS

```

<p align="center">
  <img src="https://github.com/othorel/portfolio/blob/main/images/docker.png" />
</p>

---

### Deployment & HTTPS

- Application is served via Nginx as a reverse proxy.
- HTTPS is enabled using self-signed certificates for local development.
In production, replace these with certificates from Let's Encrypt or another CA.
- Nginx proxies:
  - / → frontend (Next.js)
  - /api/ → backend (Node.js / Express)
- All API requests are secured with JWT authentication.

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

NEXT_PUBLIC_API_URL=https://localhost/api

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

### Screenshots

<p align="center">
  <img src="https://github.com/othorel/portfolio/blob/main/images/register.png" width="300"/>
</p>

<p align="center">
  <img src="https://github.com/othorel/portfolio/blob/main/images/friend.png" width="400"/>
</p>

<p align="center">
  <img src= "https://github.com/othorel/portfolio/blob/main/images/project.png" width="600"/>
</p>

---

### Contributing

Feel free to fork this project and submit pull requests.  
For questions or feedback, contact me at: [thorel.olivier@hotmail.com](mailto:thorel.olivier@hotmail.com)

---
