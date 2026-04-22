# HR Internship Management System

A comprehensive web application for managing internship programs, built with **Laravel 11** (backend) and **React 19** (frontend).

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Development Guide](#development-guide)
- [Database](#database)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

This system helps organizations manage:

- Internship applications and approvals
- Intern profiles and assignments
- Attendance tracking
- Task management and assignments
- Performance evaluations
- Document management
- Notifications and communications

**Key Features:**

- Role-based access control (Admin, HR, Supervisor, Intern, Applicant)
- Real-time attendance tracking
- Application workflow management
- Evaluation system
- Activity logging
- RESTful API

---

## Tech Stack

### Backend

- **Laravel 11** - Web application framework
- **PHP 8.1+** - Server-side language
- **MySQL 5.7+** - Database
- **Laravel Sanctum** - API token authentication
- **Spatie Activity Log** - Activity tracking

### Frontend

- **React 19** - UI library
- **Vite 8** - Build tool
- **Material-UI 7** - Component library
- **Tailwind CSS 4** - Styling
- **Axios** - HTTP client
- **React Router 7** - Navigation

---

## Installation & Setup

### Prerequisites

Before starting, ensure you have:

- **PHP 8.1+** (via XAMPP/WAMP/Docker)
- **Composer** - PHP package manager
- **Node.js 16+** - JavaScript runtime
- **npm** - Node package manager
- **MySQL 5.7+** (via XAMPP/Docker)

### Backend Installation

```bash
cd backend-hrms

# 1. Install PHP dependencies
composer install

# 2. Create .env file
cp .env.example .env

# 3. Generate application key
php artisan key:generate

# 4. Configure database (edit .env if needed)
# DB_CONNECTION=mysql
# DB_DATABASE=hr_internship_management
# DB_USERNAME=root
# DB_PASSWORD=

# 5. Run migrations and seed database
php artisan migrate:fresh --seed
```

### Frontend Installation

```bash
cd frontend-hrms

# 1. Install npm dependencies
npm install

# 2. Create .env file (if not exists)
# VITE_API_URL=http://localhost:8000/api
```

---

## Running the Application

### Start Backend Server

**Terminal 1:**

```bash
cd backend-hrms
php artisan serve
```

Server runs at: **http://localhost:8000**

### Start Frontend Server

**Terminal 2:**

```bash
cd frontend-hrms
npm run dev
```

Server runs at: **http://localhost:5173**

### Access Application

Open browser and go to:

```
http://localhost:5173
```

---

## Project Structure

```
HR-Internship-Management-System/
│
├── backend-hrms/                    # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/         # API controllers
│   │   │   │   └── AuthController.php
│   │   │   └── Middleware/          # Custom middleware
│   │   ├── Models/                  # Database models (22 models)
│   │   │   ├── User.php
│   │   │   ├── Intern.php
│   │   │   ├── Application.php
│   │   │   └── ... (more models)
│   │   ├── Services/                # Business logic
│   │   └── Providers/               # Service providers
│   ├── database/
│   │   ├── migrations/              # Schema definitions (35+ migrations)
│   │   ├── factories/               # Test data factories
│   │   └── seeders/                 # Database seeders
│   ├── routes/
│   │   ├── api.php                  # API routes
│   │   ├── web.php                  # Web routes
│   │   └── console.php              # Console commands
│   ├── config/                      # Configuration files
│   ├── storage/                     # Logs and cache
│   ├── public/                      # Web root
│   ├── tests/                       # Unit & feature tests
│   ├── .env                         # Environment variables
│   └── composer.json                # PHP dependencies
│
├── frontend-hrms/                   # React Application
│   ├── src/
│   │   ├── App.jsx                  # Root component
│   │   ├── main.jsx                 # Entry point
│   │   ├── assets/                  # Static files
│   │   ├── common/                  # Shared components
│   │   ├── contexts/                # React context
│   │   │   └── AuthContext.jsx      # Authentication state
│   │   ├── services/
│   │   │   └── api.js               # API service layer (connects to backend)
│   │   ├── portals/                 # Feature modules
│   │   │   ├── applicant-intern/
│   │   │   ├── interns/
│   │   │   └── hr-staff/
│   │   └── routes/                  # Route definitions
│   ├── .env                         # Environment variables
│   ├── package.json                 # npm dependencies
│   ├── vite.config.js               # Vite configuration
│   └── index.html                   # HTML entry point
│
└── README.md                        # This file
```

---

## API Documentation

### Base URL

```
http://localhost:8000/api
```

### Authentication

All protected endpoints require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <your_token_here>
```

### Public Endpoints

#### Health Check

```
GET /health
Response: { "status": "ok" }
```

#### Login

```
POST /auth/login
Body: {
  "email": "user@example.com",
  "password": "password123"
}
Response: {
  "token": "1|abc123...",
  "user": { ... }
}
```

#### Register

```
POST /auth/register
Body: {
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
Response: {
  "token": "1|abc123...",
  "user": { ... }
}
```

### Protected Endpoints

#### Get Current User

```
GET /auth/me
Headers: Authorization: Bearer <token>
Response: { "user": { ... } }
```

#### Logout

```
POST /auth/logout
Headers: Authorization: Bearer <token>
Response: { "message": "Logged out successfully" }
```

### Coming Soon

- User management endpoints
- Intern management endpoints
- Application management endpoints
- Attendance endpoints
- Task management endpoints
- Evaluation endpoints

---

## Development Guide

### Creating a New API Controller

```bash
php artisan make:controller InternController --resource
```

### Creating a New Model

```bash
php artisan make:model Intern --migration
```

### Creating a New Migration

```bash
php artisan make:migration create_interns_table
```

### Running Tests

```bash
cd backend-hrms

# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/AuthTest.php

# Run with coverage
php artisan test --coverage
```

### Adding Frontend Components

```bash
# Inside frontend-hrms/src/common/components
# Create your component file
touch MyComponent.jsx

# Import and use
import MyComponent from './MyComponent';
```

### Using API Service in Components

```javascript
import { internsAPI } from "../services/api";

// Inside component
const [interns, setInterns] = useState([]);

useEffect(() => {
  internsAPI
    .getAll()
    .then((res) => setInterns(res.data))
    .catch((err) => console.error(err));
}, []);
```

### Code Style

- **Backend**: Follow PSR-12 standard

  ```bash
  php artisan pint
  ```

- **Frontend**: Follow ESLint rules
  ```bash
  npm run lint
  ```

---

## Database

### Connection Settings

**Default Configuration (localhost):**

```
Host: 127.0.0.1
Port: 3306
Database: hr_internship_management
Username: root
Password: (empty)
```

### Database Tables

**Core Tables:**

- `users` - User accounts
- `roles` - User roles
- `permissions` - Permissions
- `role_permissions` - Role-permission mapping
- `departments` - Organization departments
- `universities` - Partner universities

**Business Tables:**

- `interns` - Intern records
- `applications` - Internship applications
- `attendance` - Attendance logs
- `tasks` - Task assignments
- `task_comments` - Task comments
- `task_deliverables` - Deliverables
- `evaluations` - Performance evaluations
- `evaluation_criteria` - Evaluation standards

**Supporting Tables:**

- `documents` - File uploads
- `notifications` - User notifications
- `system_logs` - System activity logs
- `activity_log` - User activity tracking
- `dtr_submissions` - Daily time records

### Useful Commands

```bash
# View database
mysql -u root hr_internship_management

# Reset database
php artisan migrate:fresh --seed

# Run specific migration
php artisan migrate --path=database/migrations/2026_03_26_073342_create_users_table.php

# Create seeder
php artisan make:seeder InternSeeder

# Seed database
php artisan db:seed
```

---

## Deployment

### Backend Deployment

```bash
cd backend-hrms

# 1. Install production dependencies
composer install --no-dev --optimize-autoloader

# 2. Generate production key
php artisan key:generate

# 3. Run migrations
php artisan migrate --force

# 4. Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 5. Set permissions (Linux/Mac)
chmod -R 755 storage bootstrap/cache
chmod -R 755 public
```

### Frontend Deployment

```bash
cd frontend-hrms

# 1. Build for production
npm run build

# 2. Output in dist/
# Upload dist/ folder to web server
```

### Environment Variables for Production

**Backend (.env):**

```
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com
DB_HOST=your_db_host
DB_DATABASE=your_db_name
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
```

**Frontend (.env):**

```
VITE_API_URL=https://yourdomain.com/api
```

---

## Troubleshooting

### Backend Issues

**Port 8000 already in use:**

```bash
php artisan serve --port=8001
```

**Composer error:**

```bash
composer install
composer dump-autoload
```

**Database connection error:**

- Verify MySQL is running
- Check `.env` database settings
- Ensure database exists: `hr_internship_management`

**Migration fails:**

```bash
# Reset migrations
php artisan migrate:reset

# Fresh start with seeding
php artisan migrate:fresh --seed
```

### Frontend Issues

**Port 5173 already in use:**

```bash
npm run dev -- --port 3000
```

**Module not found:**

```bash
rm -r node_modules package-lock.json
npm install
```

**CORS errors:**

- Check `VITE_API_URL` in `.env`
- Verify backend is running
- Check browser console for exact error

**Axios 401 errors:**

- Token might be expired
- Check localStorage for `auth_token`
- Try logging out and logging in again

### General Issues

**Permission denied (Linux/Mac):**

```bash
chmod -R 755 backend-hrms/storage
chmod -R 755 backend-hrms/bootstrap/cache
```

**Git line ending warnings:**

```bash
git config core.safecrlf false
```

**Clean start (nuclear option):**

```bash
# Backend
cd backend-hrms
composer install
php artisan migrate:fresh --seed
php artisan serve

# Frontend (new terminal)
cd frontend-hrms
npm install
npm run dev
```

---

## Common Commands Cheat Sheet

### Backend

```bash
# Start server
php artisan serve

# Run migrations
php artisan migrate
php artisan migrate:fresh --seed

# Create components
php artisan make:controller ControllerName
php artisan make:model ModelName --migration
php artisan make:seeder SeederName

# Tests
php artisan test
php artisan test --coverage

# Utilities
php artisan tinker
php artisan cache:clear
php artisan config:cache
```

### Frontend

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Linting
npm run lint
```

---

## Contributing

1. Create a new branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Commit: `git commit -am 'Add new feature'`
4. Push: `git push origin feature/my-feature`
5. Create a Pull Request

---

## License

MIT License - see LICENSE file for details

---

## Support

For issues, questions, or suggestions:

- Create an issue on GitHub
- Check existing documentation
- Review server logs in `backend-hrms/storage/logs/`
- Check browser console (F12) for frontend errors

---

**Last Updated:** April 22, 2026

## Running the Project

### Development Server

Start the development server with hot reload:

```powershell
& "C:\Program Files\nodejs\npm.cmd" run dev
```

Or in Command Prompt:

```cmd
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```powershell
& "C:\Program Files\nodejs\npm.cmd" run build
```

Or in Command Prompt:

```cmd
npm run build
```

### Preview Production Build

Preview the production build locally:

```powershell
& "C:\Program Files\nodejs\npm.cmd" run preview
```

Or in Command Prompt:

```cmd
npm run preview
```

### Linting

Check code for linting errors:

```powershell
& "C:\Program Files\nodejs\npm.cmd" run lint
```

Or in Command Prompt:

```cmd
npm run lint
```

## Technology Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **UI Components:** Material-UI (MUI)
- **Routing:** React Router DOM 7
- **Date Handling:** Day.js
- **Icons:** Lucide React
- **Linting:** ESLint

## Troubleshooting

### PowerShell Execution Policy Error

If you encounter "running scripts is disabled on this system" error, use:

```powershell
& "C:\Program Files\nodejs\npm.cmd" <command>
```

Or switch to Command Prompt (cmd.exe) for easier npm command execution.

## Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build optimized production bundle        |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint to check code quality         |

## Project Features

- Multi-portal system (HR Admin, HR Staff, Interns, Supervisors, Applicants)
- Attendance tracking
- Document management
- User profile management
- Calendar integration
- Application management
- Settings and preferences
- RBAC (Role-Based Access Control)
- Notification system

## Getting Help

For issues or questions, please refer to the project documentation or contact the development team.
