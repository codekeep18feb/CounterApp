import React, { useEffect, useState, useRef } from 'react';
import RequestScreen from "./RequestScreen";
import ChatScreen from "./ChatScreen";
import { object } from 'prop-types';

export default function ChatWindow({ with_email,with_userid }) {
  // console.log("here we are", rtcData);
  const [loading, setLoading] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [requestStatus, setRequestStatus] = useState(null);
  const [rtcData, setRTCData] = useState(null)
  const myRef = useRef(null);

  const fetchRTCUserInfo = async () => {
    const JWT_TOKEN = localStorage.getItem('token');
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch(`http://localhost:8000/api/rtc_user_info_by_id/${with_userid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        return Object.entries(data).length == 0 ? null : data
        // setRTCData(data);
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

  
  const addRTCUserInfo = async (isInitiator, sdp,to_user) => {
    console.log("am I being called", isInitiator, sdp);
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
          "initiator": isInitiator,
          "sdp": sdp,
          "to_user":to_user
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("successfully saved sdp", data);
      } else {
        console.log('Error fetching chat history');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveRTCUserAns = async (isInitiator, sdp,to_user) => {
    console.log("save answer", isInitiator, sdp,to_user);
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
          "initiator": isInitiator,
          "sdp": sdp,
          "to_user":to_user
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("successfully saved sdp", data);
      } else {
        console.log('Error fetching chat history');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRTCOffer = async () => {
    // console.log("am I being called", isInitiator, sdp);
    const JWT_TOKEN = localStorage.getItem('token');
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch(`http://localhost:8000/api/get_my_rtc_offer`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("successfully saved sdp", data);
        return data['sdp']
      } else {
        console.log('Error fetching chat history');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchUserId = async (token,with_email)=>{

    // http://127.0.0.1:8000/api/users/query?q_email=deepaksingh.18feb%40gmail.com
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/query?q_email=${with_email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("successfully fetched user", data['id']);
        return data['id']
      } else {
        console.log('Error fetching chat history');
        return null
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  }
  const initializeWebRTC = async (token) => {
    console.log("Ensure it's not called multiple times...")
    const lc = new RTCPeerConnection();
    const dc = lc.createDataChannel('channel');

    dc.onmessage = (e) => console.log('msg from B' + e.data);
    dc.onopen = (e) => console.log("connection opened!");

    lc.onicecandidate = async (e) => {
      if (e.candidate) {
        // Candidate is available, call addRTCUserInfo
        console.log("with_email let's fetch user",with_email)
        const to_user_id = await fetchUserId(token,with_email)
        console.log("do i see this one",to_user_id)
        addRTCUserInfo(true, JSON.stringify(lc.localDescription),to_user_id);
        // console.log("Notice how many times it's being called...", JSON.stringify(lc.localDescription));
      }
    }

    lc.createOffer()
      .then((o) => lc.setLocalDescription(o))
      .then((a) => console.log('offer set successfully!'));
    
    };

  // const respondeWebRTC = () => {
  //   // Implement your response logic here
  // }
  const respondeWebRTC = async (token) => {
    console.log("let's grab the offer first..")
    const offer_str = await fetchRTCOffer()
    const offer = JSON.parse(offer_str)
    console.log("here is your offer love",offer,typeof(offer))
    const rc = new RTCPeerConnection()

    rc.onicecandidate = async (e) => {
      if (e.candidate) {
        console.log("herei s the ans" + JSON.stringify(rc.localDescription))
        const to_user_id = await fetchUserId(token,with_email)

        saveRTCUserAns(false,JSON.stringify(rc.localDescription),to_user_id)

      }
      
    }

    rc.ondatachannel=e=>{

        rc.dc=e.channel;

        rc.dc.onmessage = e => console.log("new message from client!!"+e.data)

        rc.dc.onopen = e => console.log("connection opened!")

        

    }

    rc.setRemoteDescription(offer).then(a=>console.log("offerset"))



    rc.createAnswer().then(a => rc.setLocalDescription(a)).then(a=>console.log("answer created"))
    // const rc = new RTCPeerConnection()
    // rc.onicecandidate = e => {
    //   // const to_user_id = await fetchUserId(token,with_email)
    //   console.log("this is never getting called??" ,JSON.stringify(rc.localDescription))
    // }
    // rc.ondatachannel=e=>{
    //     rc.dc=e.channel;
    //     rc.dc.onmessage = e => console.log("new message from client!!"+e.data)
    //     rc.dc.onopen = e => console.log("connection opened!")
    // rc.setRemoteDescription(offer).then(a=>console.log("offerset"))
    // rc.createAnswer().then(a => rc.setLocalDescription(a)).then(a=>console.log("answer created"))



    // }
      
    
    // }
    // dc.onmessage = (e) => console.log('msg from B' + e.data);
    // dc.onopen = (e) => console.log("connection opened!");

    // lc.onicecandidate = (e) => {
    //   if (e.candidate) {
    //     // Candidate is available, call addRTCUserInfo
    //     addRTCUserInfo(true, JSON.stringify(lc.localDescription));
    //     console.log("Notice how many times it's being called...", JSON.stringify(lc.localDescription));
    //   }
    // }

    // lc.createOffer()
    //   .then((o) => lc.setLocalDescription(o))
    //   .then((a) => console.log('offer set successfully!'));
  };


  useEffect(async () => {
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
    console.log("can we decide whatnow",rtcData,rtcData != null && Object.entries(rtcData).length === 0)
    const JWT_TOKEN = localStorage.getItem('token');
    const token = `Bearer ${JWT_TOKEN}`;
    // if (rtcData != null && Object.entries(rtcData).length === 0) {
    //   console.log("don't tell we are giong through this?")
    //   initializeWebRTC(token);
    // } else if (rtcData != null && Object.entries(rtcData).length > 0) {
    //   console.log(("arewehereyet"))
    //   respondeWebRTC(token);
    // }

    fetchRequestStatus();
    const data = await fetchRTCUserInfo()
    if (data == null){
      initializeWebRTC()
    }
    myRef.current.value = 'New Value';
    console.log("myRef's updated value:", myRef.current);

  }, [with_email,rtcData]);

  console.log("myRef",myRef.current)

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
