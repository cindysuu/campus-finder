// React page to manage friends list and add new friends

import React, { useEffect, useState } from 'react';
import '../styles/Friends.css';
import axios from 'axios';
import NavigationBar from '../components/NavigationBar.tsx';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body {
    width: 100%;
    height: 100%;
    background-color: #2e6a89;
  }
`;

function Friends() {
    // Friends data (ID, NAME, EMAIL)
    const [friends, setFriends] = useState([
        { friendId: 0, name: 'example', email: 'user@example.com', avatar: 'path/to/avatar.png' },
    ]);
    const [friendEmail, setFriendEmail] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFriendEmail(e.target.value);
    };

    const handleRemoveFriend = async (id: number) => {
        const authToken = localStorage.getItem('userToken');
        try {
            await axios.post('http://localhost:8080/removefriend', { friendId: id }, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            alert('Friend removed!');
            getFriends();  // Refresh the list after removing a friend
            console.log('Friends:', friends);
        } catch (error) {
            alert('Failed to remove friend!');
        }
    };

    const addFriend = async (email: string, authToken: unknown) => {
        try {
            await axios.post('http://localhost:8080/addfriend', { email }, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            alert('Friend added successfully!');
            getFriends();  // Refresh the list after adding a new friend
            console.log('Friends:', friends);
        } catch (error) {
            alert('Error adding friend!');
        }
    };

    async function getFriends() {
        const authToken = localStorage.getItem('userToken');
        try {
            const response = await axios.get('http://localhost:8080/friends', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            setFriends(response.data);
        } catch (error) {
            alert('Failed to fetch friends!');
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addFriend(friendEmail, localStorage.getItem('userToken'));
    }

    // Load existing friends on page load
    useEffect(() => {
        getFriends();
    }, []);

    return (
        <>
        <GlobalStyle />
            <NavigationBar />

            <div className="simple-container">
                <h1>Friends</h1>
                <div className="friends-list">
                    {friends.map(friend => (
                        <div key={friend.email} className="friend-item">
                            <div className="friend-info">
                                <img src="../avatar.png" alt={`${friend.name}'s avatar`} className="avatar" />
                                <div>
                                    <div className="name">{friend.name}</div>
                                    <div className="email">{friend.email}</div>
                                </div>
                            </div>
                            <button className="remove-btn" onClick={() => handleRemoveFriend(friend.friendId)}>Remove</button>
                        </div>
                    ))}
                </div>
                
                <h2>Add Friend</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Type your friend's email here" value={friendEmail} onChange={handleEmailChange} />
                    <button className="submit-button">Add Friend</button>
                </form>
            </div>
        </>
    );
}

export default Friends;
