const New = require('../../models/New');
const { mongooseToObject } = require('../../../until/mongoose');

class NewsController {
    //[GET] /news/api/getallnew
    getAllNew(req, res, next) {
        New.find({})
        .then((new) =>
            res.json({
                data: new,
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
}

module.exports = new NewsController();