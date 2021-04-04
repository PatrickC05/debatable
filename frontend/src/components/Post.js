import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

export default function Post() {
  let {id} = useParams();
  const [content, setContent] = useState('');
  const [vote, setVote] = useState({"Agree":0, "Disagree":0})

  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/post/'+id, {
    })
    .then(res => res.json())
      .then(res=>{
      setContent(res[0]);
    });
  }, [])

  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/vote/'+id)
    .then(res => res.json())
    .then(res=>setVote(res))
  }, [])

  return (
    <div class='post'>
      <h1 className='title'>{content["title"]}</h1>
      <br></br>
      <p>{content["body"]}</p>
      <p>{vote["Agree"]}</p>
      <p>{vote["Disagree"]}</p>
    </div>
  )
}
