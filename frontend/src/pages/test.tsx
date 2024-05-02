import React, { useState, useEffect } from 'react';

function Test() {
    const [data, setData] = useState('');

    useEffect(() => {
        // Function to fetch data from the backend
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/data');
                const jsonData = await response.json();
                setData(jsonData.message);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setData('Failed to fetch data');
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    return (
        <div>
            <h1>Data from Backend</h1>
            <p>{data}</p>
        </div>
    );
}

export default Test;
