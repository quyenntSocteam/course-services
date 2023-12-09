const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

let dataDefaul = {
    cate_id: 1,
    categoryName: 'Technology',
    description: 'Get all course advance has topic related about tech',
    active: true,
}

const CategoryCourse = new Schema(
    {
        cate_id : {type: Number},
        categoryName: { type: String},
        description: { type: String },
        active: { type: Boolean },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
CategoryCourse.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('category', CategoryCourse);
