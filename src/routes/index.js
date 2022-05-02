const coursesRouter = require('./course/courses');
const categoryCoursesRouter = require('./category/category');


function route(app) {
    app.use('/courses', coursesRouter);
    app.use('/category', categoryCoursesRouter);
}

module.exports = route;
