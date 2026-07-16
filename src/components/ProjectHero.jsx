function ProjectHero() {
  return (
   <section className="project-hero">

      <div className="hero-overlay">

        <p className="hero-frase">
          Tecnología aplicada a la radiofarmacia
        </p>

        <h1>
          Calculadora de
          <span> Actividad Radiactiva</span>
        </h1>

        <p className="hero-text">
          Herramienta diseñada para realizar cálculos de decaimiento
          radiactivo, tiempo de desintegración y retirada de materiales
          radiactivos utilizados en procesos de radiofarmacia.
        </p>

        <a href="#calculadora" className="hero-btn">
          Ir a la calculadora
        </a>

      </div>

    </section>
  );
}

export default ProjectHero;