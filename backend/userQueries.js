// Database functions

const pool = require('./database');

async function saveUser(user) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        pool.query(query, [user.name, user.email, user.password], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve({ id: results.insertId, ...user });
            }
        });
    });
}

async function findUserById(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT name, email FROM users WHERE id = ?';
        pool.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]); // results[0] because SELECT returns an array, even if it's one user
            }
        });
    });
}

async function findUserByEmail(email) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id, name, email, password FROM users WHERE email = ?';
        pool.query(query, [email], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]); // results[0] because SELECT returns an array, even if it's one user
            }
        });
    });
}

async function findUserIdByEmail(email) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id FROM users WHERE email = ?';
        pool.query(query, [email], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0].id);
            }
        });
    });
}

function getFriends(userId) {
    return new Promise((resolve, reject) => {
        // const query = 'SELECT friend_id AS friendId, name FROM friends JOIN users ON friends.friend_id = users.id WHERE user_id = ?';
        const query = 'SELECT friend_id AS friendId, name, email FROM friends JOIN users ON friends.friend_id = users.id WHERE user_id = ?';
        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// Write a function that checks if the friend pairing already exists
function checkFriendPairing(userId, friendId) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM friends WHERE user_id = ? AND friend_id = ?';
        pool.query(query, [userId, friendId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.length > 0);
            }
        });
    });
}

function addFriend(userId, friendId) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO friends (user_id, friend_id) VALUES (?, ?)';
        pool.query(query, [userId, friendId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve('Friend added successfully');
            }
        });
    });
}

function removeFriendPairing(userId, friendId) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM friends WHERE user_id = ? AND friend_id = ?';
        pool.query(query, [userId, friendId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve('Friend removed successfully');
            }
        });
    });
}

function updateActivity(userId, latitude, longitude, activity, message, isActive) {
    return new Promise((resolve, reject) => {
        console.log('Received params:', userId, latitude, longitude, activity, message, isActive);

        const updateQuery = 'UPDATE user_activities SET latitude = ?, longitude = ?, activity = ?, message = ?, isActive = ? WHERE user_id = ?';

        pool.query(updateQuery, [latitude, longitude, activity, message, isActive, userId], (error, results) => {
            if (error) {    
                reject(error);
            } else if (results.affectedRows === 0 && userId) {
                const insertQuery = 'INSERT INTO user_activities (user_id, latitude, longitude, activity, message, isActive) VALUES (?, ?, ?, ?, ?, ?)';
                pool.query(insertQuery, [userId, latitude, longitude, activity, message, isActive ? 1 : 0], (insertError, insertResults) => {
                    if (insertError) {
                        reject(insertError);
                    } else {
                        resolve('Activity created successfully');
                    }
                });
            } else {
                resolve('Activity updated successfully');   // If the user already has an activity, update it
            }
        });        
    });
}

function getFriendActivities(userId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT users.name, user_activities.user_id, user_activities.latitude, user_activities.longitude, user_activities.activity, user_activities.message, user_activities.isActive 
                       FROM friends
                       JOIN user_activities ON friends.friend_id = user_activities.user_id
                       JOIN users ON friends.friend_id = users.id
                       WHERE friends.user_id = ? AND user_activities.isActive = 1`;
        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    saveUser,
    findUserById,
    findUserByEmail,
    findUserIdByEmail,
    getFriends,
    checkFriendPairing,
    addFriend,
    removeFriendPairing,
    updateActivity,
    getFriendActivities
};



