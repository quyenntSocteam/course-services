const coursesRouter = require('./course/courses');
const categoryCoursesRouter = require('./category/category');
const accountCoursesRouter = require('./account/account');


function route(app) {
    app.use('/courses', coursesRouter);
    app.use('/category', categoryCoursesRouter);
    app.use('/account', accountCoursesRouter);
}

module.exports = route;
