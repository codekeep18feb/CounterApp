import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Import your components
import HomeScreen from './screen/HomeScreen.js';
import Login from './screen/LoginScreen.js';
import Chat from './screen/chat_components/Chat';
import SignupScreen from './screen/SignupScreen';
import Header from "./screen/Header"
import Video from './screen/video_components/Video.js';



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
      <Header />
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />

<Route
          path="/video_chat"
          element={
            <PrivateRoute>
              <Video />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
