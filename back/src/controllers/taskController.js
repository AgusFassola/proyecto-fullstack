const Task = require('../models/Task');

//obtener todas las tareas
exports.getTasks = async (req,res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);
        console.log("conectado correctamente")
    }catch(err){
        res.status(500).json({ message: 'Error al obtener las tareas' });
        console.log("error:",err)
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

