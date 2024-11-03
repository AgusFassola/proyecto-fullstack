const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcryptjs');

exports.register = async (req, res) => {
    try{
        const { username, password, role } = req.body;
        const user = new User({ username, password, role });
        await user.save();
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    }catch(err){
        res.status(500).json({ message: 'Error al registrar usuario', err});
    }
};

//Login
exports.login = async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if(!user){
            return res.status(400).json({ message:'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare( password, user.password );
        if(!isMatch){
            return res.status(400).json({ message:'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_KEY,
            { expiresIn: '1h'}
        );
        res.json({ token });

    }catch(err){
        res.status(500).json({ message: 'Error al iniciar sesion', err})
    }
};