const mongoose = require('mongoose');

//conexion con mongoDB
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology:true, 
        });
        console.log('conectado a MongoDB')
    
    }catch(err){
        console.error('Error al conectar MongoBD', err);
        process.exit(1);//salir enc aso de fallo
    }
};

module.exports = connectDB;