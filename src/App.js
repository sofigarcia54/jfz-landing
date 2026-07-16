import React from 'react';
import './index.css';
import ProjectHero from './components/ProjectHero';
import Calculator from './components/Calculator';
import './components/Calculator.css';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import logo from "./assets/logo-jfz.png";

function App() {
  const particlesInit = async (engine) => {
  await loadSlim(engine);
};
  return (
    <div className="App">
<Particles
  id="tsparticles"
  init={particlesInit}
  options={{
    fullScreen: {
      enable: true,
      zIndex: -10,
    },
    particles: {
      number: {
        value: 50,
      },
      color: {
        value: "#16e9b4",
      },
      size: {
        value: 3,
      },
      move: {
        enable: true,
        speed: 2,
      },
    },
  }}
/>
      {/* HEADER */}
      <header className="header">
        <div className="container">
          <div className="nav-container">
         <div className="logo">
    <img src={logo} alt="Juan Felipe Zambrano" className="logo-img" />

    <div className="logo-text">
        <h1>
            Juan Felipe <span className="logo-z">Z</span>ambrano
        </h1>

        <span className="tagline">
            MEDICINE & TECHNOLOGY
        </span>
    </div>
</div>
            <nav className="nav-menu">
              <ul>
                <li><a href="#calculadora">Calculadora</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* HERO - TÍTULO Y DESCRIPCIÓN */}
      <ProjectHero />

      {/* CALCULADORA */}
      <Calculator />

    </div>
  );
}

export default App;