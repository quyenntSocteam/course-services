const Course = require('../../models/Course');
const { mongooseToObject } = require('../../../until/mongoose');

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) =>
                res.json('text 2')
            )
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        Course.find({})
            .then((course) =>
                res.json(course)
            )
            .catch(next);
    }

    // [POST] /courses/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch((error) => {});
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
       switch(req.body.action) {
           case 'delete':
            Course.delete({ _id: { $in: req.body.course_id } })
            .then(() => res.redirect('back'))
            .catch(next);
            break;
           default:
               res.json({meassage: "Action is invalid"})
            
       }
    }
    // [POST] /courses/handle-form-action-trash
    handleFormActionTrash(req, res, next) {
        switch(req.body.action) {
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
                res.json({meassage: "Action is invalid"})
             
        }
    }
}

module.exports = new CourseController();
