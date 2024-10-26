const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();//para cargar variables de entorno

const app = express();
console.log("Servidor funcionando correctamente");

// Conectar a la base de datos
connectDB();

//middlewares
app.use(cors());
app.use(express.json());

//rutas
app.use('/api', taskRoutes);


//Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`SERVIDOR CORRIENDO EN http://localhost:${PORT}`);
});

