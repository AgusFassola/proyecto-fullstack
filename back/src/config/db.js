const mongoose = require('mongoose');

//conexion con mongoDB
const connectDB = async () => {
/*     try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('conectado a MongoDB')
    
    }catch(err){
        console.error('Error al conectar MongoBD', err);
        process.exit(1);//salir enc aso de fallo
    }
 */
try{
    const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.q0ebaqb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    await mongoose.connect(url);
    console.log('Conexión correcta a MongoDB');
    }catch(error){
        console.log('falló la conexión con la BD!',error);
        process.exit(1); // Detiene el proceso en caso de error
    };
};

module.exports = connectDB;