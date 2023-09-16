import React from 'react'

export default function PeopleScreen({profiles,SetWithEMail,with_email}) {
  //here will make the call for user online status
  return (
    <ul>
        {profiles.map((profile) => (
          <li key={profile.id} onClick={()=>SetWithEMail(profile.user_email)}>
          {with_email==profile.user_email?<strong>{profile.user_email} - {profile.online?"ONLINE":"OFFLINE"}</strong>:<div>{profile.user_email}</div> }
          </li>
        ))}
      </ul>
  )
}
