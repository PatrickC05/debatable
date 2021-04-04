import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "./UserContext";

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [submitting, setSubmitting] = useState(false);
  const {user, setUser} = useContext(UserContext);

  useEffect(()=>{
    if(submitting){
      fetch('http://127.0.0.1:8000/api/auth/register', {
        "method": "POST",
        "headers": {
          'Content-Type': 'application/json'
        },
        "body": JSON.stringify({
          "username": username,
          "email": email,
          "password": password
        })
      })
      .then(res => res.json())
      .then(res=>{
        console.log(res)
        setUser(res);
        setSubmitting(false);
      })
    }
  }, [submitting])
  
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} value={username}/>
      <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
      <label>I am 13 or older.</label>
      <input type="checkbox" onChange={(e)=>setAge(e.target.value)} value={age}/>
      <input type="submit" value="Submit" disabled={submitting}/>
    </form>
  )
}
