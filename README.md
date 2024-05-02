# Campus Finder

Campus Finder helps students find their friends on college campuses.

## Backend
The backend is built using Node.js and Express.js to create RESTful APIs. Some of the routes I created include POST/login, POST/register, and GET/friendactivities — refer to routesIndex.js for more details. Bcrypt is used for password encryption, and JSON Web Tokens (JWTs) are used for user authentication. Websockets are also used to update user location in real-time.

## Frontend
The frontend is built using React and uses axios to fetch API calls asynchronously.

## Database
A simple MySQL database is used to store user information.
[Table Schema]

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
