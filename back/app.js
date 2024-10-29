const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const taskRoutes = require('./src/routes/taskRoutes');

//dotenv.config();//para cargar variables de entorno

const app = express();
console.log("Servidor funcionando correctamente");

// Conectar a la base de datos
connectDB();

//middlewares
app.use(cors({ origin:'http://localhost:3000' }));
app.use(bodyParser.json());

//rutas
app.use('/api/tasks', taskRoutes);


//Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`SERVIDOR CORRIENDO EN http://localhost:${PORT}`);
});

