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

    // [POST] /news/api/createmultinew
    createMultiNew(req, res, next) {
        let multiNew = req.body
        multiNew.map((item) => {
            const news = new New(item);
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
        })
    }

    // [GET] /news/api/filters/cate_url=:topicid
    filterNew(req, res, next) {
        New.find({ topic_id: req.params.topicid })
            .then((news) => res.json({
                data: news,
                isSuccess: true,
            }))
            .catch((error) => {
                res.json({
                    message: error,
                    isSuccess: false,
                })
            });
    }

    // [GET] /news/api/search?title=text
    async searchNew(req, res, next) {
        const { title } = req.query;
        const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
        const searchRgx = rgx(title);

        await New.find({
            $or: [
                { newTitle: { $regex: searchRgx, $options: "i" } },
            ],
        })
            .limit(5)
            .setOptions({ sanitizeFilter: true })
            .then((news) => {
                if (!Array.isArray(news) || !news.length) {
                    res.json({
                        data: 'isEmpty',
                        isSuccess: true,
                    })
                } else {
                    res.json({
                        data: news,
                        isSuccess: true,
                    })
                }
            }
            )
            .catch((error) => {
                res.json({
                    message: error,
                    isSuccess: false,
                })
            });
    }

    // [POST] news/api/deletenewbyid/:id
    deleteNewbyId(req, res, next) {
        try {
            New.findByIdAndDelete({ _id: req.params.id })
                .then(() => {
                    res.json({
                        meassage: 'Removed new isSuccess',
                        isSuccess: true
                    })
                }).catch(err => {
                    res.json({ message: err.message })
                })
        } catch (err) {
            res.json({ message: err.message })
        }
    }

    // [POST] news/api/updatenewbyid/:id
    updateNewbyId(req, res, next) {
        New.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.json({
            message: 'Updated new successfully',
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