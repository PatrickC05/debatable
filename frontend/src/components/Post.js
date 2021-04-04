import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Post() {
  let {id} = useParams();
  return (
    <div>
      <h1>{id}</h1>
      <br></br>
      <p></p>
    </div>
  )
}
