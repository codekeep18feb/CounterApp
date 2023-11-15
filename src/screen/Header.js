import React from 'react'
import { connect } from 'react-redux';
import { logout } from '../redux/counter/AuthAction';
import { useNavigate } from 'react-router-dom';

function Header({auth_data,logout}) {
  const navigate = useNavigate();

  console.log("auth_data in header",auth_data)
  const handleLogout =async ()=>{

    
    try {
      // Send a POST request to your server with the form data
      logout()
      
      const JWT_TOKEN = localStorage.getItem('token')
      const token = `Bearer ${JWT_TOKEN}`
      console.log("token",token)

      const response = await fetch('http://3.93.61.41:8000/api/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token, // Replace with your JWT token


        },
      });

      if (response.ok) {
        // If the POST request is successful, navigate to the "/login" route
        // navigate('/login');
        localStorage.removeItem("token")
        navigate('/login');
      } else {
        // Handle error response here (e.g., display an error message)
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }

  }

  return (auth_data?<button onClick={()=>{
    handleLogout()

  }}>Logout</button>:<button>Login</button>)
}

const mapStateToProps = (state) => {
  console.log("grab auth outof it",state.auth.data)
  return {
  
    auth_data:state.auth.data // Assuming you have a reducer that manages a "count" property
  }
};


// export default Chat;
export default connect(mapStateToProps, { logout })(Header);;