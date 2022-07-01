const Rating = require('../../models/Rating')
const Course = require('../../models/Course')

class RatingController {

    // [POST] rating/api/updatelike/:id
    updateLikeCourseRating(req, res, next) {
        Promise.all([
            Course.findOne({_id: req.params.id}),
            Rating.updateOne({course_id: req.params.id},{ $inc: { liked: 1} })
        ])
            .then(() => res.json({
                message: 'Update rating like successfully',
                isSuccess: true,
            }))
            .catch((error) => {
                res.json({
                    message: error,
                    isSuccess: false,
                })
            });

    }

    // [POST] rating/api/updateunlike/:id
    updateUnlikeCourseRating(req, res, next) {
        Promise.all([
            Course.findOne({_id: req.params.id}),
            Rating.updateOne({course_id: req.params.id},{ $inc: { unliked: 1} })
        ])
            .then(() =>
                res.json({
                    message: 'Updated rating unlike successfully',
                    isSuccess: true,
                })
            )
            .catch((error) => {
                res.json({
                    message: error,
                    isSuccess: false,
                })
            });
    }    

    // [POST] rating/api/updateratingstar/:id&:starNumber
    updateRateStarCourseRating(req, res, next) {
        const ratingStar = [
            {"rating.1": 1},
            {"rating.2": 1},
            {"rating.3": 1},
            {"rating.4": 1},
            {"rating.5": 1}
        ]
        Promise.all([
            Course.findOne({_id: req.params.id}),
            Rating.updateOne({course_id: req.params.id, },{ $inc: ratingStar[req.params.numberStar - 1] })
        ])
            .then(() => res.json({
                    message: 'Updated rating star successfully',
                    isSuccess: true,
                }))
            .catch((error) => {
                res.json({
                    message: error,
                    isSuccess: false,
                })
            });
        }
}

module.exports = new RatingController();