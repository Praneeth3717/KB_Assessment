const { Router } = require('express');
const { getNotes, createNote, deleteNote, updateNote } = require('../controllers/NotesController');
const verifyToken = require('../middleware/authMiddleware');

const router = Router();

router.get('/get', verifyToken, getNotes);
router.post('/add', verifyToken, createNote);
router.put('/:id', verifyToken, updateNote);
router.delete('/:id', verifyToken, deleteNote);

module.exports = router;

