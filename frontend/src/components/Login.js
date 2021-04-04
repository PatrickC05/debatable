import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from "./UserContext";
import { Redirect } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const {user, setUser} = useContext(UserContext);

  useEffect(()=>{
    if(submitting){
      fetch('http://127.0.0.1:8000/api/auth/login', {
        "method": "POST",
        "headers": {
          'Content-Type': 'application/json'
        },
        "body": JSON.stringify({
          "username": username,
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
    <div>
      {user ? <Redirect to='/'> </Redirect> : 
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} value={username}/>
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} type="password" />
          <input type="submit" value="Submit" disabled={submitting}/>
        </form>}
    </div>
  )
}
