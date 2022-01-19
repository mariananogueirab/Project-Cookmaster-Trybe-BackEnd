const express = require('express');
const { userCreate, admin } = require('../controllers/users.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', userCreate);
router.post('/admin', auth, admin);

module.exports = router;