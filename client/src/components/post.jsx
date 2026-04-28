import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'

export default function Post() {
  const { id_post } = useParams()
  const [post, setPost] = useState({})

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/posts/' + id_post)
      .then(response => response.json())
      .then(data => setPost(data))
  }, [id_post])

  return (
    <div className='post'>
      <h1>{post.title}</h1>
      <img src={post.img} alt={post.title}></img>
      <p>Fecha: {post.date}</p>
      <p>Autor: <Link to={"/autor/" + post.id_author}>{post.author_name} {post.author_lastname}</Link></p>
      <p>{post.des}</p>
    </div>
  )
}
