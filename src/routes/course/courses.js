const express = require('express');
const router = express.Router();

const courseController = require('../../app/controllers/course/CourseController');

router.get('/api/getallcourse', courseController.getAllCourse);
router.get('/api/getcoursebyid/:id', courseController.getCourseByID);
router.post('/api/popupnewcourse/:userid', courseController.popupNewCourse);
router.post('/api/createCourse', courseController.createCourse);
router.post('/api/sendemail', courseController.sendEmail);
router.post('/api/createMultiCourse', courseController.createMultiCourse);
router.get('/api/filters/cate_url=:id', courseController.filterCourse);
router.post('/api/deletecoursebyid/:id', courseController.deleteCoursebyId);
router.get('/api/search', courseController.searchCourse);
router.post('/api/updatecoursebyid/:id', courseController.updateCoursebyId);
router.get('/:id/edit', courseController.edit);
router.post('/handle-form-action-trash', courseController.handleFormActionTrash);
router.post('/handle-form-actions', courseController.handleFormAction);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.destroy);
router.delete('/:id/force', courseController.forceDestroy);

module.exports = router;
