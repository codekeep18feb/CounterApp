import React from 'react'
import RequestScreen from "./RequestScreen"

export default function ChatScreen({with_email}) {
  const chats = [
    {
      id:1,
      content:"HI",
      who:"ME"
    },
    {
      id:2,
      content:"Hello",
      who:"ME"
    },
    {
      id:3,
      content:"how are you!",
      who:"OTHER"
    },
    {
      id:4,
      content:"good",
      who:"ME"
    }
  ]

  
  return (
    <div style={{border:"1px solid red",height:"600px",width:"700px",background: "rgb(221, 237, 240,0.2)"}}>
        {/* {
          chats.map(i=>{
            return(
              <div key={i} style={{padding:"10px",color:i.who=="ME"?"green":"grey",textAlign:i.who=="ME"?"left":"right",fontStyle:"italic",fontSize:"19px"}}>
              {i.content}
            </div>
            )
          })
        } */}
    {with_email?<RequestScreen with_email={with_email}/>:<div>loading...</div>}
    </div>
  )
}
