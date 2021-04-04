import React, { useState } from 'react'

export default function Create() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  return (
    <form>
      <input type="text" min="5" max="60" placeholder="Enter your title" onChange={(e)=>setTitle(e.target.value)} value={title}/>
      <textarea min="300" max="10000" placeholder="What is your opinion?"onChange={(e)=>setContent(e.target.value)} value={content}></textarea>
      <input type="submit" value="Submit"/>
    </form>
  )
}
