import React, { useEffect, useState } from 'react';
import RequestScreen from "./RequestScreen";
import ChatScreen from "./ChatScreen";

export default function ChatWindow({ with_email }) {
  const [loading, setLoading] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [rtcData, setRTCData] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);
  console.log("rtcData are you initiator",rtcData)
  useEffect(() => {
    const fetchChatHistory = async () => {
      const JWT_TOKEN = localStorage.getItem('token');
      const token = `Bearer ${JWT_TOKEN}`;

      try {
        const response = await fetch(`http://localhost:8000/api/chathistory/${with_email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setChatHistory(data);
        } else {
          console.log('Error fetching chat history');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchRTCUserInfo = async () => {
      const JWT_TOKEN = localStorage.getItem('token');
      const token = `Bearer ${JWT_TOKEN}`;

      try {
        const response = await fetch(`http://localhost:8000/api/rtc_user_info_by_id`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          // setChatHistory(data);
          console.log("datsdafsdaa",data)
        } else {
          console.log('Error fetching chat history');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRequestStatus = async () => {
      const JWT_TOKEN = localStorage.getItem('token');
      const token = `Bearer ${JWT_TOKEN}`;

      try {
        const response = await fetch(`http://localhost:8000/api/request_info/${with_email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setRequestStatus(data.status);
        } else {
          console.log('Error fetching request status');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchChatHistory();
    fetchRTCUserInfo()
    fetchRequestStatus();
  }, [with_email]);

  return (
    <div style={{ border: "1px solid red", height: "600px", width: "700px", background: "rgb(221, 237, 240,0.2)" }}>
      {loading ? (
        <p>Loading...</p>
      ) : requestStatus !== "ACCEPTED" ? (
        <RequestScreen with_email={with_email} />
      ) : (
        <ChatScreen to_email={with_email} chats={chatHistory} />
      )}
    </div>
  );
}
