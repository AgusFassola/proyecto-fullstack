import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById, updateTask } from './taskService';

const EditTask = () => {
    const {id} = useParams();
    const [task, setTask] = useState({ title: '', description: ''});
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async() =>{
            try{
                const taskData = await getTaskById(id);
                if(taskData){
                    setTask(taskData);
                }else {
                    console.log("tarea no encontrada")
                }
            }catch(err){
                console.log("Error al obtener la tarea: ",err)
            }finally{
                setLoading(false);
            }
        };
        fetchTasks();
    },[id]);

    const handleChange= (e) =>{
        const { name, value } = e.target;
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await updateTask(id, task);
        navigate('/');
    };

    const handleCancel = () =>{
        navigate('/');
    }
    if(loading){
        return <div>Cargando...</div>
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-400'>
        <div className='max-w-md w-full bg-white p-6 rounded-lg shadow-lg mt-[-10%]'>
            <h1 className='text-4x1 font-extrabold text-center mb-8 text-gray-800'>Editar</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <input 
                    type='text'
                    name='title'
                    value={task.title}
                    onChange={handleChange}
                    placeholder='Titulo de la tarea'
                    className='border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none w-full'
                />
                <textarea 
                    name='description'
                    value={task.description}
                    onChange={handleChange}
                    placeholder='Descripción de la tarea'
                    className='border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none w-full'
                ></textarea>
                <button
                    onClick={handleCancel}
                    className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                >Cancelar</button>
                <button
                    type='submit'
                    className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'
                >Guardar</button>
            </form>
        </div>
        
    </div>
  );
};

export default EditTask;
