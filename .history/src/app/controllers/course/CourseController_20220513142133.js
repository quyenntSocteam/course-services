const Course = require('../../models/Course');
const { mongooseToObject } = require('../../../until/mongoose');

class CourseController {
    // [GET] /courses/api/getallcourse
    getAllCourse(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.json({
                    data: courses,
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

    // [GET] /courses/api/getcoursebyid/:id
    getCourseByID(req, res, next) {
        Course.findOne({
            _id: req.params.id
        })
            .then((courses) =>
                res.json({
                    data: courses
                })
            )
            .catch((error) => {
                res.json({
                    message: error,
                    isSuccess: false,
                })
            });
    }

    // [POST] /courses/api/createCourse
    createCourse(req, res, next) {
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

    // [POST] /courses/api/createMultiCourse
    createMultiCourse(req, res, next) {
        let multiCourse = req.body
        multiCourse.map((item) => {
            const course = new Course(item);
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
        })
    }

    // [GET] /courses/api/filters/cate_url=:id 
    filterCourse(req, res, next) {
        Course.find({ cate_id: req.params.id })
            .then(() => res.json({
                message: 'Course saved successfully',
                isSuccess: true,
            }))
            .catch((error) => {
                res.json({
                    message: error,
                    isSuccess: false,
                })
            });
    }

    // [GET] /courses/api/search?name=text
    async searchCourse(req, res, next) {
        const { name } = req.query;
        const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
        const searchRgx = rgx(name);

        await Course.find({
            $or: [
                { name: { $regex: searchRgx, $options: "i" } },
            ],
        })
            .limit(5)
            .setOptions({ sanitizeFilter: true })
            .then((courses) => {
                if (!Array.isArray(courses) || !courses.length) {
                    res.json({
                        data: 'isEmpty',
                        isSuccess: true,
                    })
                } else {
                    res.json({
                        data: courses,
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


    // [POST] courses/api/deletecoursebyid/:id
    deleteCoursebyId(req, res, next) {
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

    // [PATCH] courses/api/updatecoursebyid/:id
    updateCoursebyId(req, res, next) {
        Course.findByIdAndUpdate(req.params.id, {
            $set: {
                active: false,
            }
        }).then(() => res.json({
            message: "edit is successfully",
            isSuccess: true
        })).catch(err => res.json({
            message: err.message
        }))
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /courses/handle-form-actions
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.course_id } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ meassage: "Action is invalid" })

        }
    }
    // [POST] /courses/handle-form-action-trash
    handleFormActionTrash(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                Course.restore({ _id: { $in: req.body.course_id } })
                    .then(() => res.redirect('back'))
                    .catch(next);
            case 'forcedelete':
                Course.deleteMany({ _id: { $in: req.body.course_id } })
                    .then(() => res.redirect('back'))
                    .catch(console.log('Eror'));
                break;
            default:
                res.json({ meassage: "Action is invalid" })

        }
    }
}

module.exports = new CourseController();
