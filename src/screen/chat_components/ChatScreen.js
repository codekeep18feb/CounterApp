import React, { useState } from 'react';

export default function ChatScreen({ chats, to_email,sendMsg }) {
  const [textareaValue, setTextareaValue] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (textareaValue.trim() === '') {
      return; // Don't send empty messages
    }
    else{
      sendMsg(textareaValue)
      setTextareaValue('')
    }

    // Prepare the request body
    const requestBody = {
      content: textareaValue,
    };

    const JWT_TOKEN = localStorage.getItem('token');
    const token = `Bearer ${JWT_TOKEN}`;

    // Update the UI to indicate sending
    setSendingMessage(true);

    try {
      const response = await fetch(`http://192.168.1.7:8000/api/send_msg/${to_email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 200) {
        // Message sent successfully
        console.log('Message sent successfully');
        setTextareaValue(''); // Clear the textarea after sending
      } else {
        console.error('Error sending message');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      // Reset the UI after sending
      setSendingMessage(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", "flex-direction": "column", height: "550px" }}>
        <div style={{ "flex-grow": 1, "background-color": "lightblue" }}>
          {chats.map((chat, index) => (
            <div key={index} 
            
            style={{ padding: "10px", color: Object.keys("who") && chat.who !== "ME" ? "green" : "grey", textAlign: Object.keys("who") && chat.who === "ME" ? "left" : "right", fontStyle: "italic", fontSize: "19px" }}
            
            >
              {chat.content}
            </div>
          ))}
        </div>
      </div>
      <div>
        <textarea
          style={{ width: "500px" }}
          placeholder="Type something..."
          value={textareaValue}
          onChange={handleTextareaChange}
          disabled={sendingMessage} // Disable textarea while sending
        />
        <button onClick={handleSendMessage} disabled={sendingMessage}>
          Send
          {/* {sendingMessage ? 'Sending...' : 'Send'} */}
        </button>
      </div>
    </div>
  );
}
