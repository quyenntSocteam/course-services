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

    // update like rating
    static async updateLikeCourseRating(course_id) {
        return Rating.updateOne({course_id: course_id},{ $inc: { liked: 1} })
    }

    // update unlike rating
    static async updateUnlikeCourseRating(course_id) {
        return Rating.updateOne({course_id: course_id},{ $inc: { unliked: 1} })
    }    

    //update star rating
    static async updateStarCourseRating(course_id, numberStar) {
        switch (numberStar) {
            case 1:
                return Rating.updateOne({course_id: course_id},{ $inc: {"rating.1": 1} });
            case 2:
                return Rating.updateOne({course_id: course_id},{ $inc: {"rating.2": 1} });
            case 3:
                return Rating.updateOne({course_id: course_id},{ $inc: {"rating.3": 1} });
            case 4:
                return Rating.updateOne({course_id: course_id},{ $inc: {"rating.4": 1} });
            case 5:
                return Rating.updateOne({course_id: course_id},{ $inc: {"rating.5": 1} });
        }
    }

}

module.exports = RatingService;