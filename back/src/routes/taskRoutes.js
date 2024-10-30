const express = require('express');
const { getTasks, createTask, deleteTask, updateTask} = require('../controllers/taskController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getTasks);
router.post('/create', protect, createTask);
router.delete('/:id', protect, deleteTask);
router.put('/:id', protect, updateTask);

module.exports = router;