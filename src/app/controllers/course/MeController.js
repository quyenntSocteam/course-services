const Course = require('../../models/Course');
const { mutipleMongooseToObject } = require('../../../util/mongoose');
const moment = require('moment');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({}); 
        // sort courses
        if(res.locals._sort.enabled) {
            courseQuery = courseQuery.sort({
                [res.locals._sort.column] : res.locals._sort.type
            })
        }
        // get all list course
        Promise.all([
            courseQuery,
            Course.countDocumentsDeleted()
        ])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                },),
            )
            .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
