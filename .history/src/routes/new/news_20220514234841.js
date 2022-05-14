const express = require('express');
const router = express.Router();

const newController = require('../../app/controllers/news/NewsController');


router.get('/api/getallnew', newController.getAllNew);
router.get('/api/getnewbyid/:id', newController.getNewByID);
router.post('/api/createNew', newController.createNew);
router.post('/api/createMultiNew', newController.createMultiNew);
router.get('/api/filters/cate_url=:topicid', newController.filterNew);
router.delete('/api/deletenewbyid/:id?_method=DELETE', newController.deleteNewbyId);


module.exports = router;