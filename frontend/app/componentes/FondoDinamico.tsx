'use client'
import { useState, useEffect } from 'react';

export default function FondoDinamico() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fondo-base w-full h-screen relative overflow-hidden">
      {/* Capa 1: El fondo de la montaña (se agregará después) */}
      <div className="w-full h-full bg-slate-950 absolute inset-0"></div>

      {/* Capa 2: El halo que sigue al mouse */}
      <div
        className="halo-seguidor absolute rounded-full"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, #00BFFF 0%, transparent 70%)',
          width: '400px',
          height: '400px',
          opacity: '0.2',
        }}
      ></div>
    </div>
  );
}