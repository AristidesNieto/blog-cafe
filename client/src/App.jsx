import './App.css'
import { Routes, Route } from 'react-router'
import { Link } from 'react-router'
import Home from './Home.jsx'
import Blog from './Blog.jsx'
import Contact from './Contact.jsx'
import Post from './components/post.jsx'
import Autor from './components/autor.jsx'
import NewPost from './components/NewPost.jsx'
import Login from './components/Login.jsx'
function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/blog" className="nav-link">Blog</Link>
        <Link to="/contacto" className="nav-link">Contacto</Link>
        <Link to="/nuevo-post" className="nav-link">Crear Post</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id_post" element={<Post />} />
        <Route path="/autor/:id_author" element={<Autor />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/nuevo-post/" element={<NewPost />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App

