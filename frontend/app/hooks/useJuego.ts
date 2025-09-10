import { useState, useEffect } from 'react';
import axios from 'axios';

interface Pregunta {
  pregunta: string;
  respuesta: string;
  dificultad: 'niños' | 'adultos';
}

export const useJuego = () => {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerPreguntas = async () => {
      try {
        const respuesta = await axios.get('http://localhost:5000/api/preguntas');
        const roscoConEstado = respuesta.data.map((p: Pregunta) => ({
          ...p,
          respondido: false,
        }));
        setPreguntas(roscoConEstado);
      } catch (err) {
        setError('No se pudieron cargar las preguntas.');
      } finally {
        setCargando(false);
      }
    };

    obtenerPreguntas();
  }, []);

  return { preguntas, setPreguntas, cargando, error };
};