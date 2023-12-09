const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const category = {
    technology: 1,
    food: 2,
    music: 3,
    movie: 4,
    football: 5,
}

let dataDefault = {
    _id: 12,
    name: "NestJS",
    cate_id: category.technology,
    description: "How to learn about NestJS?",
    image: "image/nestjs",
    videoId: 'ieqw222',
    level: 'advanced',
    slug: "nestjs-1",
    active: true,
    email_marketing: true,
}

const Course = new Schema(
    {
        name: { type: String, required: true },
        cate_id: { type: Number, required: true },
        description: { type: String },
        image: { type: String },
        videoId: { type: String, required: true },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        active: { type: Boolean, required: true},
        email_marketing: { type: Boolean, required: true},
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
