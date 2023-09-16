import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../redux/counter/AuthAction';
function Login({login,logout}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 201) {
        const data = await response.json();
        // Save the token to local storage


        if (data){
          const response = await fetch('http://localhost:8000/api/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`, // Replace with your JWT token

          },
          });

          if (response.status === 200) {
            localStorage.setItem('token', data.token);
            const meUser = await response.json();
            // Save the token to local storage
            console.log("meUser",meUser)
            login(meUser)
            // Redirect to /people on successful login
            navigate('/chat');
          } 
          else {
            console.log("Unable to fetch data from /ME")
            setError('Unable to fetch data from "/me" api..');
          }
        }
        // localStorage.setItem('token', data.token);
        // login({"user_name":"deepak18feb"})
        // // Redirect to /people on successful login
        // navigate('/chat');
      } else {
        console.log("Invalid email or password")

        setError('Invalid email or password');
      }




      // const response2 = await fetch('http://localhost:8000/api/profiles', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // if (response2.status === 200) {
      //   const data = await response.json();
      //   console.log("data",data)
      //   // Save the token to local storage
      //   // localStorage.setItem('token', data.token);
      //   // Redirect to /people on successful login
      //   // navigate('/people');
      // } else {
      //   setError('Peopleissu');
      // }



    } catch (error) {
      setError('An error occurred while logging in'+JSON.stringify(error));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
}

// export default Login;

// const mapStateToProps = (state) => {
//   console.log("sdfasdsdasomeste",state)
//   return {
  
//     state, // Assuming you have a reducer that manages a "count" property
//   }
// };

export default connect(null, { login, logout })(Login);