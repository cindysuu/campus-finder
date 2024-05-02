require('dotenv').config({ path: '../.env' });

const { createServer } = require("http");

// Set up basic Express server
const express = require('express');
const app = express();
const WebSocket = require('ws');

app.use(express.json());    // Middleware for parsing JSON bodies

// Enable CORS to ensure that the frontend can make requests to the backend (if they are on different ports)
const cors = require('cors');
app.use(cors());

const port = process.env.PORT || 8080;
const server = createServer(app);
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Use websockets for real-time communication
const wss = new WebSocket.Server({ path: "/ws", server: server });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // console.log('Received message:', message);
        const data = JSON.parse(message);
        // console.log('Parsed message:', data);
        if (data.type === 'UPDATE_LOCATION') {
            updateActivity(data.userId, data.latitude, data.longitude, data.activity, data.message, data.isActive);

        // Broadcast updated info to friends
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: 'FRIEND_LOCATION_UPDATE',
                    friendId: data.friendId,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    activity: data.activity,
                    message: data.message,
                    isActive: data.isActive
                }));
            }
        });
    }   
    });

    ws.on("close", () => {
        console.log("WebSocket connection closed");
    });
});

const { saveUser, getFriends, addFriend, removeFriendPairing, checkFriendPairing, updateActivity, getFriendActivities, findUserById, findUserByEmail, findUserIdByEmail } = require('./userQueries');

// BACKEND ROUTES

// Test Route for Connecting Frontend and Backend
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// User Registeration Route
const bcrypt = require('bcryptjs');
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    // Save the user to the database
    try {
        // Check if the email is already registered
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already registered. Try a different email.' });
        }
        // If the email is not registered, hash the password and save the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await saveUser({ name, email, password: hashedPassword });
        res.status(201).send({ message: 'User registered', userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error registering user' });
    }
});

// User Login Route
const jwt = require('jsonwebtoken');
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find the user in the database
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET); // { expiresIn: '24h' });
        return res.status(200).send({ message: 'User logged in', token });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in' });
    }
});

// app.use(authenticateToken); // This should come before any routes that require `req.user`

// Retreive list of friends for the logged-in user
app.get('/friends', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const friends = await getFriends(userId);
        res.status(200).send(friends);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching friends' });
    }
});

// Add a new friend connection
app.post('/addfriend', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { email } = req.body;

    if (!email) {
        return res.status(400).send('Friend email is required');
    }

    try {
        const friendId = await findUserIdByEmail(email);

        // If the email is not registered, return an error: no email found
        if (!friendId) {
            return res.status(404).send('No user found with that email');
        }

        if (friendId === req.user.userId) {
            return res.status(400).send('You cannot add yourself as a friend');
        }

        // Check if the friend pairing already exists
        const pairingExists = await checkFriendPairing(userId, friendId);
        if (pairingExists) {
            return res.status(400).send('Friend pairing already exists');
        }

        const result = await addFriend(userId, friendId);
        res.status(201).send('Friend added successfully');
    } catch (error) {
        res.status(500).send('Error adding friend');
    }
});

// Remove a friend connection
app.post('/removefriend', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { friendId } = req.body;

    if (!friendId) {
        return res.status(400).send('Friend ID is required');
    }

    try {
        const result = await removeFriendPairing(userId, friendId);
        res.status(201).send('Friend removed successfully from database');
    } catch (error) {
        res.status(500).send('Error removing friend');
    }
});

// Get friend by email
/*app.get('/getfriend', authenticateToken, async (req, res) => {
    const { email } = req.query;    // Data in a GET request should be passed in the query string
    console.log("Friend Email:", email);    // Debugging

    if (!email) {
        return res.status(400).send('Friend email is required');
    }

    try {
        const friend = await findUserByEmail(email);
        return res.json(friend);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error retrieving friend');
    }
});*/

app.get('/user', authenticateToken, async (req, res) => {       // Gets user name and email by id
    const userId = req.user.userId;
    try {
        const userInfo = await findUserById(userId);
        res.json({id: userId, name: userInfo.name, email: userInfo.email})
    } catch (error) {
        res.status(500).send('Error retrieving user information');
    }
});

// Update the location and status of the logged-in user
app.post('/addactivity', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { latitude, longitude, activity, message, isActive } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).send('Location could not be found');
    }

    if (!activity) {
        return res.status(400).send('Activity is required');
    }
    
    try {
        await updateActivity(userId, latitude, longitude, activity, message, isActive);
        res.send('Activity updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating activity');
    }
});

app.post('/makeInactive', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    try {
        await updateActivity(userId, 0, 0, '', '', false);
        res.send('Activity set to inactive');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error setting activity to inactive');
    }
});

// Get friend locations
app.get('/friendactivities', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    try {
        const friendActivities = await getFriendActivities(userId);
        res.status(200).send(friendActivities);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching friend activities');
    }
});

// Middleware to verify JWT (Authentication)
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}