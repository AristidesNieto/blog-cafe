require('dotenv').config()

const express = require('express')
const cors = require('cors')
const pgp = require('pg-promise')()
const multer = require('multer')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

const app = express()
const PORT = 8000

// Conexión a la base de datos PostgreSQL (debe ir antes de session)
const db = pgp({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
})

// CORS
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))

// SESSION (después de db)
app.use(session({
  store: new pgSession({
    pgPromise: db
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10 * 60 * 1000, secure: false }
}))

// Función de autenticación
const authenticateSession = (req, res, next) => {
  if (req.session.id_author) {
    next()
  } else {
    res.sendStatus(401)
  }
}

// Multer
const storage = multer.diskStorage({
  destination: '../client/src/assets/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

// GET todos los posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await db.any('SELECT id_post AS id, title, text AS des, image AS img FROM post')
    res.json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener los posts' })
  }
})

// GET un post por id
app.get('/posts/:id_post', async (req, res) => {
  try {
    const post = await db.one('SELECT p.id_post AS id, p.title, p.text AS des, p.image AS img, p.date, p.id_author, a.name AS author_name, a.lastname AS author_lastname FROM post p JOIN author a ON p.id_author = a.id_author WHERE p.id_post = $1', [req.params.id_post])
    res.json(post)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener el post' })
  }
})

// GET autor por id (protegido)
app.get('/authors/:id_author', authenticateSession, async (req, res) => {
  try {
    const author = await db.one('SELECT id_author, name, lastname, date_of_birth, email, phone_number FROM author WHERE id_author = $1', [req.params.id_author])
    res.json(author)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener el autor' })
  }
})

// POST nuevo post
app.post('/posts/new', upload.single('img'), function (req, res) {
  db.none(
    "INSERT INTO post (title, date, text, image, id_author) VALUES($1, $2, $3, $4, $5)",
    [req.body.title, req.body.date, req.body.text, './src/assets/uploads/' + req.file.originalname, req.body.id_author]
  )
    .then(() => res.send({ message: 'Post agregado correctamente' }))
    .catch((error) => console.log('ERROR:', error))
})

// POST login
app.post('/login', upload.none(), (req, res, next) => {
  const { username, password } = req.body
  db.oneOrNone('SELECT * FROM author WHERE username=$1', [username])
    .then((data) => {
      if (data != null) {
        if (data.password == password) {
          req.session.id_author = data.id_author
          req.session.save(function (err) {
            if (err) return next(err)
          })
          res.send(req.session)
        } else {
          res.status(401).send('Invalid email/password')
        }
      } else {
        res.status(401).send('Invalid credentials')
      }
    })
    .catch((error) => console.log('ERROR: ', error))
})

// GET session info
app.get('/session-info', (req, res) => {
  res.json(req.session)
})

// GET logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Failed to destroy session')
    res.send('Session destroyed')
  })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})