# User Management Backend

A robust Node.js backend for user authentication and profile management, leveraging **PostgreSQL**, **Knex.js**, and **JWT** for secure and scalable user handling.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/TrongKiennn/Intern-Assignment-Backend.git
cd Intern-Assignment-Backend
```

### 2. Install Dependencies
Install the required Node.js packages:
```bash
npm i
```

### 3. Configure Environment Variables
Create a `.env` file by copying the example provided:
Update the `.env` file with your local configuration:
```env
# Database configuration
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=user_management

# Server configuration
SERVER_PORT=3000
SERVER_HOST=localhost

# Email service configuration
AUTH_EMAIL=manhtrongkien1901@gmail.com
AUTH_PASS=jhyu xxdv kjfd vjnc
FRONTEND_URL=http://localhost:5173

# Environment
NODE_ENV=development
```




### 4. Set Up the Database
Run the following command to initialize the database, apply migrations, and seed initial data:
```bash
npm run setup-db:dev
```

This command will:
- Create the database (if it doesn't exist).
- Apply migrations to set up the necessary tables.
- Seed the database with a demo user for testing.

### 5. Start the Development Server
Launch the server with hot-reload enabled:
```bash
npm run dev
```

The server will be accessible at:  
👉 [http://localhost:3000](http://localhost:3000)

### 6. Test the Application
Use the seeded demo account to log in:
- **Email**: `abc@example.com`
- **Password**: `12345678`

---

## 📚 API Endpoints

### Authentication
- **POST /auth/login**  
  Log in with email and password to receive a JWT token.
- **POST /auth/register**  
  Register a new user

### User
- **GET /me**  
  Retrieve the profile of the authenticated user.  

---

## 📝 Design Choices & Trade-offs

### Assumptions
- **PostgreSQL** is used as the primary database for reliability and scalability.
- **Knex.js** handles database migrations and seeding for streamlined setup.
- **JWT** is implemented for secure, stateless authentication.
- A pre-seeded demo user is included to simplify testing without requiring registration.
- Email credentials (`AUTH_EMAIL`, `AUTH_PASS`) are configured for email verification and notifications.

### Trade-offs
- **Database Schema**: A minimal schema (users table) is used for simplicity. In production, additional tables and constraints would enhance functionality.
- **Password Security**: Passwords are hashed using `bcrypt`, but advanced features like rate-limiting or strict password policies are not implemented.
- **JWT Expiration: Very short token lifetimes (60s/120s) ease testing but reduce usability. Adjust these values in `config/auth.config.js` for production.
- **Security**: HTTPS is not enabled by default. It should be configured for production environments.

---

## 📌 Available Scripts
- `npm run setup-db:dev`  
  Creates the database, runs migrations, and seeds initial data.
- `npm run dev`  
  Starts the development server with hot-reload using `nodemon`.
- `npm run migrate:dev`  
  Applies database migrations.
- `npm run seed:dev`  
  Seeds the database with initial data.

---


# User Management Frontend
## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/TrongKiennn/Intern-Assignment-Frontend.git
cd Intern-Assignment-Frontend
```

### 2. Install Dependencies
Install the required packages:
```bash
npm i
```
### 5. Start the Frontend
```bash
npm run dev
```

The server will be accessible at:  
👉 [http://localhost:5173](http://localhost:5173)

# Demo Screenshot
[App Screenshot](https://drive.google.com/drive/folders/1FaU6hf2iQcNImYImCXx_peo5X8JJrC2Q?usp=drive_link)
