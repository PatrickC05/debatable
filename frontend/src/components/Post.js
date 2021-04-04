import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "./UserContext";
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { useParams } from 'react-router-dom';


export default function Post() {
  let {id} = useParams();
  const [content, setContent] = useState('');
  const [vote, setVote] = useState({"Agree":0, "Disagree":0})
  const [myVote, setMyVote] = useState(0)
  const {user, setUser} = useContext(UserContext);

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

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/vote/'+id, {
      "method": "PUT",
      "headers": {
        'Content-Type': 'application/json',
        'Authorization': 'Token '+user['token']
      },
      "body": JSON.stringify({'vote': myVote})
    })
    .then(res=>res.json())
    .then(res=>setVote(res))
  }, [myVote])

  function handleClick(e) {
    let txt = e.target.textContent
    if (txt == 'Agree') {
      setMyVote(1)
    }
    else {
      setMyVote(-1)
    }
  }

  return (
    <div className='post'>
      <h1 className='title'>{content["title"]}</h1>
      <br></br>
      <p>{content["body"]}</p>
      <p><button className="agree" onClick={handleClick}>Agree</button>{vote["Agree"]}</p>
      <p><button className="disagree" onClick={handleClick}>Disagree</button>{vote["Disagree"]}</p>
    </div>
  )
}
