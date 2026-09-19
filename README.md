# Padel Tournament Management API

A RESTful API for managing padel tournaments and players. This project was developed as part of the CSE 341 Web Services course.

The API provides CRUD operations for tournaments and players, data validation, error handling, MongoDB database integration, and interactive Swagger API documentation.

## Live API

**Production API:**
https://padel-tournament-api-bnj7.onrender.com/

**Swagger Documentation:**
https://padel-tournament-api-bnj7.onrender.com/api-docs

## GitHub Repository

https://github.com/martingerardoc/padel-tournament-api

---

## Technologies Used

* Node.js
* Express.js
* MongoDB Atlas
* MongoDB Node.js Driver
* Express Validator
* Swagger / OpenAPI
* Swagger UI Express
* CORS
* dotenv
* Render

---

## Project Structure

```text
padel-tournament-api/
├── controllers/
│   ├── playersController.js
│   └── tournamentsController.js
├── db/
│   └── connect.js
├── middleware/
│   └── validation.js
├── routes/
│   ├── players.js
│   └── tournaments.js
├── validators/
│   ├── playerValidator.js
│   └── tournamentValidator.js
├── swagger.json
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

## Database

The application uses MongoDB Atlas.

The database contains two main collections:

### Tournaments

Tournament documents contain information such as:

* name
* description
* location
* category
* startDate
* endDate
* maxTeams
* status
* entryFee
* createdAt

### Players

Player documents contain information such as:

* firstName
* lastName
* email
* phone
* category
* ranking
* active
* createdAt

The player collection contains more than seven fields per document, satisfying the project data requirements.

---

## API Endpoints

### Tournaments

| Method | Endpoint               | Description            |
| ------ | ---------------------- | ---------------------- |
| GET    | `/api/tournaments`     | Get all tournaments    |
| GET    | `/api/tournaments/:id` | Get a tournament by ID |
| POST   | `/api/tournaments`     | Create a tournament    |
| PUT    | `/api/tournaments/:id` | Update a tournament    |
| DELETE | `/api/tournaments/:id` | Delete a tournament    |

### Players

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| GET    | `/api/players`     | Get all players    |
| GET    | `/api/players/:id` | Get a player by ID |
| POST   | `/api/players`     | Create a player    |
| PUT    | `/api/players/:id` | Update a player    |
| DELETE | `/api/players/:id` | Delete a player    |

---

## Example: Create a Tournament

### POST

```text
/api/tournaments
```

Example request:

```json
{
  "name": "San Nicolas Open 2026",
  "description": "Intermediate padel tournament",
  "location": "San Nicolas",
  "category": "Intermediate",
  "startDate": "2026-10-10",
  "endDate": "2026-10-11",
  "maxTeams": 16,
  "status": "registration",
  "entryFee": 15000
}
```

Successful response:

```text
201 Created
```

---

## Example: Create a Player

### POST

```text
/api/players
```

Example request:

```json
{
  "firstName": "Juan",
  "lastName": "Perez",
  "email": "juan.perez@example.com",
  "phone": "3364000000",
  "category": "Intermediate",
  "ranking": 15,
  "active": true
}
```

Successful response:

```text
201 Created
```

---

## Data Validation

The API uses `express-validator` to validate incoming data.

Tournament validation includes:

* Required tournament name
* Minimum tournament name length
* Required description
* Required location
* Valid tournament category
* Valid dates
* Minimum number of teams
* Valid tournament status
* Non-negative entry fee

Player validation includes:

* Required first name
* Required last name
* Valid email
* Required phone
* Valid player category
* Positive ranking
* Boolean active status

Invalid requests return HTTP `400 Bad Request`.

The player creation endpoint also checks for duplicate email addresses.

---

## Error Handling

The controllers use `try/catch` blocks to handle database and server errors.

The API uses appropriate HTTP status codes, including:

* `200 OK` — Successful GET, PUT, and DELETE operations
* `201 Created` — Successful POST operations
* `400 Bad Request` — Invalid data or invalid MongoDB IDs
* `404 Not Found` — Resource does not exist
* `500 Internal Server Error` — Unexpected server/database errors

---

## Swagger Documentation

Interactive API documentation is available through Swagger UI:

https://padel-tournament-api-bnj7.onrender.com/api-docs

Swagger documents all CRUD operations for both collections and allows endpoints to be tested directly from the browser.

---

## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/martingerardoc/padel-tournament-api.git
```

### 2. Enter the project directory

```bash
cd padel-tournament-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create the `.env` file

Create a `.env` file in the project root:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
DB_NAME=padelTournament
```

Do not commit the `.env` file to GitHub.

### 5. Start the development server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

Swagger will be available at:

```text
http://localhost:3000/api-docs
```

---

## Deployment

The API is deployed using Render and connects to MongoDB Atlas.

Production URL:

https://padel-tournament-api-bnj7.onrender.com/

Environment variables are configured directly in Render and are not stored in the GitHub repository.

---

## Project Requirements

This project implements:

* REST API using Node.js and Express
* MongoDB database integration
* Two MongoDB collections
* CRUD operations for both collections
* Data validation for POST and PUT requests
* Error handling with try/catch
* Appropriate HTTP status codes
* Swagger/OpenAPI documentation
* External deployment using Render
* Environment variables for database configuration

## Author

Martín Cespedes
