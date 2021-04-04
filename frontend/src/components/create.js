import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "./UserContext";

export default function Create() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState(null)
  const {user, setUser} = useContext(UserContext);
  useEffect(()=>{
    if(submitting){
      fetch('http://127.0.0.1:8000/api/create', {
        "method": "POST",
        "headers": {
          'Content-Type': 'application/json',
          'Authorization': 'Token '+user['token']
        },
        "body": JSON.stringify({
          "title": title,
          "content": content
        })
      })
      .then(res => res.json())
      .then(res=>{
        setPost(res)
        console.log(post)
      })
    }
  }, [submitting])
  
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true)
  }

  return (
    <form>
      <input type="text" min="5" max="60" placeholder="Enter your title" onChange={(e)=>setTitle(e.target.value)} value={title}/>
      <textarea min="300" max="10000" placeholder="What is your opinion?"onChange={(e)=>setContent(e.target.value)} value={content}></textarea>
      <input type="submit" value="Submit"/>
    </form>
  )
}
