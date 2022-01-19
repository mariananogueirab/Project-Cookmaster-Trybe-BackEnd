const express = require('express');
const { userCreate } = require('../controllers/users.controller');

const router = express.Router();

router.post('/', userCreate);

module.exports = router;