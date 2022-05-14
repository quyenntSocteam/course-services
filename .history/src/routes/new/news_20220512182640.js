const express = require('express');
const router = express.Router();

const newController = require('../../app/controllers/news/NewsController');


router.get('/api/getallnew', newController.getAllNew);
router.post('/api/createNew', newController.createNew);


module.exports = router;