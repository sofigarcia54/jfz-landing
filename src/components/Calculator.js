import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {

  // ==========================================
  // ESTADOS
  // ==========================================

  // Decaimiento
  const [decay, setDecay] = useState({
    N0: 1000,
    T: 8,
    t: 5,
    unidad: "d",
    resultado: null,
  });

  // Tiempo de decaimiento
  const [decayTime, setDecayTime] = useState({
    N0: 1000,
    N: 500,
    T: 8,
    resultado: null,
  });

  // Retirada de sólidos
  const [retirada, setRetirada] = useState({
    N0: 500,
    m: 100,
    T: 8,
    DL: 0.1,
    resultado: null,
  });

  // ==========================================
  // CONSTANTES
  // ==========================================

  const CONSTANTE = 0.693;

  // ==========================================
  // FUNCIONES
  // ==========================================

  // Decaimiento
  const calcularDecaimiento = () => {
    let { N0, T, t, unidad } = decay;

    if (unidad === "h") t = t / 24;
    else if (unidad === "m") t = t / (24 * 60);
    else if (unidad === "y") t = t * 365;

    const N = N0 * Math.exp(-(CONSTANTE * t) / T);

    setDecay({
      ...decay,
      resultado: N.toFixed(4),
    });
  };

  // Tiempo de decaimiento
  const calcularTiempoDecaimiento = () => {
    const { N0, N, T } = decayTime;

    if (N <= 0 || N0 <= 0) {
      alert("Los valores deben ser mayores que cero.");
      return;
    }

    const t = -(T / CONSTANTE) * Math.log(N / N0);

    setDecayTime({
      ...decayTime,
      resultado: t.toFixed(2),
    });
  };

  // Retirada de sólidos
  const calcularRetirada = () => {
    const { N0, m, T, DL } = retirada;

    if (N0 <= 0 || m <= 0 || DL <= 0) {
      alert("Todos los valores deben ser mayores que cero.");
      return;
    }

    const relacion = DL / (N0 / m);

    if (relacion <= 0) {
      alert("La relación debe ser mayor que cero.");
      return;
    }

    const t = -(T / CONSTANTE) * Math.log(relacion);

    setRetirada({
      ...retirada,
      resultado: t.toFixed(2),
    });
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section className="calculator-section" id="calculadora">

      <div className="container">

        <div className="calculator-grid">

          {/* ======================================
              DECAIMIENTO
          ====================================== */}

          <div className="calculator-card">

            <h4>Decaimiento</h4>

            <p className="formula">
              N = N₀ · e<sup>-(0.693·t / T₁/₂)</sup>
            </p>

            <div className="input-group">
              <label>Actividad inicial (N₀)</label>

              <input
                type="number"
                value={decay.N0}
                onChange={(e) =>
                  setDecay({
                    ...decay,
                    N0: parseFloat(e.target.value) || 0,
                  })
                }
              />

              <span className="unit">kBq</span>
            </div>

            <div className="input-group">
              <label>Período (T₁/₂)</label>

              <input
                type="number"
                value={decay.T}
                onChange={(e) =>
                  setDecay({
                    ...decay,
                    T: parseFloat(e.target.value) || 0,
                  })
                }
              />

              <span className="unit">días</span>
            </div>

            <div className="input-group">

              <label>Tiempo (t)</label>

              <input
                type="number"
                value={decay.t}
                onChange={(e) =>
                  setDecay({
                    ...decay,
                    t: parseFloat(e.target.value) || 0,
                  })
                }
              />

              <select
                value={decay.unidad}
                onChange={(e) =>
                  setDecay({
                    ...decay,
                    unidad: e.target.value,
                  })
                }
              >
                <option value="m">min</option>
                <option value="h">horas</option>
                <option value="d">días</option>
                <option value="y">años</option>
              </select>

              <button className="btn-calc" onClick={calcularDecaimiento}>
                Calcular
              </button>

            </div>

            <div className="result-group">

              <label>Actividad final</label>

              <input
                readOnly
                value={decay.resultado || ""}
                placeholder="Resultado"
              />

              <span className="unit">kBq</span>

            </div>

          </div>

          {/* ======================================
              TIEMPO DE DECAIMIENTO
          ====================================== */}

          <div className="calculator-card">

            <h4>Tiempo de decaimiento</h4>

            <p className="formula">
              t = -(T₁/₂ / 0.693) · ln(N / N₀)
            </p>

            <div className="input-group">
              <label>Actividad inicial</label>

              <input
                type="number"
                value={decayTime.N0}
                onChange={(e) =>
                  setDecayTime({
                    ...decayTime,
                    N0: parseFloat(e.target.value) || 0,
                  })
                }
              />

              <span className="unit">kBq</span>

            </div>

            <div className="input-group">

              <label>Actividad final</label>

              <input
                type="number"
                value={decayTime.N}
                onChange={(e) =>
                  setDecayTime({
                    ...decayTime,
                    N: parseFloat(e.target.value) || 0,
                  })
                }
              />

              <span className="unit">kBq</span>

            </div>

            <div className="input-group">

              <label>Período</label>

              <input
                type="number"
                value={decayTime.T}
                onChange={(e) =>
                  setDecayTime({
                    ...decayTime,
                    T: parseFloat(e.target.value) || 0,
                  })
                }
              />

              <span className="unit">días</span>

            </div>

            <button
              className="btn-calc btn-block"
              onClick={calcularTiempoDecaimiento}
            >
              Calcular tiempo
            </button>

            <div className="result-group">

              <label>Tiempo</label>

              <input
                readOnly
                value={decayTime.resultado || ""}
                placeholder="Resultado"
              />

              <span className="unit">días</span>

            </div>

          </div>

          {/* ======================================
              RETIRADA DE SÓLIDOS
          ====================================== */}

          <div className="calculator-card">

            <h4>Retirada de sólidos</h4>

            <p className="formula">
              t = -(T₁/₂ / 0.693) · ln(DL / (N₀/m))
            </p>

            <div className="input-group">

              <label>Actividad inicial</label>

              <input
                type="number"
                value={retirada.N0}
                onChange={(e) =>
                  setRetirada({
                    ...retirada,
                    N0: parseFloat(e.target.value) || 0,
                  })
                }
              />

              <span className="unit">kBq</span>

            </div>

            <div className="input-group">

              <label>Masa</label>

              <input
                type="number"
                value={retirada.m}
                onChange={(e) =>
                  setRetirada({
                    ...retirada,
                    m: parseFloat(e.target.value) || 0,
                  })
                }
              />

              <span className="unit">kg</span>

            </div>

            <div className="input-group">

              <label>Período</label>

              <input
                type="number"
                value={retirada.T}
                onChange={(e) =>
                  setRetirada({
                    ...retirada,
                    T: parseFloat(e.target.value) || 0,
                  })
                }
              />

              <span className="unit">días</span>

            </div>

            <div className="input-group">

              <label>Límite (DL)</label>

              <input
                type="number"
                value={retirada.DL}
                onChange={(e) =>
                  setRetirada({
                    ...retirada,
                    DL: parseFloat(e.target.value) || 0,
                  })
                }
              />

              <span className="unit">kBq/kg</span>

            </div>

            <button
              className="btn-calc btn-block"
              onClick={calcularRetirada}
            >
              Calcular tiempo
            </button>

            <div className="result-group">

              <label>Tiempo</label>

              <input
                readOnly
                value={retirada.resultado || ""}
                placeholder="Resultado"
              />

              <span className="unit">días</span>

            </div>

            <div className="formula-note">
              ⚠ Nivel de radiación superficial menor a 0.25 mR/h (2.5 µSv/h)
            </div>

          </div>

        </div>

        <div className="calculator-note">

          <h3>Sobre esta herramienta</h3>

          <p>
            Esta calculadora fue desarrollada como apoyo al proyecto
            <strong> Automatización del Batch Record de Radiofármacos</strong>.
            Su objetivo es facilitar cálculos de decaimiento radiactivo y
            tiempos de retirada mediante modelos físicos basados en la vida
            media de radionúclidos.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Calculator;