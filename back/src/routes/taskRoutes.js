const express = require('express');
const { getTasks, createTask, deleteTask, updateTask} = require('../controllers/taskController');
const router = express.Router();

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.delete('/task', deleteTask);
router.put('/task', updateTask);

module.exports = router;