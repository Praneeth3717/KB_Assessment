const { Router } = require('express');
const { googleLogin, googleCallback, register, login, verifyUser,logout } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

const router = Router();

router.get('/google/login', googleLogin);
router.get('/google/callback', googleCallback);
router.post('/register', register);
router.post('/login', login);
router.get('/verify', verifyToken, verifyUser);
router.post('/logout', logout);

module.exports = router;
