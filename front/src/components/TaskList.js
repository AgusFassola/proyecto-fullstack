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
      <h1 className='text-4x1 front-extrabold text-center mb-8 text-gray-800'>
        Lista de tareas
      </h1>
      <div className='flex justify-end mb-6'>
        <Link to="/create">
          <button className='bg-green-500 hover:bg-green-600 text-white front-bold py-2 px-4 rounded mb-4'>
            Nueva tarea
          </button>
        </Link>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 pag-6'>
        {tasks.map((task) => (
          <div
            key={task._id}
            className='p-4 bg-white rounded shadow-md hover:shadow-lg transition'
          >
            <h2 className='text-xl font-semibold mb-2'>{task.title}</h2>
            <p className='text-gray-600 mb-4'>{task.description}</p>
            <div className='flex justify-end'>
              <button 
                className='bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded'
                onClick={() => deleteTask(task._id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
