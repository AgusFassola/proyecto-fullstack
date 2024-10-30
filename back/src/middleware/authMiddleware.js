const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    
    if(!token){
        return res.status(401).json({ message:'No autorizado'})
    }

    try{
        const decoded = jwt.verify( token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).json({ message:'Token no valido '});
    }
};