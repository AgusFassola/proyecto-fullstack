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
      await axios.post('http://localhost:5000/api/tasks/create', { title, description });
      navigate('/');//redirigir a las tareas
    }catch(err){
      console.error('Error al crear tarea:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md'>
      <h2 className='text-2x1 font-bold mb-4'>Crear nueva tarea</h2>
      <div className='mb-4'>
        <label className='block text-gray-700 mb-2'>Titulo:</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div className='mb-4 '>
        <label className='block text-gray-700 mb-2'> 
          Descripción
        </label>
        <textarea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full px-4 py-2 border rounded'
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Crear Tarea
      </button>
    </form>
  );
}

export default CreateTask;
