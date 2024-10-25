const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();//para cargar variables de entorno
const app = express();
console.log("Servidor funcionando correctamente");
//middlewares
app.use(cors());
app.use(express.json());

//ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

//conexion con mongoDB
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology:true })
    .then(() => console.log('conectado a MongoDB'))
    .catch((err) => console.error('Error al conectar MongoBD', err));

//Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`SERVIDOR CORRIENDO EN http://localhost:${PORT}`);
});