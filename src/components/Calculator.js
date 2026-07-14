import React, { useState } from 'react';

function Calculator() {
  // Estado para el cálculo de decaimiento
  const [decay, setDecay] = useState({
    N0: 1000,
    T: 8,
    t: 5,
    resultado: null
  });

  // Estado para el cálculo de retirada
  const [retirada, setRetirada] = useState({
    N0: 500,
    m: 100,
    T: 8,
    DL: 0.1,
    resultado: null
  });

  // Constante de decaimiento
  const CONSTANTE = 0.693;

  // Calcular decaimiento
  const calcularDecaimiento = () => {
    const { N0, T, t } = decay;
    const N = N0 * Math.exp(-(CONSTANTE * t) / T);
    setDecay({ ...decay, resultado: N.toFixed(4) });
  };

  // Calcular retirada
  const calcularRetirada = () => {
    const { N0, m, T, DL } = retirada;
    const N0_m = N0 / m;
    const relacion = DL / N0_m;
    const t = -(T / CONSTANTE) * Math.log(relacion);
    setRetirada({ ...retirada, resultado: t.toFixed(2) });
  };

  return (
    <section className="calculator-section" id="calculadora">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">⚛️ Herramienta profesional</span>
          <h3>Calculadora de <span>Actividad Radiactiva</span></h3>
          <p>Herramienta para cálculos de decaimiento radiactivo y retirada de sólidos.</p>
        </div>

        <div className="calculator-grid">
          {/* Decaimiento */}
          <div className="calculator-card">
            <h4>Decaimiento</h4>
            <p className="formula">N = N₀ · e<sup>-(0.693·t / T₁/₂)</sup></p>

            <div className="input-group">
              <label>Actividad inicial (N₀)</label>
              <input
                type="number"
                value={decay.N0}
                onChange={(e) => setDecay({ ...decay, N0: parseFloat(e.target.value) || 0 })}
                step="any"
              />
              <span className="unit">kBq</span>
            </div>

            <div className="input-group">
              <label>Período (T₁/₂)</label>
              <input
                type="number"
                value={decay.T}
                onChange={(e) => setDecay({ ...decay, T: parseFloat(e.target.value) || 0 })}
                step="any"
              />
              <span className="unit">días</span>
            </div>

            <div className="input-group">
              <label>Tiempo (t)</label>
              <input
                type="number"
                value={decay.t}
                onChange={(e) => setDecay({ ...decay, t: parseFloat(e.target.value) || 0 })}
                step="any"
              />
              <span className="unit">días</span>
              <button className="btn-calc" onClick={calcularDecaimiento}>Calcular</button>
            </div>

            <div className="result-group">
              <label>Actividad final (N)</label>
              <input type="text" value={decay.resultado || ''} readOnly placeholder="Resultado" />
              <span className="unit">kBq</span>
            </div>
          </div>

          {/* Retirada */}
          <div className="calculator-card">
            <h4>Retirada de sólidos</h4>
            <p className="formula">t = -(T₁/₂/0.693) · ln( DL · SQ / (N₀/m) )</p>

            <div className="input-group">
              <label>Actividad inicial (N₀)</label>
              <input
                type="number"
                value={retirada.N0}
                onChange={(e) => setRetirada({ ...retirada, N0: parseFloat(e.target.value) || 0 })}
                step="any"
              />
              <span className="unit">kBq</span>
            </div>

            <div className="input-group">
              <label>Masa (m)</label>
              <input
                type="number"
                value={retirada.m}
                onChange={(e) => setRetirada({ ...retirada, m: parseFloat(e.target.value) || 0 })}
                step="any"
              />
              <span className="unit">kg</span>
            </div>

            <div className="input-group">
              <label>Período (T₁/₂)</label>
              <input
                type="number"
                value={retirada.T}
                onChange={(e) => setRetirada({ ...retirada, T: parseFloat(e.target.value) || 0 })}
                step="any"
              />
              <span className="unit">días</span>
            </div>

            <div className="input-group">
              <label>Límite retirada</label>
              <input
                type="number"
                value={retirada.DL}
                onChange={(e) => setRetirada({ ...retirada, DL: parseFloat(e.target.value) || 0 })}
                step="any"
              />
              <span className="unit">kBq/kg</span>
              <button className="btn-calc" onClick={calcularRetirada}>Calcular</button>
            </div>

            <div className="result-group">
              <label>Tiempo (t)</label>
              <input type="text" value={retirada.resultado || ''} readOnly placeholder="Resultado" />
              <span className="unit">días</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calculator;