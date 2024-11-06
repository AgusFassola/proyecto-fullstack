import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        'http://localhost:5000/api/tasks/create',
         { title, description },
          config
      );
      console.log('tarea creada: ', response.data)
      navigate('/');//redirigir a las tareas
    }catch(err){
      console.error('Error al crear tarea:', err);
    }
  };

  return (
    <div className='container mx-auto p-8'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded shadow-md'>
        <h2 className='text-2x1 font-bold mb-6 text-gray-800'>Crear nueva tarea</h2>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2'>Titulo:</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder='Ingrese un título'
          />
        </div>
        <div className='mb-4 '>
          <label className='block text-gray-700 font-medium mb-2'> 
            Descripción
          </label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none'
            placeholder='Ingrese una descripción'
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition w-full">
          Crear Tarea
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
