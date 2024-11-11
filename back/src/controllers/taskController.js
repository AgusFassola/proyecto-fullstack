const Task = require('../models/Task');

//obtener todas las tareas
exports.getTasks = async (req,res) => {
    try{
        const { page=1, limit=10, search='', sort='asc'} = req.query;

        const query = {
            $or:[{ 
                    title:{ $regex: search, $options: 'i'}
                },{
                    description: { $regex: search, $options: 'i'}
            }]
        };

        const tasks = await Task.find( query )
        .sort({ title: sort === 'asc' ? 1 : -1})
        .limit( limit * 1 )
        .skip(( page - 1 ) * limit);

        const total = await Task.countDocuments(query);

        res.json({
            tasks,
            total,
            totalPages: Math.ceil( total/limit ),
            currentPage: page
        });
        console.log("conectado correctamente")
    }catch(err){
        res.status(500).json({ message: 'Error al obtener las tareas' });
        console.log("error:",err)
    }
};


exports.getTaskById = async ( id ) => {
    try{
        const task = await Task.findById(req.params.id)
        if(!task){
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
    }catch(err){
        res.status(500).json({ message: 'Error al obtener la tarea' });
    }
};
//crear una tarea
exports.createTask = async (req,res) => {
    const { title, description} = req.body;

    const newTask = new Task({
        title,
        description
    });
    try{

        await newTask.save();
        res.status(201).json(newTask);
    }catch(err){
        res.status(500).json({ message: 'Error al crear la tarea' });
    }
}

//eliminar una tarea
exports.deleteTask = async (req,res) => {
    try{
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'tarea eliminada' });
    }catch(err){
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
}

//actualizar una tarea
exports.updateTask = async (req,res) => {
    try{
        const updateTask = await 
        Task.findByIdAndUpdate(
            req.params.id, req.body,{ new: true });
        res.json(updateTask);
    }catch(err){
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
}

