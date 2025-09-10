'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';
// import { useJuego } from '../hooks/useJuego';

interface ModalRegistroProps {
  onComienzoJuego: () => void;
  cargando: boolean;
  error: string | null;
}

const modalAnimacion = {
  escondido: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function ModalRegistro({ onComienzoJuego, cargando, error }: ModalRegistroProps) {
  const [nombre, setNombre] = useState('');

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComienzoJuego(); // Llama a la función para iniciar el juego
  };

  return (
    <motion.div
      className="bg-zinc-800 bg-opacity-60 backdrop-blur-lg rounded-2xl p-8 shadow-2xl w-full max-w-md mx-4 md:mx-0"
      initial="escondido"
      animate="visible"
      variants={modalAnimacion}
    >
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Ingresa tus datos
      </h2>
      <form onSubmit={manejarSubmit} className="space-y-4">
        {cargando && <p className="text-white text-center">Cargando preguntas...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-300">
            Tu nombre
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-700 bg-zinc-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        {/* Aquí irían los selectores de dificultad y el "premio" */}
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Iniciar Juego
        </button>
      </form>
    </motion.div>
  );
}