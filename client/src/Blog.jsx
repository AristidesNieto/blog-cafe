import { CardList } from './components/Cards.jsx'
import { useState, useEffect } from 'react'

function Blog() {
  const [entries, setEntries] = useState([])
  const [filteredText, setFilteresText] = useState('')

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/posts')
      .then(res => res.json())
      .then(data => setEntries(data))
      .catch(err => console.error(err))
  }, [])

  function handleChange(e) {
    setFilteresText(e.target.value)
  }
  return (
    <>
      <h1>Blog de cafe</h1>
      <div className='filter'>
        <p>Buscar:</p>
        <input type='text' value={filteredText} onChange={handleChange}></input>
      </div>
      <CardList entries={entries} filteredText={filteredText}></CardList>
    </>
  )
}

export default Blog

