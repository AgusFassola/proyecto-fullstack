import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/task/TaskList';
import CreateTask from './components/task/CreateTask';
import Navbar from './components/Navbar';
import Login from './components/Login';


function App() {
  return (
    <Router>
      <div className='min-h-screen bg-gray-400'>
        <Navbar />
        <div className='container mx-auto p-8'>
            <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<TaskList/>}/>
                <Route path="/create" element={<CreateTask/>}/>
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
