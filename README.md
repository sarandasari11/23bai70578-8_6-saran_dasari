# JWT Authentication with Spring Boot

This project implements JWT authentication with login, protected routes, and logout token invalidation.

## Tech Stack
- Spring Boot 3
- Spring Security
- Spring Data JPA
- H2 Database
- JJWT (io.jsonwebtoken)

## Project Structure

```text
jwt-auth-spring/
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
1. Open terminal inside `jwt-auth-spring`.
2. Run:
   ```bash
   mvn clean spring-boot:run
   ```
3. Server starts at `http://localhost:5000`.

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



## Postman Testing Steps
1. Send `POST /api/auth/login` with valid username and password.
2. Copy JWT from response.
3. Send `GET /api/protected/profile` with `Authorization: Bearer <token>`.
4. (Optional but recommended) Send `POST /api/auth/logout` with same token.
5. Call `GET /api/protected/profile` again with same token to confirm invalidation.



## Notes on Session Management
- The backend is stateless (`SessionCreationPolicy.STATELESS`).
- JWT token expiry is configurable using `app.jwt.expiration-ms`.
- Logout is handled by token blacklisting in memory until token expiration.
