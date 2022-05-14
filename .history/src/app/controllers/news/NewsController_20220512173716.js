const New = require('../../models/New');
const { mongooseToObject } = require('../../../until/mongoose');

class NewsController {
    //[GET] /news/api/getallnew
    getAllNew(req, res, next) {
        New.find({})
        .then((news) =>
            res.json({
                data: news,
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

    // [POST] /news/api/createNew
    createNew(req, res, next) {
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.json({
                message: 'Course saved successfully',
                isSuccess: true,
            }))
            .catch((error) => {
                res.json({
                    message: error,
                    isSuccess: false,
                })
            })
    }  
}

module.exports = new NewsController();