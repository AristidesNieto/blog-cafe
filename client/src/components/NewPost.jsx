import { useState } from 'react'

export default function NewPost() {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [text, setText] = useState('')
    const [img, setImg] = useState(null)
    const [idAuthor, setIdAuthor] = useState('')

    function handleFile(e) {
        const fileInfo = {
            file: e.target.files[0],
            filename: e.target.files[0].name
        }
        setImg(fileInfo)
    }

    function handleSubmit() {
        const formInfo = new FormData()
        formInfo.append('title', title)
        formInfo.append('date', date)
        formInfo.append('text', text)
        formInfo.append('img', img.file, img.filename)
        formInfo.append('id_author', idAuthor)

        fetch(import.meta.env.VITE_API_URL + '/posts/new', {
            method: 'POST',
            body: formInfo,
        })
            .then(res => res.json())
            .then(data => console.log(data.message))
            .catch(error => console.log(error))
    }

    return (
        <div className='form'>
            <h1>Nuevo Post</h1>
            <label>Título:</label>
            <input type='text' value={title} onChange={e => setTitle(e.target.value)} />

            <label>Fecha:</label>
            <input type='date' value={date} onChange={e => setDate(e.target.value)} />

            <label>Imagen:</label>
            <input type='file' onChange={handleFile} />

            <label>Texto:</label>
            <textarea value={text} onChange={e => setText(e.target.value)} />

            <label>ID del autor:</label>
            <input type='number' value={idAuthor} onChange={e => setIdAuthor(e.target.value)} />

            <button onClick={handleSubmit}>Crear Post</button>
        </div>
    )
}