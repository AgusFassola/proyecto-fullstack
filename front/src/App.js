import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';



function App() {
  return (
    <Router>
        <div className='container'>
            <h1>Administrador de tareas</h1>
            <Routes>
                <Route path="/" element={<TaskList/>}/>
                <Route path="/create" element={<CreateTask/>}/>
            </Routes>
        </div>
    </Router>
  )
}

export default App;