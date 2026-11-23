const express = require('express');
const { registerUser, getMe, userLogin } = require('../controllers/userContoller');
const protect = require('../middlewares/authMiddleware')
const router = express.Router();


router.route('/').post(registerUser);
router.route('/login').post(userLogin);
router.get('/me', protect, getMe);

module.exports = router;