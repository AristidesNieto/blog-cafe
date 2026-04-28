function Contact() {
  return (
    <div className="contact-container">
      <h1> Contacto</h1>
      <p className="contact-subtitle">
        ¿Tienes alguna duda o sugerencia? ¡Nos encantaría saber de ti!
      </p>
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" placeholder="Tu nombre" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" placeholder="tu@correo.com" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" rows="5" placeholder="Escribe tu mensaje aquí..."></textarea>
        </div>
        <button type="submit" className="contact-btn">Enviar mensaje</button>
      </form>
    </div>
  )
}

export default Contact
