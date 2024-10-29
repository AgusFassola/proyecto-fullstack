const express = require('express');
const { getTasks, createTask, deleteTask, updateTask} = require('../controllers/taskController');
const router = express.Router();

router.get('/', getTasks);
router.post('/create', createTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);

module.exports = router;