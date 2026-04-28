import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function Autor() {
  const { id_author } = useParams()
  const [author, setAuthor] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/authors/' + id_author, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => {
        if (res.status == 401) {
          navigate('/login')
        }
        return res.json()
      })
      .then(data => setAuthor(data))
      .catch(error => console.log(error))
  }, [id_author, navigate])

  return (
    <div className='author'>
      <h1>{author.name} {author.lastname}</h1>
      <p>Fecha de nacimiento: {author.date_of_birth}</p>
      <p>Email: {author.email}</p>
      <p>Teléfono: {author.phone_number}</p>
    </div>
  )
}