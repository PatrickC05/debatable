import React, { useState } from 'react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  return (
    <form>
      <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} value={username}/>
      <input type="text" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
      <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
      <label>I am 13 or older.</label>
      <input type="checkbox" onChange={(e)=>setAge(e.target.value)} value={age}/>
      <input type="submit" value="Submit"/>
    </form>
  )
}
