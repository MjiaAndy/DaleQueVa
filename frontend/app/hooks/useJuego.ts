import { useState, useEffect } from 'react';
import axios from 'axios';

interface Pregunta {
  pregunta: string;
  respuesta: string;
  dificultad: 'niños' | 'adultos';
}

const API_URL = process.env.PUBLIC_API_URL;

export const useJuego = () => {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerPreguntas = async () => {
      try {
        const respuesta = await axios.get(`${API_URL}/api/preguntas`);
        const roscoConEstado = respuesta.data.map((p: Pregunta) => ({
          ...p,
          estadoRespuesta: 'sin_responder',
        }));
        setPreguntas(roscoConEstado);
      } catch (err) {
        setError('No se pudieron cargar las preguntas.');
      } finally {
        setCargando(false);
      }
    };

    if (API_URL) {
      obtenerPreguntas();
    } else {
      setError('URL de la API no configurada.');
      setCargando(false);
    }
  }, []);

  return { preguntas, setPreguntas, cargando, error };
};