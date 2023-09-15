import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
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
        localStorage.setItem('token', data.token);
        // Redirect to /people on successful login
        navigate('/people');
      } else {
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
      setError('An error occurred while logging in');
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

export default Login;
