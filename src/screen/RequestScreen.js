import React, { useEffect, useState } from 'react';

export default function RequestScreen({ with_email }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true; // Variable to track whether the component is mounted

    const fetchData = async () => {
      const JWT_TOKEN = localStorage.getItem('token');
      const token = `Bearer ${JWT_TOKEN}`;

      try {
        const response = await fetch(`http://192.168.1.7:8000/api/request_info/${with_email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        });

        if (isMounted) {
          if (response.status === 200) {
            const responseData = await response.json();
            setData(responseData);
          } else {
            console.log('Error occurred while fetching data.');
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData(); // Call the fetchData function

    // Cleanup function to cancel the asynchronous task when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [with_email]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data ? (
        <div>Request Status - {data['status']}</div>
      ) : (
        <div>Loading...</div>
      )}
      <div>user online | offline</div>
    </div>
  );
}
