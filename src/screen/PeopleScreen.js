import React from 'react'

export default function PeopleScreen({profiles,SetWithEmail,SetWithUserId,with_userid}) {
  //here will make the call for user online status
  console.log("profileswhatisit?",profiles)
  return (
    <ul>
        {profiles.map((profile) => (
          <li key={profile.id} 
          onClick={()=>{
            SetWithUserId(profile.user_id)
            SetWithEmail(profile.user_email)
          }}
          >
            {profile.user_email} - {profile.online?"ONLINE":"OFFLINE"}
          {/* {with_email==profile.user_email?<strong>{profile.user_email} - {profile.online?"ONLINE":"OFFLINE"}</strong>:<div>{profile.user_email}</div> } */}
          </li>
        ))}
      </ul>
  )
}
