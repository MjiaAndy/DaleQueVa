'use client'
import { motion } from 'framer-motion';

const textoAnimacion = {
  escondido: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function PantallaBienvenida({ onIniciarJuego }: { onIniciarJuego: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8 text-center text-white"
      initial="escondido"
      animate="visible"
      variants={textoAnimacion}
    >
      <motion.h1
        className="text-6xl font-bold md:text-8xl"
        variants={textoAnimacion}
      >
        DaleQueVa
      </motion.h1>
      <motion.p
        className="mt-4 text-xl md:text-2xl"
        variants={textoAnimacion}
      >
        De la A a la Z sin aflojar
      </motion.p>
      <motion.button
        onClick={onIniciarJuego}
        className="mt-8 px-6 py-3 rounded-full font-semibold text-lg bg-blue-500 hover:bg-blue-600 transition-colors"
        variants={textoAnimacion}
      >
        ¡Empezar a jugar!
      </motion.button>
    </motion.div>
  );
}