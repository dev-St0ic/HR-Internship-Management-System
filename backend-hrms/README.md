# Deliverables:
### 1. HR Dashboard endpoint returning all metrics
### 2. Intern self-dashboard endpoint
### 3. Activity logging integrated with all write operations via spatie/laravel-activitylog
### 4. Recent activities API with pagination
### 5. Laravel Scheduler configured for automated tasks



## Finished Tasks:

### HR Dashboard endpoint returning all metrics
contains:
- app/
  - http/controllers/api/DashboardController.php
  - Models/
    - intern.php
    - internshipApplication.php
    - University.php
    - User.php
  - Providers/RouteServiceProvider.php
  - Services/DashboardService.php

- bootstrap/app.php

- database/migrations/*
  - (mostly used from db branch) [branch link](https://github.com/dev-St0ic/HR-Internship-Management-System/tree/db)
  - w/ spatie/laravel

- routes/api.php

to check the api, type http://127.0.0.1:8000/api/v1/intern/dashboard