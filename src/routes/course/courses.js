const express = require('express');
const router = express.Router();

const courseController = require('../../app/controllers/course/CourseController');


router.get('/api/getallcourse', courseController.getAllCourse);
router.get('/api/getcoursebyid/:id', courseController.getCourseByID);
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.post('/handle-form-action-trash', courseController.handleFormActionTrash);
router.post('/handle-form-actions', courseController.handleFormAction);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.destroy);
router.delete('/:id/force', courseController.forceDestroy);

module.exports = router;
