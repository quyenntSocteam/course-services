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

    //[GET] /news/api/getnewbyid/:id
    getNewByID(req, res, next) {
        New.findOne({ _id: req.params.id})
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
        const news = new New(req.body);
        news
            .save()
            .then(() => res.json({
                message: 'New saved successfully',
                isSuccess: true,
            }))
            .catch((error) => {
                res.json({
                    message: error,
                    isSuccess: false,
                })
            })
    }

    //[DELETE] /news/api//deletenewbyid/:id

    deleteNewbyId(req, res, next) {
        try {
            New.findByIdAndDelete({ _id: req.params.id })
                .then(() => {
                    res.json({
                        meassage: 'removed new isSuccess',
                        isSuccess: true
                    })
                }).catch(err => {
                    res.json({ message: err.message })
                })
        } catch (err) {
            res.json({ message: err.message })
        }
    }
}

module.exports = new NewsController();