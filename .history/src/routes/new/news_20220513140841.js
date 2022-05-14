const express = require('express');
const router = express.Router();

const newController = require('../../app/controllers/news/NewsController');


router.get('/api/getallnew', newController.getAllNew);
router.get('/api/getnewbyid/:id', newController.getNewByID);
router.post('/api/createNew', newController.createNew);
router.post('/api/deletenewbyid/:id', newController.deleteNewbyId);

module.exports = router;