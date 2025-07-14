const express = require('express');
const { signup, login, userLoginStatus } = require('../controllers/user');
const loggedinUsersOnly = require('../middlewares/loggedinUsersOnly');
const router = express.Router();

router.post('/register',signup);
router.post('/login', login);
router.get('/login-status',loggedinUsersOnly, userLoginStatus );

module.exports = router;