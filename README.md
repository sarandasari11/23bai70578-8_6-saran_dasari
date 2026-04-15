# JWT Authentication with Spring Boot (Experiment 6)

This project implements JWT authentication with backend APIs and a React frontend that consumes those APIs using session-based JWT storage.

## Tech Stack
- Spring Boot 3
- Spring Security
- Spring Data JPA
- H2 Database
- JJWT (io.jsonwebtoken)
- React (Create React App)
- Axios
- Bootstrap
- Material UI

## Project Structure

```text
jwt-auth-spring/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   └── ProtectedRoute.js
│   │   ├── App.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── screenshots/                      
│   ├── 01-login-token.png
│   ├── 02-protected-route-success.png
├── src/main/java/com/example/jwtauth/
│   ├── config/
│   │   ├── DataInitializer.java
│   │   └── SecurityConfig.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   └── ProtectedController.java
│   ├── dto/
│   │   ├── LoginRequest.java
│   │   └── LoginResponse.java
│   ├── model/
│   │   └── User.java
│   ├── repository/
│   │   └── UserRepository.java
│   ├── security/
│   │   ├── CustomUserDetailsService.java
│   │   └── JwtAuthenticationFilter.java
│   ├── service/
│   │   ├── JwtService.java
│   │   └── TokenBlacklistService.java
│   └── JwtAuthSpringApplication.java
├── src/main/resources/
│   └── application.properties
├── .gitignore
└── pom.xml
```

## Setup
1. Open terminal inside `jwt-auth-spring` and run backend:
   ```bash
   mvn clean spring-boot:run
   ```
2. Backend server starts at `http://localhost:5000`.
3. Open a new terminal inside `jwt-auth-spring/frontend` and run:
  ```bash
  npm install
  npm start
  ```
4. Frontend runs at `http://localhost:3000`.

## Demo Credentials
These are auto-seeded on startup:
- username: `user123`
- password: `password123`

## API Endpoints

### 1) Login (Public)
- Method: `POST`
- URL: `http://localhost:5000/api/auth/login`
- Body (JSON):
  ```json
  {
    "username": "user123",
    "password": "password123"
  }
  ```
- Success Response:
  ```json
  {
    "token": "<JWT_TOKEN>",
    "tokenType": "Bearer",
    "expiresInSeconds": 3600
  }
  ```

### 2) Protected Route (Requires JWT)
- Method: `GET`
- URL: `http://localhost:5000/api/protected/profile`
- Header:
  - `Authorization: Bearer <JWT_TOKEN>`
- Success Response:
  ```json
  {
    "message": "Protected route accessed successfully.",
    "username": "user123",
    "timestamp": "..."
  }
  ```

### 3) Logout (Optional API + Required UI Session Clear)
- Method: `POST`
- URL: `http://localhost:5000/api/auth/logout`
- Header:
  - `Authorization: Bearer <JWT_TOKEN>`
- Frontend also clears token with:
  - `sessionStorage.removeItem("token")`

## Frontend Flow (Session-Based UI)
1. Open `http://localhost:3000` (Login page).
2. Submit username and password.
3. Frontend calls `POST /api/auth/login`.
4. On success, JWT is stored in `sessionStorage` with key `token`.
5. User is redirected to `/dashboard`.
6. Dashboard calls `GET /api/protected/profile` with header:
   - `Authorization: Bearer <token>`
7. If token is missing/invalid, user is redirected to login.
8. Logout removes token from `sessionStorage` and redirects to login.



## Frontend Testing Steps
1. Login with `user123 / password123` from the React UI.
2. Open DevTools > Application > Session Storage and verify `token` exists.
3. Go to dashboard and click `Fetch Protected API` to show protected response on UI.
4. Remove `token` from Session Storage and refresh `/dashboard`; verify redirect to login.
5. Click `Logout`; verify token is removed and user is redirected to login.

## Required Screenshots for Submission
Capture and place the following screenshots in `screenshots/`:
1. `01-frontend-login.png`
  - React login page with successful sign-in flow.
2. `02-session-storage-token.png`
  - Browser DevTools showing JWT token in Session Storage.
3. `03-protected-response-ui.png`
  - Dashboard showing successful protected API response.
4. `04-unauthorized-redirect.png`
  - Attempted dashboard access without token redirecting to login.
5. `05-logout-flow.png`
  - Logout action and cleared session state.


## Notes on Session Management
- The backend is stateless (`SessionCreationPolicy.STATELESS`).
- The frontend keeps JWT in browser `sessionStorage` (session scoped).
- JWT token expiry is configurable using `app.jwt.expiration-ms`.
- Logout is handled by token blacklisting in memory until token expiration.
