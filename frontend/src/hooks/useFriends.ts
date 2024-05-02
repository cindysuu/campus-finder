import { useState } from 'react';
import axios from 'axios';

interface Friend {
    email: string;
    name: string;
    avatar: string;
    friendId: number;
}

const useFriends = () => {
    // const [friends, setFriends] = useState([]);
    // const [friends, setFriends] = useState([
    //     { friendId: 0, name: 'example', email: 'user@example.com', avatar: 'path/to/avatar.png' },
    // ]);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getFriends = async () => {
        const authToken = localStorage.getItem('userToken');
        try {
            const response = await axios.get('http://localhost:8080/friends', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            setFriends(response.data);
        } catch (error: any) {
            console.error('Error fetching friends:', error);
            setError(error);
            alert('Failed to fetch friends!');
        }
    };

    return { friends, error, getFriends };
};

export default useFriends;
