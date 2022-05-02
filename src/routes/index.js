const coursesRouter = require('./course/courses');


function route(app) {
    app.use('/courses', coursesRouter);
}

module.exports = route;
