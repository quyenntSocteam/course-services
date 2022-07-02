const express = require('express');
const router = express.Router();

const ratingController = require('../../app/controllers/rating/RatingController')

router.post('/api/updatelike/:id', ratingController.updateLikeCourseRating)
router.post('/api/updateunlike/:id', ratingController.updateUnlikeCourseRating)
router.post('/api/updateratingstar/:id&:numberStar', ratingController.updateRateStarCourseRating)

module.exports = router;
