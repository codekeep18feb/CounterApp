import React, { useEffect, useState } from 'react';

export default function RequestScreen({ with_email }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null)

  useEffect(async() => {
    // Fetch data from the /api/profiles endpoint
    const JWT_TOKEN = localStorage.getItem('token')
    const token = `Bearer ${JWT_TOKEN}`
    console.log("token",token)
    const response2 = await fetch(`http://localhost:8000/api/request_info/${with_email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token, // Replace with your JWT token
      },
    });

    if (response2.status === 200) {
      const data = await response2.json();
      console.log("data",data)
      setData(data)
      setLoading(false);
    } else {
      console.log('error occured!')
      // setError('Peopleissu');
        setLoading(false);

    }


  }, [with_email]);


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data?<div>Request Status - {data['status']}</div>:<div>Loading...</div>}
      <div>user online | offline </div>
    </div>
  );
}
