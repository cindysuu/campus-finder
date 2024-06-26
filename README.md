# Campus Finder

Campus Finder helps students find their friends on college campuses.

### Features:
- **User Registration and Login**: Secure signup and login functionality, complete with session management.
- **Friend Tracking**: Real-time tracking of friends’ locations and statuses on a campus map.
- **Activity Updates**: Users can post updates about their current activities and status.
- **Friend Management**: Users can add and remove their friends by email to see their locations and status.
- **Turn Status Off**: When a user turns their status off, their friends can no longer see their location or status.

---

## Backend
The backend of Campus Finder is built using Node.js with Express.js, facilitating scalable RESTful APIs that ensure efficient data handling and communication between the server and client-side applications.

### Core Features:
- **User Authentication**: Secure login and registration processes are implemented using Bcrypt for password hashing and JSON Web Tokens (JWTs) for maintaining session states securely.
- **Real-Time Location Tracking**: Integration of Websockets allows the app to update and share user locations in real-time, enhancing user interaction and connectivity.
- **RESTful API Routes**:
  - `POST /login`: Authenticate and log users into the system.
  - `POST /register`: Register a new user with encrypted password storage.
  - `GET /friendactivities`: Fetch a list of recent activities from friends.

For a complete list of API routes and their functionalities, refer to the `routesIndex.js` file within the project repository.

---

## Frontend
The frontend interface of Campus Finder is built using React, offering a responsive and intuitive user experience. It employs axios for making asynchronous API requests, thus providing a seamless and dynamic interaction with the backend.

### Interactive Features:
- **User Dashboard**: Displays personalized information about user activities.
- **Friend Locator**: Users can see the real-time locations of their friends on a map, promoting easier meet-ups.

---

## Database
Campus Finder uses a MySQL database to store and manage user-related data efficiently. Below are the schema details of the key tables used within the database:

### Users Table
This table stores information about the users registered on the platform.

| Field      | Type         | Description                |
|------------|--------------|----------------------------|
| `id`       | INT          | Primary key, auto-increment|
| `name`     | VARCHAR(255) | User's full name           |
| `email`    | VARCHAR(255) | User's email address, unique |
| `password` | VARCHAR(255) | Hashed password for security |

### Friends Table
This table manages the relationships between users, indicating friendships.

| Field       | Type | Description                                   |
|-------------|------|-----------------------------------------------|
| `user_id`   | INT  | Foreign key from Users table, part of primary key |
| `friend_id` | INT  | Foreign key from Users table, part of primary key |

### User Activities Table
This table records activities and their statuses for each user, including location data.

| Field       | Type            | Description                                   |
|-------------|-----------------|-----------------------------------------------|
| `user_id`   | INT             | Foreign key from Users table                  |
| `longitude` | DECIMAL(9,6)    | Longitude of the activity location            |
| `latitude`  | DECIMAL(9,6)    | Latitude of the activity location             |
| `activity`  | VARCHAR(255)    | Brief description of the activity             |
| `message`   | VARCHAR(255)    | Optional message related to the activity      |
| `isActive`  | BOOLEAN DEFAULT | Status of the activity, default is TRUE       |

---

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/campus-finder.git
    ```

2. Navigate to the project directory:

    ```bash
    cd campus-finder
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Start the backend

   ```bash
    cd backend
    ```

   ```bash
    node routesIndex.js
    ```

6. Start the frontend

   ```bash
    cd frontend
    ```

   ```bash
    npm run start
    ```

    This will start the server on [http://localhost:8080](http://localhost:8080) and browser on [http://localhost:3000](http://localhost:3000). Open http://localhost:3000 in your browser to see the project.
