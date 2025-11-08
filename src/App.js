import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [cuadros, setCuadros] = useState(Array(9).fill(null));
  const [turnoX, setTurnoX] = useState(true);
  const [ganador, setGanador] = useState(null);

  // Guardar el juego en localStorage (opcional)
  useEffect(() => {
    localStorage.setItem("tableroRD", JSON.stringify(cuadros));
  }, [cuadros]);

  function manejarClick(index) {
    if (cuadros[index] || ganador) return;

    const nuevosCuadros = [...cuadros];
    nuevosCuadros[index] = turnoX ? "🇩🇴 X" : "O 🇩🇴";
    setCuadros(nuevosCuadros);
    setTurnoX(!turnoX);
    verificarGanador(nuevosCuadros);
  }

  function verificarGanador(c) {
    const lineas = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let linea of lineas) {
      const [a, b, d] = linea;
      if (c[a] && c[a] === c[b] && c[a] === c[d]) {
        setGanador(c[a]);
        return;
      }
    }

    if (c.every((x) => x !== null)) {
      setGanador("Empate 🇩🇴");
    }
  }

  function reiniciarJuego() {
    setCuadros(Array(9).fill(null));
    setTurnoX(true);
    setGanador(null);
  }

  return (
    <div className="fondo">
      <h1 className="titulo">🇩🇴 Juego del Gato Dominicano 🇩🇴</h1>
      <div className="tablero">
        {cuadros.map((cuadro, i) => (
          <button key={i} className="cuadro" onClick={() => manejarClick(i)}>
            {cuadro}
          </button>
        ))}
      </div>
      <div className="info">
        {ganador ? (
          <h2>
            {ganador === "Empate 🇩🇴"
              ? "Empate, somos todos ganadores 💪🇩🇴"
              : `Ganó ${ganador} 🎉`}
          </h2>
        ) : (
          <h2>Turno de: {turnoX ? "🇩🇴 X" : "O 🇩🇴"}</h2>
        )}
      </div>
      <button className="boton-reiniciar" onClick={reiniciarJuego}>
        🔁 Reiniciar Juego
      </button>
      <p className="creditos">Hecho con amor 🇩🇴 por un estudiante dominicano 💻</p>
    </div>
  );
}

export default App;
