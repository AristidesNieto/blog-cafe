import cafeImg from './assets/cafe.jpg'

function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenido al Blog de Café</h1>
      <p className="home-subtitle">
        Descubre el mundo del café: desde un intenso espresso hasta un refrescante cold brew.
      </p>
      <div>
        <img src={cafeImg} alt="Café" className="home-img" />
      </div>
    </div>
  )
}

export default Home
