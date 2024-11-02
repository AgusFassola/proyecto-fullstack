import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import Navbar from './components/Navbar';



function App() {
  return (
    <Router>
      <div className='min-h-screen bg-gray-400'>
        <Navbar />
        <div className='container mx-auto p-8'>
            <Routes>
                <Route path="/" element={<TaskList/>}/>
                <Route path="/create" element={<CreateTask/>}/>
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
