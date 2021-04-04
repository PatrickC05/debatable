import React, { useState, useEffect } from 'react'

export default function Index() {
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/posts')
        .then(res => res.json())
        .then(res => setPosts(res))
    }, [])

    return (
        <div>
            {posts && posts.map((post) => {
                return (
                    <div className="post">
                        <h1>{post['title']}</h1>
                        <p>{post['body'].substring(0,120)}</p>
                    </div>
                )
            })}
        </div>
    )
}