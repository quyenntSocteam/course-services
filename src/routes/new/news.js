const express = require('express');
const router = express.Router();

const newController = require('../../app/controllers/news/NewsController');


router.get('/api/getallnew', newController.getAllNew);
router.get('/api/getnewbyid/:id', newController.getNewByID);
router.post('/api/createnew', newController.createNew);
router.post('/api/createmultinew', newController.createMultiNew);
router.get('/api/search', newController.searchNew);
router.get('/api/filters/cate_url=:topicid', newController.filterNew);
router.post('/api/deletenewbyid/:id', newController.deleteNewbyId);
router.post('/api/updatenewbyid/:id', newController.updateNewbyId);


module.exports = router;