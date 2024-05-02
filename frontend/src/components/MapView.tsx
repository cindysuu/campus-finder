import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { LatLngTuple } from 'leaflet';
import axios from 'axios';
import '../styles/Map.css';

// Fix the default icon issue in React-Leaflet with webpack
type DefaultIcon = L.Icon.Default & { _getIconUrl?: unknown };
delete (L.Icon.Default.prototype as DefaultIcon)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface Friend {
    user_id: number;
    name: string;
    // email: string;
    latitude: number;
    longitude: number;
    activity: string;
    message: string;
}

function MapView(){
    const [friends, setFriends] = useState<Friend[]>([]);
    const [position, setPosition] = useState<LatLngTuple>([39.952217, -75.193214]); // Latitude and Longitude of the map center

    // Fetch the user's friends and update to friendIds
    // For each friendId in friends, get their activity and location
    // Update the friend's location and info on the map

    const ws = new WebSocket('ws://localhost:8080/ws');

    useEffect(() => {

        getFriendLocation();
        console.log('Friends:', friends);

        ws.onopen = () => {
            console.log('WebSocket Connected');
        };
    
        ws.onmessage = (event) => {
            console.log('Received:', event);
            
            const data = JSON.parse(event.data);

            console.log('Data:', data);

            if (data.type === 'FRIEND_LOCATION_UPDATE') {
                console.log('Friend Location Update:');
                console.log(data.friendId, data.latitude, data.longitude, data.activity, data.message, data.isActive);
                setFriends(friends => friends.map(friend => {
                    if (friend.user_id === data.friendId) {
                        console.log("Updating friend");
                        return {
                            ...friend,
                            latitude: data.latitude, 
                            longitude: data.longitude, 
                            activity: data.activity, 
                            message: data.message,
                            isActive: data.isActive
                        };
                    }
                    return friend;
                }));
            }
        };
    
        ws.onerror = (error) => {
            console.error('WebSocket Error: ', error);
        };
    
        ws.onclose = () => {
            console.log('WebSocket Disconnected');
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setPosition([position.coords.latitude, position.coords.longitude]);
            },
            () => {
                alert('Unable to retrieve your location');
            }
        );


        // return () => {
        //     ws.close();
        // };
    }, []);

    async function getFriendLocation() {
        const authToken = localStorage.getItem('userToken');
        try {
            const response = await axios.get('http://localhost:8080/friendactivities', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            setFriends(response.data);
            console.log("Response: ", response.data);
        } catch (error) {
            alert('Failed to fetch friend location!');
        }
    }

    return (
        <MapContainer 
            center={position} 
            zoom={16} 
            style={{ 
                height: '500px', 
                width: '100%', 
                borderRadius: '20px', 
                overflow: 'hidden'
            }}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <CircleMarker
                center={position}
                color="red" 
                radius={10} 
                fillColor="#f03"
                fillOpacity={0.5}
                stroke={true}
            >
                <Popup>
                    You are here!
                </Popup>
            </CircleMarker>

            {friends.map((friend, index) => (
                <Marker key={index} position={[friend.latitude, friend.longitude]}>
                    <Popup>
                        <div>
                            <h3>{friend.name}</h3>
                            <p className='activity'>{friend.activity}</p>
                            <p>{friend.message}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapView;