const { Router } = require('express');
const { googleLogin, googleCallback, register, login, verifyUser } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

const router = Router();

router.get('/google/login', googleLogin);
router.get('/google/callback', googleCallback);
router.post('/register', register);
router.post('/login', login);
router.get('/verify', verifyToken, verifyUser);

module.exports = router;
