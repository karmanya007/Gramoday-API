const express = require('express');
const reportController = require('./../controllers/reportController')

const router = express.Router();

router.post('/',reportController.test);
router.get('/',reportController.test);

module.exports = router;