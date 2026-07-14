import React from 'react';
import './index.css';

import Calculator from './components/Calculator';

function App() {
  return (
    <div>
      {/* HEADER */}
      <header className="header">
        <div className="container">
          <div className="nav-container">
            <div className="logo">
              <h1>Juan Felipe <span>Zambrano</span></h1>
              <span className="tagline">medicine & technology</span>
            </div>
            <nav className="nav-menu">
              <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#somos">Somos</a></li>
                <li><a href="#contacto">Contacto</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="inicio">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-badge">Innovación en salud</span>
              <h2>Medicina y <br /><span>Tecnología</span></h2>
              <p>Integramos el conocimiento médico con la tecnología de vanguardia para ofrecer soluciones que transforman la atención en salud.</p>
              <div className="hero-buttons">
                <a href="#contacto" className="btn-primary">Contáctanos</a>
                <a href="#contacto" className="btn-secondary">Conoce más</a>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-placeholder">
                <div className="circle-decoration"></div>
                <div className="circle-decoration-2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="services" id="servicios">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Servicios</span>
            <h3>Nuestros <span>Servicios</span></h3>
            <p>Soluciones integrales que combinan la excelencia médica con la innovación tecnológica.</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <span className="service-icon">⚕️</span>
              <h4>Consultoría Médica</h4>
              <p>Asesoramiento especializado para instituciones de salud y profesionales.</p>
            </div>
            <div className="service-card">
              <span className="service-icon">💻</span>
              <h4>Tecnología en Salud</h4>
              <p>Implementación de soluciones tecnológicas para optimizar procesos médicos.</p>
            </div>
            <div className="service-card">
              <span className="service-icon">📊</span>
              <h4>Análisis de Datos</h4>
              <p>Inteligencia de datos para la toma de decisiones en el sector salud.</p>
            </div>
            <div className="service-card">
              <span className="service-icon">🧪</span>
              <h4>Investigación</h4>
              <p>Desarrollo de proyectos innovadores en medicina y tecnología.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SOMOS */}
      <section className="about" id="somos">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <div className="about-placeholder">
                <span>AI</span>
              </div>
            </div>
            <div className="about-content">
              <span className="section-tag">Somos</span>
              <h3>Innovación al <span>Servicio de la Salud</span></h3>
              <p>Juan Felipe Zambrano representa la convergencia entre la medicina y la tecnología, ofreciendo soluciones que responden a los desafíos actuales del sector salud.</p>
              <div className="about-stats">
                <div className="stat">
                  <span className="stat-number">+10</span>
                  <span className="stat-label">Años de experiencia</span>
                </div>
                <div className="stat">
                  <span className="stat-number">+50</span>
                  <span className="stat-label">Proyectos realizados</span>
                </div>
                <div className="stat">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Compromiso</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULADORA */}
<Calculator />

      {/* CONTACTO */}
      <section className="contact" id="contacto">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Contacto</span>
            <h3>Hablemos <span>sobre tu proyecto</span></h3>
            <p>Estamos listos para ayudarte a transformar tu idea en realidad.</p>
          </div>
          <div className="contact-grid">
            <form className="contact-form">
              <input type="text" placeholder="Nombre completo" required />
              <input type="email" placeholder="Correo electrónico" required />
              <input type="text" placeholder="Teléfono" />
              <textarea placeholder="Cuéntanos sobre tu proyecto..." rows="5"></textarea>
              <button type="submit" className="btn-primary">Enviar mensaje</button>
            </form>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <h5>Email</h5>
                  <p>contacto@juanfelipe.com</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <div>
                  <h5>Teléfono</h5>
                  <p>+57 300 000 0000</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h5>Ubicación</h5>
                  <p>Colombia</p>
                </div>
              </div>
              <div className="contact-social">
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">GitHub</a>
                <a href="#" className="social-link">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h4>Juan Felipe <span>Zambrano</span></h4>
              <span>medicine & technology</span>
            </div>
            <nav className="footer-nav">
              <a href="#inicio">Inicio</a>
              <a href="#servicios">Servicios</a>
              <a href="#somos">Somos</a>
              <a href="#contacto">Contacto</a>
            </nav>
            <p className="footer-copy">&copy; 2026 Juan Felipe Zambrano. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;