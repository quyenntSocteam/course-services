const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

let dataDefaul = {
    _id: 1,
    newTitle: "Learning NestJS for build success your in the future",
    description: "How to learn about NestJS?",
    imageCover: "https://github.com/",
    position: 1,
    active: true,
    createdDate: '01-01-2022',
    userId: 12312,
    userIdApprove: 31231,
}

const New = new Schema(
    {
        newTitle: { type: String, required: true },
        description:  { type: String, required: true },
        imageCover:  { type: String, required: true },
        position: { type: Number, required: true },
        active: { type: Boolean, required: true},
        userId: { type: Number, required: true},
        userIdApprove: { type: Number, required: true},
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
New.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('new', New);
