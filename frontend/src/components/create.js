import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "./UserContext";
import { Redirect } from 'react-router-dom'

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
          "body": content
        })
      })
      .then(res => res.json())
      .then(res=>{
        setPost(res['id']);
        <Redirect to={'/post/'+res['id']}></Redirect>
      })
    }
  }, [submitting])

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true)
  }

  return (
    <div className="post">
      {post ? <Redirect to={'/post/'+post}></Redirect> :
      <form onSubmit={handleSubmit}>
        <input autofocus="autofocus" className="titlebox" type="text" min="5" max="60" placeholder="Enter your title" onChange={(e)=>setTitle(e.target.value)} value={title}/>
        <textarea className = "contentbox" min="300" max="10000" placeholder="Your opinion..."onChange={(e)=>setContent(e.target.value)} value={content}></textarea>
        <input className="submitbutton" type="submit" value="Submit"/>
      </form>
      }
    </div>
  )
}
