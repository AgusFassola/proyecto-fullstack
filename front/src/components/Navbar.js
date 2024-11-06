import { Link } from 'react-router-dom';

const Navbar = () => {
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
                    <Link to="/login" className='text-white hover:text-gray-300 transition'>
                        Log out
                    </Link>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;