# demo-edu-http-classic-js
User Management API

Here's a sample **README.md** file for the Express application you shared. It outlines the functionality, setup instructions, and API endpoints for your project.

---

# User Management API

A RESTful API built using Express.js for managing users, including user registration, login, and CRUD operations on user data. This API uses JWT for authentication and bcrypt for password hashing.

## Features

- User registration with email validation.
- User login with JWT authentication.
- Protected route for secret data access.
- CRUD operations on user data (Create, Read, Update, Delete).

## Requirements

- Node.js (v14+ recommended)
- MongoDB (for storing user data)

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/user-management-api.git
   cd user-management-api
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root of the project with the following content:

   ```bash
   JWT_SECRET=your-jwt-secret-key
   MONGO_URI=mongodb://localhost:27017/your-database-name
   ```

4. **Start the Server**

   ```bash
   npm start
   ```

   The API will be available at `http://localhost:5000`.

## API Endpoints

### 1. **Register a User**

- **URL:** `/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```

- **Response:**
  - `201 Created`: User successfully created.
  - `400 Bad Request`: Missing required fields or invalid email format.
  - `400 Conflict`: Email already registered.
  - `500 Internal Server Error`: Server-side error.

### 2. **Login a User**

- **URL:** `/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```

- **Response:**
  - `200 OK`: Returns a JWT token.
  - `400 Bad Request`: Missing fields or invalid credentials.
  - `404 Not Found`: User not found.
  - `500 Internal Server Error`: Server-side error.

### 3. **Get All Users**

- **URL:** `/`
- **Method:** `GET`
- **Authentication:** Requires valid JWT token.
- **Response:**
  - `200 OK`: Returns a list of all users.
  - `500 Internal Server Error`: Server-side error.

### 4. **Get a User by ID**

- **URL:** `/users/:id`
- **Method:** `GET`
- **Authentication:** Requires valid JWT token.
- **Response:**
  - `200 OK`: Returns user data.
  - `404 Not Found`: User not found.
  - `500 Internal Server Error`: Server-side error.

### 5. **Update a User**

- **URL:** `/users/:id`
- **Method:** `PUT`
- **Authentication:** Requires valid JWT token.
- **Body:**
  ```json
  {
    "name": "Updated User Name",
    "email": "updateduser@example.com",
    "password": "newpassword"
  }
  ```

- **Response:**
  - `200 OK`: Returns updated user data.
  - `404 Not Found`: User not found.
  - `500 Internal Server Error`: Server-side error.

### 6. **Delete a User**

- **URL:** `/users/:id`
- **Method:** `DELETE`
- **Authentication:** Requires valid JWT token.
- **Response:**
  - `200 OK`: User deleted successfully.
  - `404 Not Found`: User not found.
  - `500 Internal Server Error`: Server-side error.

### 7. **Access Protected Route**

- **URL:** `/secret`
- **Method:** `GET`
- **Authentication:** Requires valid JWT token.
- **Response:**
  - `200 OK`: Returns protected data (example: `{"secret": "This is protected data!"}`).
  - `401 Unauthorized`: Invalid or expired token.
  - `500 Internal Server Error`: Server-side error.

## Middleware

- **Authentication**: Uses JWT-based authentication for securing endpoints. The JWT token must be included in the `Authorization` header with the prefix `Bearer`.

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express.js**: Web framework for handling HTTP requests.
- **MongoDB**: Database for storing user data.
- **Mongoose**: ODM for interacting with MongoDB.
- **bcryptjs**: Library for password hashing.
- **jsonwebtoken**: Library for generating and verifying JWT tokens.

## Security Considerations

- Passwords are hashed using bcrypt for secure storage.
- JWT tokens are used for authentication, with an expiration time of 1 hour.
- All sensitive routes are protected using JWT authentication middleware.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Write tests for your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.