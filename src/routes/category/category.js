const express = require('express');
const router = express.Router();

const categoryController = require('../../app/controllers/category/CategoryController');

router.get('/api/create', categoryController.createCategory);
router.get('/api/getallcategory', categoryController.getAllCategory);


module.exports = router;