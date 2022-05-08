const coursesRouter = require('./course/courses');
const categoryCoursesRouter = require('./category/category');
const accountCoursesRouter = require('./account/account');
const newCoursesRouter = require('./new/news');


function route(app) {
    app.use('/courses', coursesRouter);
    app.use('/category', categoryCoursesRouter);
    app.use('/account', accountCoursesRouter);
    app.use('/news', newCoursesRouter);
}

module.exports = route;
