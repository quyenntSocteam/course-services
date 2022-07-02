const coursesRouter = require('./course/courses');
const categoryCoursesRouter = require('./category/category');
const accountCoursesRouter = require('./account/account');
const newsRouter = require('./new/news');
const ratingRouter = require('./rating/rating');


function route(app) {
    app.use('/courses', coursesRouter);
    app.use('/category', categoryCoursesRouter);
    app.use('/account', accountCoursesRouter);
    app.use('/news', newsRouter);
    app.use('/rating', ratingRouter);
}

module.exports = route;
