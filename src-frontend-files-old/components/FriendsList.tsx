import React from 'react';

interface Friend {
    id: number;
    name: string;
}

const FriendsList: React.FC = () => {
    const [friends, setFriends] = React.useState<Friend[]>([]);

    // Add your code here

    return (
        <div>
            {/* Add your JSX code here */}
        </div>
    );
};

export default FriendsList;