import React, { useState } from 'react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
    <form>
      <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} value={username}/>
      <input type="text" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
      <input type="submit" value="Submit"/>
    </form>
  )
}
