import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            const {role} = response.data;
            if ( role === 'admin' ){
                navigate('/admin');
            }else{
                navigate('/');
            }
        }catch (err) {
            console.error('Error de autenticación:', err);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <form onSubmit={handleLogin} className='bg-white p-8 rounded shadow-md w-full max-w-sm'>
                <h2 className='text-2x1 font-bold mb-6 text-center text-gray-800'>
                    Iniciar Sesión
                </h2>
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
                <button
                    type='submit' 
                    className='bg-blue-500 text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-600 transition'
                >Iniciar Sesión</button>
            </form>
        </div>
    );
};
export default Login;
