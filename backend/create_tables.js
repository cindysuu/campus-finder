// Code for creating tables

// USERS TABLE
// id | name | email | password
// name, email, and password are not null
// email is unique

// FRIENDS TABLE
// user_id | friend_id

// USER_ACTIVITIES TABLE
// user_id | location | status

/*USE myappdb;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE friends (
    user_id INT,
    friend_id INT,
    PRIMARY KEY (user_id, friend_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (friend_id) REFERENCES users(id)
);

CREATE TABLE user_activities (
    user_id INT,
    longitude DECIMAL(9,6),
    latitude DECIMAL(9,6),
    activity VARCHAR(255),
    message VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_activities2 (
    user_id INT,
    location VARCHAR(255),
    status VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);*/
