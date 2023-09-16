import React, { useEffect, useState } from 'react';

function PeopleScreen() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async() => {
    // Fetch data from the /api/profiles endpoint
    const JWT_TOKEN = localStorage.getItem('token')
    const token = `Bearer ${JWT_TOKEN}`
    console.log("token",token)
    // console.log('JWET',token)
    // fetch('http://localhost:8000/api/profiles', {
    //   method: 'GET',
    //   headers: {
    //     'Accept': '*/*',
    //     'Authorization': token, // Replace with your JWT token
    //     'Content-Type': 'application/json',

    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setProfiles(data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //     setLoading(false);
    //   });


    const response2 = await fetch('http://localhost:8000/api/profiles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token, // Replace with your JWT token
      },
    });

    if (response2.status === 200) {
      const data = await response2.json();
      console.log("data",data)
      setProfiles(data);
      setLoading(false);
      // Save the token to local storage
      // localStorage.setItem('token', data.token);
      // Redirect to /people on successful login
      // navigate('/people');
    } else {
      console.log('error occured!')
      // setError('Peopleissu');
        setLoading(false);

    }


  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>PeopleScreen</h2>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            <strong>ID:</strong> {profile.id}, <strong>Gender:</strong> {profile.gender}  <strong>user_email:</strong> {profile.user_email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PeopleScreen;
