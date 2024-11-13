import { useEffect, useState} from 'react';
import { getTasks, deleteTask } from './taskService';
import { Link, useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [sort, setSort] = useState('asc');
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    fetchTasks();
  },[search, page, sort]);


  const fetchTasks = async () => {
    setLoading(true);
    try{
      const data = await getTasks({ page, limit, search, sort });
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
    }catch(err){
      if(err.response && err.response.status === 401){
        navigate('/login');
      }else{
        console.error('Error al obtener tareas: ',err)
      }
    }
    setLoading(false);
  };


  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  }

  const toggleSort = () => {
    setSort(sort === 'asc' ? 'desc' : 'asc')
  };

  const handleDelete = async (id) => {
    if(window.confirm('¿Eliminar la tarea?')){
      try{
        await deleteTask(id);
        fetchTasks();
      }catch(err){
        console.error('Error al eliminar la tarea: ',err)
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/${id}`);
  };
  

  return (
    <div className='container mx-auto p-8 text-gray-800'>
      <h1 className='text-4x1 front-extrabold text-center mb-8 text-white'>
        Lista de tareas
      </h1>
      <div className='flex flex-col md:flex-row justify-between mb-6 items-center'>
      <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={handleSearch}
          className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <div className='felx items-center space-x-4'>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
            onClick={toggleSort}
          >
            Ordenar {sort === 'asc' ? '🔼' : '🔽'}
          </button>
          <Link to="/create">
            <button className='bg-green-500 hover:bg-green-600 text-white front-bold py-2 px-4 rounded mb-4'>
              Nueva tarea
            </button>
          </Link>
        </div>
      </div>

      { loading ? (
        <div className='text-center text-white'>Cargando tareas...</div>
      ):(
        <div className='grid grid-cols-1 md:grid-cols-2 pag-6'>
          {tasks.map((task) => (
            <div
              key={task._id}
              className='p-4 bg-white rounded shadow-md hover:shadow-lg transition'
            >
              <h2 className='text-xl font-semibold mb-2'>{task.title}</h2>
              <p className='text-gray-700 mb-4'>{task.description}</p>
              <div className='flex justify-end space-x-4'>
              <button 
                  className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded'
                  onClick={() => handleEdit(task._id)}>
                  Editar
                </button>
                <button 
                  className='bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded'
                  onClick={() => handleDelete(task._id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
      </div>
      )}
      
      <div className='flex flex-col items-center mt-8 space-y-2'>
        <div className='flex space-x-4 mt-8'>
          <button 
            onClick={() => setPage( page -1 )}
            disabled={ page === 1 }
            className='bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-400'
          >
            Anterior
          </button>
          <button onClick={() => setPage( page +1 )}
            disabled={ page === totalPages }
            className='bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-400'
          >
            Siguiente
          </button>
        </div>

        <p className='text-gray-700 text-lg font-medium mt-2'>
          Página <span className='text-blue-600 font-bold'>{page}</span> de{' '} <span className='text-blue-600 font-bold'>{totalPages}</span> 
        </p>
      </div>
    </div>
  );
};

export default TaskList;
