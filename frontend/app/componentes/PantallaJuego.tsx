'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Pregunta {
  pregunta: string;
  respuesta: string;
  dificultad: 'niños' | 'adultos';
  estadoRespuesta?: 'correcto' | 'incorrecto' | 'sin_responder';
}

interface PantallaJuegoProps {
  preguntas: Pregunta[];
  setPreguntas: (preguntas: Pregunta[]) => void;
}

export default function PantallaJuego({ preguntas, setPreguntas }: PantallaJuegoProps) {
  const [preguntaActualIndex, setPreguntaActualIndex] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState(150);
  const [respuestaUsuario, setRespuestaUsuario] = useState('');
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [puntuacion, setPuntuacion] = useState(0);

  useEffect(() => {
    if (tiempoRestante <= 0 || !preguntas[preguntaActualIndex]) {
      setJuegoTerminado(true);
      return;
    }

    const timer = setTimeout(() => {
      setTiempoRestante(tiempoRestante - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [tiempoRestante, preguntaActualIndex, preguntas]);

  const manejarEnvioRespuesta = (e: React.FormEvent) => {
    e.preventDefault();
    const esCorrecto = respuestaUsuario.toLowerCase() === preguntas[preguntaActualIndex].respuesta.toLowerCase();

    const preguntasActualizadas = [...preguntas];

    if (esCorrecto) {
      preguntasActualizadas[preguntaActualIndex].estadoRespuesta = 'correcto';
      setPuntuacion(puntuacion + 1);
    } else {
      preguntasActualizadas[preguntaActualIndex].estadoRespuesta = 'incorrecto';
    }

    setPreguntas(preguntasActualizadas);
    setRespuestaUsuario('');

    // Encuentra la siguiente pregunta que no haya sido respondida
    let siguienteIndex = (preguntaActualIndex + 1) % preguntas.length;
    while (preguntas[siguienteIndex].estadoRespuesta && siguienteIndex !== preguntaActualIndex) {
      siguienteIndex = (siguienteIndex + 1) % preguntas.length;
    }

    if (siguienteIndex === preguntaActualIndex && preguntas[preguntaActualIndex].estadoRespuesta) {
        setJuegoTerminado(true);
    } else {
        setPreguntaActualIndex(siguienteIndex);
    }
  };

  const obtenerClaseLetra = (index: number) => {
      const pregunta = preguntas[index];
      if (!pregunta) {
          return 'bg-gray-400';
      }
      if (preguntaActualIndex === index && !juegoTerminado) {
          return 'bg-blue-500';
      }
      switch (pregunta.estadoRespuesta) {
          case 'correcto':
              return 'bg-green-500';
          case 'incorrecto':
              return 'bg-red-500';
          default:
              return 'bg-gray-400';
      }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-8 text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute top-8 left-8 text-xl font-bold">
        Tiempo: {tiempoRestante}
      </div>
      <div className="absolute top-8 right-8 text-xl font-bold">
        Puntos: {puntuacion}
      </div>
      <div className="rosco-container grid grid-cols-5 gap-4 mb-8 w-full max-w-2xl mx-auto mt-20">
        {'abcdefghijklmnopqrstuvwxyz'.split('').map((letra, index) => (
          <span
            key={index}
            className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold ${obtenerClaseLetra(index)}`}
          >
            {letra.toUpperCase()}
          </span>
        ))}
      </div>

      <div className="bg-zinc-800 bg-opacity-60 backdrop-blur-lg rounded-2xl p-8 shadow-2xl w-full max-w-lg mx-4 text-center mt-auto mb-auto">
        {juegoTerminado ? (
          <h2 className="text-3xl font-bold">Juego Terminado</h2>
        ) : (
          <>
            <p className="text-xl mb-4">
              {preguntas[preguntaActualIndex]?.pregunta || "Cargando..."}
            </p>
            <form onSubmit={manejarEnvioRespuesta} className="flex flex-col items-center">
              <input
                type="text"
                value={respuestaUsuario}
                onChange={(e) => setRespuestaUsuario(e.target.value)}
                className="w-full rounded-md border-gray-700 bg-zinc-700 text-white p-2 mb-4"
                placeholder="Escribe tu respuesta..."
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-full font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Responder
              </button>
            </form>
          </>
        )}
      </div>
    </motion.div>
  );
}