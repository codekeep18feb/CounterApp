import React, { useEffect, useState } from 'react';
import RequestScreen from "./RequestScreen";
import ChatScreen from "./ChatScreen";


export default function ChatWindow({ with_email,rtcData }) {
  console.log("here we are",rtcData)
  const [loading, setLoading] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  // const [rtcData, setRTCData] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);
  // console.log("rtcData are you initiator",rtcData)

  const addRTCUserInfo = async (isInitiator,sdp) => {
    console.log("am i being called",isInitiator,sdp)
    const JWT_TOKEN = localStorage.getItem('token');
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch(`http://localhost:8000/api/add_rtc_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          "initiator":isInitiator,
          "sdp":sdp
        }),

      });

      if (response.status === 200) {
        const data = await response.json();
        // setRTCData(data);
        console.log("sucessfully saved sdp",data)
      } else {
        console.log('Error fetching chat history');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to initialize WebRTC
  const initializeWebRTC = () => {
    console.log("ensure it's not called multiple times...")
    const lc = new RTCPeerConnection();
    const dc = lc.createDataChannel('channel');

    dc.onmessage = (e) => console.log('msg from B' + e.data);
    dc.onopen = (e) => console.log("connection opened!");

    lc.onicecandidate = (e) =>
      console.log("New Ice Candidate reprinting SDP" + JSON.stringify(lc.localDescription));
      if (JSON.stringify(lc.localDescription)!=null){
        addRTCUserInfo(true,JSON.stringify(lc.localDescription))
        console.log("NOtice how many times it's being called..",JSON.stringify(lc.localDescription))
  
      }

    lc.createOffer()
      .then((o) => lc.setLocalDescription(o))
      .then((a) => console.log('offer set successfully!'));
  };
  

  const respondeWebRTC =()=>{
    //let's grab the offer first??
    // offer = ?

    // rc = new RTCPeerConnection()

    // rc.onicecandidate = e => console.log("New Ice Candidate reprinting SDP" + JSON.stringify(rc.localDescription))

    // rc.ondatachannel=e=>{

    //     rc.dc=e.channel;

    //     rc.dc.onmessage = e => console.log("new message from client!!"+e.data)

    //     rc.dc.onopen = e => console.log("connection opened!")

        

    // }

    // {type: 'offer', sdp: 'v=0\r\no=- 1039027373675947532 2 IN IP4 127.0.0.1\r\ns…:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n'}

    // rc.setRemoteDescription(offer).then(a=>console.log("offerset"))



    // rc.createAnswer().then(a => rc.setLocalDescription(a)).then(a=>console.log("answer created"))


  }


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
    // const fetchRTCUserInfo = async () => {
    //   const JWT_TOKEN = localStorage.getItem('token');
    //   const token = `Bearer ${JWT_TOKEN}`;

    //   try {
    //     const response = await fetch(`http://localhost:8000/api/rtc_user_info_by_id`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': token,
    //       },
    //     });

    //     if (response.status === 200) {
    //       const data = await response.json();
    //       // setChatHistory(data);
    //       console.log("datsdafsdaa",data)
    //     } else {
    //       console.log('Error fetching chat history');
    //     }
    //   } catch (error) {
    //     console.error('An error occurred:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

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
    console.log("canwedecidertcData",rtcData,rtcData != null && Object.entries(rtcData).length === 0)
    if (rtcData != null && Object.entries(rtcData).length === 0){
      initializeWebRTC();

    }
    else if(rtcData != null && Object.entries(rtcData).length > 0){
      respondeWebRTC();

    }

    // fetchRTCUserInfo()
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
