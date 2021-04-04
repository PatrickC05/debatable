import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

export default function Post() {
  let {id} = useParams();
  //let id = 'd2mdqh1aai_k'
  const [content, setContent] = useState('');

  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/post/'+id, {
    })
    .then(res => res.json())
      .then(res=>{
      setContent(res[0]);
    })
  }, [])

  return (
    <div>
      <h1>{content["title"]}</h1>
      <br></br>
      <p>{content["body"]}</p>
    </div>
  )
}
