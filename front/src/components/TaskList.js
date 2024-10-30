import { useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  },[]);

  const fetchTasks = async () =>{
    try{
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    }catch(err){
      console.error('Error al obtener tareas:', err);
    }
  };

  const deleteTask = async (id) =>{
    try{
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();//refrescar despues de eliminar
    }catch(err){
      console.error('Error al eliminar la tarea:', err);
    }
  };

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3x1 front-bold mb-4'>Lista de tareas</h1>
      <Link to="/create">
        <button className='bg-blue-500 hover:bg-blue-700 text-white front-bold py-2 px-4 rounded mb-4'>
          Nueva tarea
        </button>
      </Link>
      <ul className='space-y-4'>
        {tasks.map((task) => (
          <li
            key={task._id}
            className='flex justify-between items-center p-4 bg-gray-100 rounded shadow'
          >
            <div>
              <h2 className='text-xl font-semibold'>{task.title}</h2>
              <p className='text-gray-700'>{task.description}</p>
            </div>
            
            <button 
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded'
              onClick={() => deleteTask(task._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
