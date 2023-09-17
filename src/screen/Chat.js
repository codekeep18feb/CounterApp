import React, { useEffect, useState } from 'react';
import PeopleScreen from "./PeopleScreen"
import ChatWindow from "./ChatWindow"
import { connect } from 'react-redux';


function Chat({auth_data}) {
  const [profiles, setProfiles] = useState([]);
  const [online_profiles, setOnlineProfiles] = useState([]);
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

        setOnlineProfiles(data);
        // setLoading(false);
      } else {
        console.log('Error occurred while fetching profiles.');
        // setLoading(false);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // setLoading(false);
    }
  };


  useEffect(async() => {
    fetchData(); // Fetch data initially
    console.log("main useeffect ran")

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 10 seconds
    }, 10000);

    
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

  useEffect(()=>{
      // console.log("new online profiles arrived",online_profiles)
      // here will make the changes to profiles's online state
      // if online_profiles has items and not just empty
            // in that case let's create two arrays 
              // offline_profiles -> items of profiles where email is not in online_profiles
              // online_profiles -> items of profiles where email is in online_profiles
            //now let's loop through these two arrays offline_profiles and online_profiles and update the online status in profiles using setProfiles

        console.log("new online profiles arrived", online_profiles,profiles);

        // Check if online_profiles has items and is not empty
        if (online_profiles.length > 0) {
          // Create a set of online email addresses for faster lookup
          const onlineEmailsSet = new Set(online_profiles);
      
          // Update the online status in profiles using setProfiles
          const updatedProfiles = profiles.map(profile => {
            if (onlineEmailsSet.has(profile.user_email)) {
              return { ...profile, online: true };
            } else {
              return { ...profile, online: false };
            }
          });
          console.log("updatedProfiles are they not changnin",updatedProfiles)
          // Set the updated profiles
          setProfiles(updatedProfiles);
        }
      
          

  },[online_profiles])


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{display:"flex"}}>
      <div>
      <PeopleScreen profiles={profiles} SetWithEMail={SetWithEMail} with_email={with_email}/>
      </div>
      <div>
      {with_email?<ChatWindow with_email={with_email}/>:"loading..."}
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
