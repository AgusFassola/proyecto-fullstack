import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';


const Navbar = () => {
    const [ userRole, setUserRole ] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            try{
                const decoded = jwtDecode(token);
                setUserRole(decoded.role);
            }catch (error) {
                console.error('Error al decodificar el token:', error);
            }
            
        }
    }, []);

    
    
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

     // Ocultar Navbar en la página de login
     if (location.pathname === '/login') {
        return null;
    }
    return (
        <nav className='ng-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-lg'>
            <div className='container mx-auto flex justify-between items-center'>
                <Link to="/" className='text-white text-2x1 font-bold hover:text-gray-300'>
                    <span className='flex items-center gap-2'>
                        📝<span>TaskManager</span>
                    </span>
                </Link>
                <div className='space-x-6'>
                    <Link to="/" className='text-white hover:text-gray-300 transition'>
                        Home
                    </Link>
                    <Link to="/create" className='text-white hover:text-gray-300 transition'>
                        Crear tarea
                    </Link>
                    { userRole === 'admin' && (
                        <>
                            <button onClick={() => navigate('/createUser')}>
                                Crear Usuario
                            </button>
                        </>
                    )}
                    {localStorage.getItem('token') && (
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                    )}
                </div>
            </div>
        </nav>
    );
};
export default Navbar;