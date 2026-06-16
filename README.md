# Expense Tracker

A full-stack Expense Tracker application built with **ASP.NET Core Web API**, **Entity Framework Core**, **MySQL**, **Next.js**, and **Material UI**. The application allows users to securely manage expenses through authenticated CRUD operations using JWT-based authentication.

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Protected API Endpoints
* Protected Frontend Routes
* Logout Functionality
* Password Hashing with BCrypt

### Expense Management

* Create Expenses
* View Expenses
* Update Expenses
* Delete Expenses

---

## Tech Stack

### Backend

* ASP.NET Core Web API
* Entity Framework Core
* MySQL
* Pomelo Entity Framework Core MySQL Provider
* JWT Authentication
* BCrypt Password Hashing

### Frontend

* Next.js
* React
* TypeScript
* Material UI (MUI)

### Tools

* Visual Studio Code
* MySQL Workbench
* Postman
* Git

---

## Project Architecture

```text
Browser
   ↓
Next.js Frontend
   ↓
JWT Authentication
   ↓
ASP.NET Core Web API
   ↓
Entity Framework Core
   ↓
MySQL Database
```

---

## Backend Structure

```text
CFirst/
│
├── Controllers/
│   ├── AuthController.cs
│   └── ExpensesController.cs
│
├── Data/
│   └── ApplicationDbContext.cs
│
├── Dtos/
│   ├── LoginDto.cs
│   └── RegisterDto.cs
│
├── Models/
│   ├── Expense.cs
│   └── User.cs
│
├── Migrations/
│
├── Program.cs
│
└── appsettings.json
```

---

## Frontend Structure

```text
expense-ui/
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   │
│   └── lib/
│       └── api.ts
│
└── package.json
```

---

## Database Models

### Expense

```csharp
public class Expense
{
    public int Id { get; set; }

    public string Title { get; set; } = "";

    public decimal Amount { get; set; }
}
```

### User

```csharp
public class User
{
    public Guid Id { get; set; }

    public string Username { get; set; } = "";

    public string Email { get; set; } = "";

    public string PasswordHash { get; set; } = "";

    public DateTime CreatedAt { get; set; }
}
```

---

## Authentication Flow

```text
User Registers
      ↓
Account Stored in Database
      ↓
User Logs In
      ↓
JWT Generated
      ↓
JWT Stored in Browser
      ↓
Frontend Sends JWT
      ↓
ASP.NET Validates JWT
      ↓
Access Granted to Protected APIs
```

---

## API Endpoints

### Authentication

#### Register

```http
POST /api/auth/register
```

Request:

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}
```

---

#### Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

---

### Expenses

All expense endpoints require authentication.

#### Get All Expenses

```http
GET /api/expenses
```

#### Create Expense

```http
POST /api/expenses
```

```json
{
  "title": "Coffee",
  "amount": 5
}
```

#### Update Expense

```http
PUT /api/expenses/{id}
```

```json
{
  "title": "Latte",
  "amount": 7
}
```

#### Delete Expense

```http
DELETE /api/expenses/{id}
```

---

## JWT Configuration

Add the following configuration to `appsettings.json`:

```json
{
  "Jwt": {
    "Key": "YOUR_SECRET_KEY",
    "Issuer": "CFirst",
    "Audience": "CFirstUsers"
  }
}
```

---

## Running the Backend

### Install Dependencies

```bash
dotnet restore
```

### Apply Migrations

```bash
dotnet ef database update
```

### Run the API

```bash
dotnet run
```

The API will be available at:

```text
http://localhost:5000
```

---

## Running the Frontend

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

---

## Security Features

* BCrypt password hashing
* JWT token authentication
* Protected API endpoints using `[Authorize]`
* Protected frontend routes
* Automatic logout on unauthorized requests
* Secure separation between authentication and business logic

---

## Testing

### Backend

Tested using Postman:

* User Registration
* User Login
* JWT Generation
* Expense CRUD Operations
* Unauthorized Access Handling

### Frontend

Tested using Browser Developer Tools:

* Login Flow
* Registration Flow
* Protected Routes
* JWT Storage
* Expense CRUD Operations

---

## Future Improvements

* User-specific expenses
* Refresh tokens
* Role-based authorization
* Expense categories
* Expense filtering and search
* Dashboard and analytics
* Docker deployment
* Cloud hosting

---

## Project Status

The current application is fully functional and completed as a standard layered architecture (Controllers → DbContext → Models).

The next phase of the project is a refactoring process into Onion Architecture, in order to improve:

Separation of concerns
Maintainability
Testability
Scalability
Domain-driven structure
