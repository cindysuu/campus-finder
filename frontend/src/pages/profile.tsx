import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar.tsx';
import '../styles/Profile.css';
import axios from 'axios';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

interface UserActivity {
  user_id: number;
  latitude: number;
  longitude: number;
  activity: string;
  message: string;
  isActive: boolean;
}

function Profile() {
  const [name, setName] = useState('');
  const [userActivity, setUserActivity] = useState<UserActivity>();
  const [activities, setActivities] = useState([ "Eating", "Studying", "Working Out"]);
  const [newActivity, setNewActivity] = useState('');
  const [ws, setWs] = useState<W3CWebSocket | null>(null);
  const [checked, setChecked] = useState(true);

  // Toggle
  const handleChange = (event:any) => {
    setChecked(event.target.checked);
  };

  const updateActivity = (newActivityDetails: any) => {
    setUserActivity(prevState => ({
      ...prevState,
      ...newActivityDetails
    }));
  };

  useEffect(() => {
    const makeInactive = async () => {
      const authToken = localStorage.getItem('userToken');
      try {
          await axios.post('http://localhost:8080/makeInactive', userActivity, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
      } catch (error: any) {
          alert(error.response.data);
      }
    }

    console.log('isToggled:', checked);
    if (checked === false) {
        console.log('User is inactive after toggle');
        makeInactive();
    } else {
        console.log('User is active after toggle');
    }
  }, [checked, userActivity]);

  const handleSubmit = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      updateActivity({ latitude, longitude });
      updateActivity({  isActive: true });

      const updatedActivity = {
        ...userActivity,
        latitude,
        longitude,
      };

      if (ws && ws.readyState === WebSocket.OPEN) {
        console.log('Sending update to WebSocket server:', updatedActivity);
        ws.send(JSON.stringify({
          type: 'UPDATE_LOCATION',
          friendId: updatedActivity.user_id,
          latitude: updatedActivity.latitude,
          longitude: updatedActivity.longitude,
          activity: updatedActivity.activity,
          message: updatedActivity.message,
          isActive: true
      }));
      } else {
          console.error('WebSocket connection is not open.');
      }
      
    }, (error) => {
      console.error(error);
    });

    const authToken = localStorage.getItem('userToken');
    try {
        await axios.post('http://localhost:8080/addactivity', userActivity, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        alert('Update activity successful!');
    } catch (error: any) {
        alert(error.response.data);
    }
  }

  const handleAddActivity = async () => {   // Async vs no async?
    if (newActivity.trim() !== "") {
      if (activities.includes(newActivity)) {
        alert('Activity already exists!');
        return;
      }
      setActivities(prevActivities => [...prevActivities, newActivity]);
      setNewActivity('');
    }
  }

  const removeActivity = (activityToRemove:any) => {
    setActivities(currentActivities => 
      currentActivities.filter(activity => activity !== activityToRemove)
    );
  };
  
  const handleActivityChange = (activityValue: React.SetStateAction<string>) => {
    updateActivity({ activity: activityValue });
  };

  const handleMessageChange = (event: any) => {
    const newMessage = event.target.value;
    updateActivity({ message: newMessage });
  };

  useEffect(() => {
    const client = new W3CWebSocket('ws://localhost:8080/ws');

    client.onopen = () => {
        console.log('WebSocket Client Connected');
    };

    client.onclose = () => {
        console.log('WebSocket Client Disconnected');
    };

    setWs(client);

    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:8080/user', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        console.log('User data:', response.data)
        console.log("User ID: ", response.data.id);
        setName(response.data.name);
        setUserActivity(current => ({
          ...current,
          user_id: response.data.id,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
          activity: response.data.activity,
          message: response.data.message,
          isActive: response.data.isActive
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();

    return () => {
      client.close();
    };
  }, []);

  return (
    <div className="profile-container">
      <NavigationBar />

      <div className="welcome-banner">
        Welcome, {name}
      </div>

      <div className="simple-container-status" style={{ alignSelf: 'left' }}>
        <FormControlLabel
            control={
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    name="checkedB"
                    color="primary"
                    sx={{ m: 3 }}
                />
            }
            label="Show status"
        />
      </div>
      
      <div className="status-action-container">
      <div className="simple-container">
        <div className="text-title">What are you doing?</div>
        <div className="status-tags">
          {activities.map(activity => (
            <div key={activity} className="tag-with-remove">
              <button
                key={activity}
                className={`status-tag ${userActivity?.activity === activity ? 'active' : ''} ${!checked ? 'disabled' : ''}`}
                onClick={() => handleActivityChange(activity)}
                disabled={!checked}
              >
                {activity}
              </button>

              <button
                className="remove-tag-button"
                onClick={() => removeActivity(activity)} // Remove the activity when clicked
                disabled={!checked}
                >
                  x
              </button>
            </div>
          ))}

          {/* Add functionality for the user to add and remove their own activities — for now, just have these activities */}
          <input
            placeholder="Add your own activity"
            value={newActivity}
            onChange={(event) => setNewActivity(event.target.value)}
            disabled={!checked}
            style={{ width: '100%', marginTop: '30px' }}
          />
          <button 
            className="submit-button" 
            onClick={() => handleAddActivity()}
            disabled={!checked}
          >
            Add Activity
          </button>

        </div>
      </div>

      <div className="simple-container">
        <div className="text-title">Add a message</div>
        <div className="status-message">
          <textarea
            placeholder="Type your status here"
            value={userActivity?.message} 
            onChange={handleMessageChange}  
            rows={4}
            cols={50}
            disabled={!checked}
          />
        </div>
        <button 
          className="submit-button" 
          onClick={() => handleSubmit()}
          disabled={!checked}
        >
          Update My Status
        </button>
      </div>
      </div>

    </div>
  );
}

export default Profile;
