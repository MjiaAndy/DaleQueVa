'use client'
import { useState } from 'react';
import FondoDinamico from './componentes/FondoDinamico';
import PantallaBienvenida from './componentes/PantallaBienvenida';
import ModalRegistro from './componentes/ModalRegistro';
import PantallaJuego from './componentes/PantallaJuego';
import { Poppins } from 'next/font/google';
import { useJuego } from './hooks/useJuego';

const poppins = Poppins({ subsets: ['latin'], weight: '400' });

export default function Home() {
  const { preguntas, setPreguntas, cargando, error } = useJuego(); // Usamos setPreguntas desde el hook
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);

  const manejarInicioJuego = () => {
    setModalAbierto(true);
  };

  const manejarComienzo = () => {
    if (!cargando && !error) {
      setModalAbierto(false);
      setJuegoIniciado(true);
    }
  };

  return (
    <main className={`${poppins.className} relative`}>
      <div className="absolute inset-0 z-0">
        <FondoDinamico />
      </div>
      <div className="relative z-10 flex h-screen items-center justify-center">
        {!juegoIniciado && !modalAbierto && (
          <PantallaBienvenida onIniciarJuego={manejarInicioJuego} />
        )}
        {!juegoIniciado && modalAbierto && (
          <ModalRegistro onComienzoJuego={manejarComienzo} cargando={cargando} error={error} />
        )}
        {juegoIniciado && (
          <PantallaJuego preguntas={preguntas} setPreguntas={setPreguntas} />
        )}
      </div>
    </main>
  );
}
