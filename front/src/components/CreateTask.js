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
      await axios.post('http://localhost:5000/api/tasks', { title, description });
      navigate('/');//redirigir a las tareas
    }catch(err){
      console.error('Error al crear tarea:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Titulo:</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button type="submit">Crear Tarea</button>
    </form>
  );
}

export default CreateTask;
