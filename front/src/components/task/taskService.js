import axios from "axios";

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { authorization: `Bearer ${token}` } : {};
}

export const getTasks = async ({ page, limit, search, sort }) =>{
      const response = await axios.get('http://localhost:5000/api/tasks',{
        params:{ page, limit, search, sort },
        headers: getAuthHeader(),
      });
      return response.data;
};

export  const createTask = async (taskData) =>{
    const response = await axios.post(`http://localhost:5000/api/tasks/create`, taskData, {
        headers: getAuthHeader(),
    } );
    return response.data;
}; 

export const getTaskById = async (id) =>{
    try{
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        return response.data;
    }catch(err){
        throw err;
    }
}

export  const deleteTask = async (id) =>{
    const response = await axios.delete(`http://localhost:5000/api/tasks/${id}`,{
        headers: getAuthHeader(),
    });
    return response.data;
}; 

export  const updateTask = async (id, taskData) =>{
    const response = await axios.put(`http://localhost:5000/api/tasks${id}`, taskData, {
        headers: getAuthHeader(),
    } );
    return response.data;
}; 