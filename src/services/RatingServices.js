const Rating = require('../app/models/Rating');

class RatingService {

    // create a course rating
    static async createCourseRating(course_id) {
        const rating = new Rating();
        rating.course_id = course_id;
        rating.view = 0;
        rating.liked = 0;
        rating.unliked = 0;
        rating.rating[1] = 0;
        rating.rating[2] = 0;
        rating.rating[3] = 0;
        rating.rating[4] = 0;
        rating.rating[5] = 0;
        const savedRating = await rating.save();
        console.log(course_id);
        return savedRating;
    }

    // update view rating
    static async updateViewCourseRating(course_id) {
       return Rating.updateOne({course_id: course_id},{ $inc: { view: 1} })
    }
}

module.exports = RatingService;