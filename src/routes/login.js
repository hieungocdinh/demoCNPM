const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');

router.post('/register', loginController.register);
router.post('/check', loginController.check);
router.get('/', loginController.index);

module.exports = router;