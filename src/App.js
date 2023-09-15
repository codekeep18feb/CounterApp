import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Import your components
import HomeScreen from './screen/HomeScreen.js';
import Login from './screen/LoginScreen.js';
import PeopleScreen from './screen/PeopleScreen';
import SignupScreen from './screen/SignupScreen';




function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}



function useAuth() {
  return localStorage.getItem('token') !== null;
}


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route
          path="/people"
          element={
            <PrivateRoute>
              <PeopleScreen />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
