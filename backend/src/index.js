require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const preguntas = require('./datos/preguntas.json');

const app = express();
const PORT = process.env.PORT || 5000;

// Conecta a la base de datos
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar con la base de datos:', err));

app.use(cors());
app.use(express.json());

// Ruta para obtener las preguntas
app.get('/api/preguntas', (req, res) => {
  const roscoAleatorio = [];
  const alfabeto = 'abcdefghijklmnopqrstuvwxyz'.split('');

  alfabeto.forEach(letra => {
    const preguntasDeLetra = preguntas[letra];
    if (preguntasDeLetra && preguntasDeLetra.length > 0) {
      const preguntaAleatoria = preguntasDeLetra[Math.floor(Math.random() * preguntasDeLetra.length)];
      roscoAleatorio.push(preguntaAleatoria);
    }
  });

  res.json(roscoAleatorio);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});