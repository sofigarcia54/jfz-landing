import React from 'react';
import './index.css';
import ProjectHero from "./components/ProjectHero";
import Calculator from './components/Calculator';

function App() {
  return (
    <div>

      {/* HEADER */}
      <header className="header">

        <ProjectHero />
        <Calculator />
        
        <div className="container">
          <div className="nav-container">

            <div className="logo">
              <h1>Juan Felipe <span>Zambrano</span></h1>
              <span className="tagline">medicine & technology</span>
            </div>

            <nav className="nav-menu">
  <ul>
    <li><a href="#calculadora">Calculadora</a></li>
    <li><a href="#informacion">Información</a></li>
  </ul>
</nav>

          </div>
        </div>
      </header>

      {/* CALCULADORA */}
      <Calculator />

    </div>
  );
}

export default App;