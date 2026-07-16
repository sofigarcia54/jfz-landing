import React, { useState, useEffect } from "react";
import "./Calculator.css";

function Calculator() {

  // ==========================================
  // 1. ESTADOS
  // ==========================================

  // --- Decaimiento ---
  const [decay, setDecay] = useState({
    N0: 1000,
    T: 8,
    t: 5,
    unidad: "d",
    resultado: "",
    lambda: "",
    factorDecaimiento: "",
    vidasMedias: "",
  });

  // --- Tiempo de decaimiento ---
  const [decayTime, setDecayTime] = useState({
    N0: 1000,
    N: 500,
    T: 8,
    resultado: "",
    lambda: "",
    factorDecaimiento: "",
    vidasMedias: "",
  });

  // --- Retirada de sólidos ---
  const [retirada, setRetirada] = useState({
    N0: 500,
    m: 100,
    T: 8,
    DL: 0.1,
    resultado: "",
    lambda: "",
    relacion: "",
    actividadPorMasa: "",
  });

  // --- Historial ---
  const [historial, setHistorial] = useState([]);

  // --- Selector de isótopos ---
  const [isotopoSeleccionado, setIsotopoSeleccionado] = useState("");

  // --- Conversor ---
  const [conversionValor, setConversionValor] = useState(1);
  const [conversionDesde, setConversionDesde] = useState("kBq");
  const [conversionHacia, setConversionHacia] = useState("MBq");
  const [conversionResultado, setConversionResultado] = useState("");

  // --- Fecha y hora (Calibración/Medición) ---
  const [fechaCalibracion, setFechaCalibracion] = useState({ fecha: "", hora: "" });
  const [fechaMedicion, setFechaMedicion] = useState({ fecha: "", hora: "" });

  // --- Resta de fechas ---
  const [restaFechas, setRestaFechas] = useState({
    fecha1: "",
    fecha2: "",
    resultado: "",
  });

  // --- Suma/Resta de días ---
  const [sumaDias, setSumaDias] = useState({
    fecha: "",
    dias: 0,
    resultado: "",
  });

  // ==========================================
  // 2. CONSTANTES
  // ==========================================

  const CONSTANTE = 0.693;

  const radioisotopos = [
    { nombre: "Yodo-131", simbolo: "¹³¹I", vidaMedia: 8.02, unidad: "días", emision: "β⁻, γ" },
    { nombre: "Tecnecio-99m", simbolo: "⁹⁹ᵐTc", vidaMedia: 6.01, unidad: "horas", emision: "γ" },
    { nombre: "Molibdeno-99", simbolo: "⁹⁹Mo", vidaMedia: 65.94, unidad: "horas", emision: "β⁻" },
    { nombre: "Germanio-68", simbolo: "⁶⁸Ge", vidaMedia: 270.95, unidad: "días", emision: "EC" },
    { nombre: "Galio-68", simbolo: "⁶⁸Ga", vidaMedia: 67.71, unidad: "minutos", emision: "β⁺" },
    { nombre: "Lutecio-177", simbolo: "¹⁷⁷Lu", vidaMedia: 6.647, unidad: "días", emision: "β⁻, γ" },
    { nombre: "Flúor-18", simbolo: "¹⁸F", vidaMedia: 109.77, unidad: "minutos", emision: "β⁺" },
    { nombre: "Cesio-137", simbolo: "¹³⁷Cs", vidaMedia: 30.17, unidad: "años", emision: "β⁻, γ" },
    { nombre: "Itrio-90", simbolo: "⁹⁰Y", vidaMedia: 64.1, unidad: "horas", emision: "β⁻" },
  ];

  const factoresBq = {
    GBq: 1000000000,
    MBq: 1000000,
    kBq: 1000,
    Bq: 1,
    Ci: 37000000000,
    mCi: 37000000,
    µCi: 37000,
  };

  // ==========================================
  // 3. useEffect
  // ==========================================

  useEffect(() => {
    const historialGuardado = JSON.parse(localStorage.getItem("historialCalculos")) || [];
    setHistorial(historialGuardado);
  }, []);

  // ==========================================
  // 4. FUNCIONES COMPARTIDAS
  // ==========================================

  const copiarResultado = async (texto) => {
    if (!texto) {
      alert("Primero realiza un cálculo.");
      return;
    }
    try {
      await navigator.clipboard.writeText(texto);
      alert("Resultado copiado al portapapeles.");
    } catch (error) {
      alert("No fue posible copiar el resultado.");
    }
  };

  const guardarHistorial = (tipo, resultado) => {
    if (!resultado) return;
    const nuevoRegistro = {
      id: Date.now(),
      tipo: tipo,
      resultado: resultado,
      fecha: new Date().toLocaleString(),
    };
    const historialActualizado = [nuevoRegistro, ...historial];
    setHistorial(historialActualizado);
    localStorage.setItem("historialCalculos", JSON.stringify(historialActualizado));
  };

  const limpiarHistorial = () => {
    if (window.confirm("¿Eliminar todo el historial de cálculos?")) {
      setHistorial([]);
      localStorage.removeItem("historialCalculos");
    }
  };

  // ==========================================
  // 5. FUNCIONES DE CÁLCULO
  // ==========================================

  // --- Calcular decaimiento ---
  const calcularDecaimiento = () => {
    let { N0, T, t, unidad } = decay;
    if (N0 <= 0 || T <= 0 || t < 0) {
      alert("Todos los valores deben ser mayores que cero.");
      return;
    }
    if (unidad === "h") t = t / 24;
    else if (unidad === "m") t = t / (24 * 60);
    else if (unidad === "y") t = t * 365;

    const lambda = CONSTANTE / T;
    const N = N0 * Math.exp(-lambda * t);
    const vidasMedias = t / T;
    const factorDecaimiento = Math.exp(-lambda * t);

    setDecay({
      ...decay,
      resultado: N.toFixed(4),
      lambda: lambda.toFixed(6),
      vidasMedias: vidasMedias.toFixed(2),
      factorDecaimiento: factorDecaimiento.toFixed(4),
    });
    guardarHistorial("Decaimiento", N.toFixed(4));
  };

  // --- Calcular tiempo de decaimiento ---
  const calcularTiempoDecaimiento = () => {
    const { N0, N, T } = decayTime;
    if (N0 <= 0 || N <= 0 || T <= 0) {
      alert("Todos los valores deben ser mayores que cero.");
      return;
    }
    if (N >= N0) {
      alert("La actividad final debe ser menor que la actividad inicial.");
      return;
    }
    const lambda = CONSTANTE / T;
    const t = -(T / CONSTANTE) * Math.log(N / N0);
    const vidasMedias = t / T;
    const factorDecaimiento = Math.exp(-lambda * t);

    setDecayTime({
      ...decayTime,
      resultado: t.toFixed(2),
      lambda: lambda.toFixed(6),
      vidasMedias: vidasMedias.toFixed(2),
      factorDecaimiento: factorDecaimiento.toFixed(4),
    });
    guardarHistorial("Tiempo de decaimiento", t.toFixed(2));
  };

  // --- Calcular retirada de sólidos ---
  const calcularRetirada = () => {
    const { N0, m, T, DL } = retirada;
    if (N0 <= 0 || m <= 0 || T <= 0 || DL <= 0) {
      alert("Todos los valores deben ser mayores que cero.");
      return;
    }
    const actividadPorMasa = N0 / m;
    const relacion = DL / actividadPorMasa;
    if (relacion <= 0 || relacion >= 1) {
      alert("Los datos ingresados no permiten calcular un tiempo de retirada válido.");
      return;
    }
    const lambda = CONSTANTE / T;
    const t = -(T / CONSTANTE) * Math.log(relacion);

    setRetirada({
      ...retirada,
      resultado: t.toFixed(2),
      lambda: lambda.toFixed(6),
      relacion: relacion.toFixed(6),
      actividadPorMasa: actividadPorMasa.toFixed(2),
    });
    guardarHistorial("Retirada de sólidos", t.toFixed(2));
  };

  // --- Convertir unidades ---
  const convertirUnidad = () => {
    const enBq = conversionValor * factoresBq[conversionDesde];
    const resultado = enBq / factoresBq[conversionHacia];
    setConversionResultado(resultado.toFixed(6));
  };

  // --- Calcular por fecha (Calibración/Medición) ---
  const calcularPorFecha = () => {
    if (!fechaCalibracion.fecha || !fechaMedicion.fecha) {
      alert("Selecciona ambas fechas y horas.");
      return;
    }
    const calibracion = new Date(`${fechaCalibracion.fecha}T${fechaCalibracion.hora}`);
    const medicion = new Date(`${fechaMedicion.fecha}T${fechaMedicion.hora}`);
    if (isNaN(calibracion) || isNaN(medicion)) {
      alert("Las fechas o horas no son válidas.");
      return;
    }
    const diffMs = medicion - calibracion;
    if (diffMs <= 0) {
      alert("La fecha de medición debe ser posterior a la de calibración.");
      return;
    }
    const t = diffMs / (1000 * 60 * 60 * 24);
    setDecay({ ...decay, t: t });
    alert(`Tiempo calculado: ${t.toFixed(2)} días. Ahora puedes hacer clic en "Calcular".`);
  };

  // --- Resta de fechas ---
  const calcularRestaFechas = () => {
    if (!restaFechas.fecha1 || !restaFechas.fecha2) {
      alert("Selecciona ambas fechas.");
      return;
    }
    const f1 = new Date(restaFechas.fecha1);
    const f2 = new Date(restaFechas.fecha2);
    const diffMs = Math.abs(f2 - f1);
    const diffDias = diffMs / (1000 * 60 * 60 * 24);
    setRestaFechas({ ...restaFechas, resultado: diffDias.toFixed(0) });
  };

  // --- Suma/Resta de días ---
  const calcularSumaDias = () => {
    if (!sumaDias.fecha) {
      alert("Selecciona una fecha.");
      return;
    }
    const fecha = new Date(sumaDias.fecha);
    fecha.setDate(fecha.getDate() + parseInt(sumaDias.dias));
    setSumaDias({ ...sumaDias, resultado: fecha.toLocaleDateString() });
  };

  // --- Cargar isótopo ---
  const cargarIsotopo = (nombre) => {
    const isotopo = radioisotopos.find((i) => i.nombre === nombre);
    if (isotopo) {
      let T = isotopo.vidaMedia;
      if (isotopo.unidad === "horas") T = T / 24;
      else if (isotopo.unidad === "minutos") T = T / (24 * 60);
      else if (isotopo.unidad === "años") T = T * 365;
      setDecay({ ...decay, T: T });
      setDecayTime({ ...decayTime, T: T });
      setRetirada({ ...retirada, T: T });
      setIsotopoSeleccionado(nombre);
    }
  };

  // --- Limpiar todo ---
  const limpiarTodo = () => {
    setDecay({ ...decay, resultado: "", lambda: "", factorDecaimiento: "", vidasMedias: "" });
    setDecayTime({ ...decayTime, resultado: "", lambda: "", factorDecaimiento: "", vidasMedias: "" });
    setRetirada({ ...retirada, resultado: "", lambda: "", relacion: "", actividadPorMasa: "" });
    setConversionResultado("");
    setFechaCalibracion({ fecha: "", hora: "" });
    setFechaMedicion({ fecha: "", hora: "" });
    setRestaFechas({ fecha1: "", fecha2: "", resultado: "" });
    setSumaDias({ fecha: "", dias: 0, resultado: "" });
    setIsotopoSeleccionado("");
  };

  // ==========================================
  // 6. RENDER
  // ==========================================

return (
  <section className="calculator-section" id="calculadora">
    <div className="container">

      {/* SELECTOR DE ISÓTOPOS */}
      <div className="isotope-selector-global">
        <div className="input-group">
          <label>Cargar isótopo predefinido</label>
          <select
            value={isotopoSeleccionado}
            onChange={(e) => cargarIsotopo(e.target.value)}
          >
            <option value="">-- Seleccionar --</option>
            {radioisotopos.map((iso) => (
              <option key={iso.nombre} value={iso.nombre}>
                {iso.nombre} ({iso.simbolo}) - {iso.vidaMedia} {iso.unidad}
              </option>
            ))}
          </select>
          <button className="btn-calc btn-clear" onClick={limpiarTodo}>
            🗑️ Limpiar todo
          </button>
        </div>
      </div>

      {/* WRAPPER DE DOS COLUMNAS */}
      <div className="calculator-wrapper">

        {/* COLUMNA IZQUIERDA: Calculadoras */}
        <div className="calculator-col">
          <div className="calculator-grid">

            {/* DECAIMIENTO */}
            <div className="calculator-card">
              <h4>Decaimiento</h4>
              <p className="formula">N = N₀ · e<sup>-(0.693·t / T₁/₂)</sup></p>
              <div className="input-group">
                <label>Actividad inicial (N₀)</label>
                <input type="number" value={decay.N0} onChange={(e) => setDecay({ ...decay, N0: parseFloat(e.target.value) || 0 })} />
                <span className="unit">kBq</span>
              </div>
              <div className="input-group">
                <label>Período (T₁/₂)</label>
                <input type="number" value={decay.T} onChange={(e) => setDecay({ ...decay, T: parseFloat(e.target.value) || 0 })} />
                <span className="unit">días</span>
              </div>
              <div className="input-group">
                <label>Tiempo (t)</label>
                <input type="number" value={decay.t} onChange={(e) => setDecay({ ...decay, t: parseFloat(e.target.value) || 0 })} />
                <select value={decay.unidad} onChange={(e) => setDecay({ ...decay, unidad: e.target.value })}>
                  <option value="m">Minutos</option>
                  <option value="h">Horas</option>
                  <option value="d">Días</option>
                  <option value="y">Años</option>
                </select>
              </div>
              <button className="btn-calc btn-block" onClick={calcularDecaimiento}>Calcular</button>
              <div className="result-group">
                <label>Actividad final</label>
                <input type="text" value={decay.resultado} readOnly placeholder="Resultado" />
                <span className="unit">kBq</span>
              </div>
              {decay.resultado && (
                <div className="details-group">
                  <h5>📊 Detalles del cálculo</h5>
                  <div className="detail-item"><span>Constante λ:</span><span>{decay.lambda} días⁻¹</span></div>
                  <div className="detail-item"><span>Vidas medias:</span><span>{decay.vidasMedias}</span></div>
                  <div className="detail-item"><span>Factor de decaimiento:</span><span>{decay.factorDecaimiento}</span></div>
                </div>
              )}
              <button className="btn-copy" onClick={() => copiarResultado(decay.resultado)}>📋 Copiar resultado</button>
            </div>

            {/* TIEMPO DE DECAIMIENTO */}
            <div className="calculator-card">
              <h4>Tiempo de decaimiento</h4>
              <p className="formula">t = -(T₁/₂ / 0.693) · ln(N / N₀)</p>
              <div className="input-group">
                <label>Actividad inicial</label>
                <input type="number" value={decayTime.N0} onChange={(e) => setDecayTime({ ...decayTime, N0: parseFloat(e.target.value) || 0 })} />
                <span className="unit">kBq</span>
              </div>
              <div className="input-group">
                <label>Actividad final</label>
                <input type="number" value={decayTime.N} onChange={(e) => setDecayTime({ ...decayTime, N: parseFloat(e.target.value) || 0 })} />
                <span className="unit">kBq</span>
              </div>
              <div className="input-group">
                <label>Período (T₁/₂)</label>
                <input type="number" value={decayTime.T} onChange={(e) => setDecayTime({ ...decayTime, T: parseFloat(e.target.value) || 0 })} />
                <span className="unit">días</span>
              </div>
              <button className="btn-calc btn-block" onClick={calcularTiempoDecaimiento}>Calcular tiempo</button>
              <div className="result-group">
                <label>Tiempo (t)</label>
                <input type="text" value={decayTime.resultado || ""} readOnly placeholder="Resultado" />
                <span className="unit">días</span>
              </div>
              {decayTime.resultado && (
                <div className="details-group">
                  <h5>📊 Detalles del cálculo</h5>
                  <div className="detail-item"><span>Constante λ:</span><span>{decayTime.lambda} días⁻¹</span></div>
                  <div className="detail-item"><span>Vidas medias:</span><span>{decayTime.vidasMedias}</span></div>
                  <div className="detail-item"><span>Factor de decaimiento:</span><span>{decayTime.factorDecaimiento}</span></div>
                </div>
              )}
              <button className="btn-copy" onClick={() => copiarResultado(decayTime.resultado)}>📋 Copiar resultado</button>
            </div>

            {/* RETIRADA DE SÓLIDOS */}
            <div className="calculator-card">
              <h4>Retirada de sólidos</h4>
              <p className="formula">t = -(T₁/₂ / 0.693) · ln(DL / (N₀/m))</p>
              <div className="input-group">
                <label>Actividad inicial</label>
                <input type="number" value={retirada.N0} onChange={(e) => setRetirada({ ...retirada, N0: parseFloat(e.target.value) || 0 })} />
                <span className="unit">kBq</span>
              </div>
              <div className="input-group">
                <label>Masa</label>
                <input type="number" value={retirada.m} onChange={(e) => setRetirada({ ...retirada, m: parseFloat(e.target.value) || 0 })} />
                <span className="unit">kg</span>
              </div>
              <div className="input-group">
                <label>Período (T₁/₂)</label>
                <input type="number" value={retirada.T} onChange={(e) => setRetirada({ ...retirada, T: parseFloat(e.target.value) || 0 })} />
                <span className="unit">días</span>
              </div>
              <div className="input-group">
                <label>Límite (DL)</label>
                <input type="number" value={retirada.DL} onChange={(e) => setRetirada({ ...retirada, DL: parseFloat(e.target.value) || 0 })} />
                <span className="unit">kBq/kg</span>
              </div>
              <button className="btn-calc btn-block" onClick={calcularRetirada}>Calcular tiempo</button>
              <div className="result-group">
                <label>Tiempo (t)</label>
                <input type="text" value={retirada.resultado} readOnly placeholder="Resultado" />
                <span className="unit">días</span>
              </div>
              {retirada.resultado && (
                <div className="details-group">
                  <h5>📊 Detalles del cálculo</h5>
                  <div className="detail-item"><span>Constante λ:</span><span>{retirada.lambda} días⁻¹</span></div>
                  <div className="detail-item"><span>Actividad por masa:</span><span>{retirada.actividadPorMasa} kBq/kg</span></div>
                  <div className="detail-item"><span>Relación DL/(N₀/m):</span><span>{retirada.relacion}</span></div>
                </div>
              )}
              <button className="btn-copy" onClick={() => copiarResultado(retirada.resultado)}>📋 Copiar resultado</button>
              <div className="formula-note">⚠️ Nivel de radiación en superficie &lt; 0.25 mR/h (2.5 µSv/h)</div>
            </div>

          </div>
        </div>

        {/* COLUMNA DERECHA: Historial + Conversor */}
        <div className="historial-col">
          
          {/* HISTORIAL */}
          <div className="historial-section">
            <div className="historial-header">
              <h4>📋 Historial de cálculos</h4>
              {historial.length > 0 && (
                <button className="btn-clear-historial" onClick={limpiarHistorial}>
                  🗑️ Limpiar
                </button>
              )}
            </div>
            {historial.length === 0 ? (
              <p className="empty-message">No hay cálculos guardados aún.</p>
            ) : (
              <div className="historial-list">
                {historial.map((item) => (
                  <div key={item.id} className="historial-item">
                    <span className="historial-fecha">{item.fecha}</span>
                    <span className="historial-tipo">{item.tipo}</span>
                    <span className="historial-resultado">{item.resultado}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CONVERSOR DE UNIDADES (debajo del historial) */}
          <div className="conversor-section" style={{ marginTop: '20px' }}>
            <h4>🔄 Conversor de Unidades de Actividad</h4>
            <div className="conversor-grid">
              <div className="input-group">
                <label>Valor</label>
                <input type="number" value={conversionValor} onChange={(e) => setConversionValor(parseFloat(e.target.value) || 0)} step="any" />
              </div>
              <div className="input-group">
                <label>Desde</label>
                <select value={conversionDesde} onChange={(e) => setConversionDesde(e.target.value)}>
                  {Object.keys(factoresBq).map((unidad) => (<option key={unidad} value={unidad}>{unidad}</option>))}
                </select>
              </div>
              <div className="input-group">
                <label>Hacia</label>
                <select value={conversionHacia} onChange={(e) => setConversionHacia(e.target.value)}>
                  {Object.keys(factoresBq).map((unidad) => (<option key={unidad} value={unidad}>{unidad}</option>))}
                </select>
                <button className="btn-calc" onClick={convertirUnidad}>Convertir</button>
              </div>
              <div className="result-group">
                <label>Resultado</label>
                <input type="text" value={conversionResultado} readOnly placeholder="Resultado" />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* HERRAMIENTAS DE FECHAS */}
      <div className="fecha-section">
        <h4>📅 Herramientas de fechas</h4>
        <div className="fecha-tab">
          <h5>📊 Calibración → Medición</h5>
          <div className="fecha-row">
            <div className="input-group">
              <label>Calibración</label>
              <input type="date" value={fechaCalibracion.fecha} onChange={(e) => setFechaCalibracion({ ...fechaCalibracion, fecha: e.target.value })} />
              <input type="time" value={fechaCalibracion.hora} onChange={(e) => setFechaCalibracion({ ...fechaCalibracion, hora: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Medición</label>
              <input type="date" value={fechaMedicion.fecha} onChange={(e) => setFechaMedicion({ ...fechaMedicion, fecha: e.target.value })} />
              <input type="time" value={fechaMedicion.hora} onChange={(e) => setFechaMedicion({ ...fechaMedicion, hora: e.target.value })} />
            </div>
            <button className="btn-calc" onClick={calcularPorFecha}>⏱️ Calcular tiempo</button>
          </div>
        </div>
        <hr />
        <div className="fecha-tab">
          <h5>➖ Días entre dos fechas</h5>
          <div className="fecha-row">
            <div className="input-group">
              <label>Fecha 1</label>
              <input type="date" value={restaFechas.fecha1} onChange={(e) => setRestaFechas({ ...restaFechas, fecha1: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Fecha 2</label>
              <input type="date" value={restaFechas.fecha2} onChange={(e) => setRestaFechas({ ...restaFechas, fecha2: e.target.value })} />
            </div>
            <button className="btn-calc" onClick={calcularRestaFechas}>📆 Calcular días</button>
            <div className="result-group">
              <label>Días</label>
              <input type="text" value={restaFechas.resultado} readOnly placeholder="Resultado" />
            </div>
          </div>
        </div>
        <hr />
        <div className="fecha-tab">
          <h5>➕ Sumar o restar días</h5>
          <div className="fecha-row">
            <div className="input-group">
              <label>Fecha</label>
              <input type="date" value={sumaDias.fecha} onChange={(e) => setSumaDias({ ...sumaDias, fecha: e.target.value })} />
              <button className="btn-hoy" onClick={() => setSumaDias({ ...sumaDias, fecha: new Date().toISOString().split('T')[0] })}>📅 Hoy</button>
            </div>
            <div className="input-group">
              <label>Días</label>
              <input type="number" value={sumaDias.dias} onChange={(e) => setSumaDias({ ...sumaDias, dias: parseInt(e.target.value) || 0 })} step="1" />
            </div>
            <button className="btn-calc" onClick={calcularSumaDias}>➕ Calcular</button>
            <div className="result-group">
              <label>Nueva fecha</label>
              <input type="text" value={sumaDias.resultado} readOnly placeholder="Resultado" />
            </div>
          </div>
        </div>
      </div>

      {/* TABLA DE ISÓTOPOS */}
      <div className="isotopes-section">
        <h4>📋 Tabla de Radioisótopos de uso médico</h4>
        <div className="isotopes-table-wrapper">
          <table className="isotopes-table">
            <thead>
              <tr><th>Radioisótopo</th><th>Símbolo</th><th>Vida Media</th><th>Tipo de Emisión</th></tr>
            </thead>
            <tbody>
              {radioisotopos.map((iso) => (
                <tr key={iso.nombre}>
                  <td>{iso.nombre}</td>
                  <td>{iso.simbolo}</td>
                  <td>{iso.vidaMedia} {iso.unidad}</td>
                  <td>{iso.emision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="isotopes-note">⚠️ Esta tabla es una referencia. Los valores deben ser verificados antes de su uso clínico.</p>
      </div>

    </div>
  </section>
);
}

export default Calculator;