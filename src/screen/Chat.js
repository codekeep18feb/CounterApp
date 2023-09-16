import React, { useEffect, useState } from 'react';
import PeopleScreen from "./PeopleScreen"
import ChatScreen from "./ChatScreen"
import { connect } from 'react-redux';


function Chat({auth_data}) {
  const [profiles, setProfiles] = useState([]);
  const [with_email, SetWithEMail] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("auth_data",auth_data)
  const fetchData = async () => {
    const JWT_TOKEN = localStorage.getItem('token');
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch('http://localhost:8000/api/read_online_circle', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setProfiles(data);
        setLoading(false);
      } else {
        console.log('Error occurred while fetching profiles.');
        setLoading(false);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setLoading(false);
    }
  };


  useEffect(async() => {
    // fetchData(); // Fetch data initially
    // console.log("main useeffect ran")

    // const intervalId = setInterval(() => {
    //   fetchData(); // Fetch data every 10 seconds
    // }, 10000);

    
    // Fetch data from the /api/profiles endpoint
    const JWT_TOKEN = localStorage.getItem('token')
    const token = `Bearer ${JWT_TOKEN}`
    console.log("token",token)
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
    <div style={{display:"flex"}}>
      <div>
      <PeopleScreen profiles={profiles} SetWithEMail={SetWithEMail} with_email={with_email}/>
      </div>
      <div>
      {with_email?<ChatScreen with_email={with_email}/>:"loading..."}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("grab auth outof it",state.auth.data)
  return {
  
    auth_data:state.auth.data // Assuming you have a reducer that manages a "count" property
  }
};


// export default Chat;
export default connect(mapStateToProps, null)(Chat);;
