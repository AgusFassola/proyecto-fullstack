
const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/api/users/register', {username, password, role })
            alert('Usuario creado con éxito')
        }catch(err){
            console.log('error al crear el usuario',err)
        } 
    };

  return (
    <div className="container mx-auto p-8">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
        <h2 className="text-2x1 font-bold mb-6 text-gray-800">Crear Nuevo Usuario</h2>
        <div className='mb-4'>
                <label className='block text-gray-700 mb-2'>Nombre de Usuario: </label>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none'
                />
        </div>
        <div className='mb-4'>
                <label className='block text-gray-700 mb-2'>Contraseña: </label>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none'
                />
        </div>
        <div className='mb-4'>
                <label className='block text-gray-700 mb-2'>Rol: </label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className='w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none'
                >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>
        </div>
        <button
            type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded w-full hover:bg-green-600 transition" 
        >
            Crear Usuario
        </button>
      </form>
    </div>
  )
}

export default CreateUser;
