const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;


let dataDefault = {

}

const Rating = new Schema(
    {
        course_id: {type: String, required: true},
        view: { type: Number, required: true },
        liked: { type: Number, required: true},
        unliked: { type: Number, required: true},
        rating: {
            1: {type: Number},
            2: {type: Number},
            3: {type: Number},
            4: {type: Number},
            5: {type: Number},
        }
    },
);

module.exports = mongoose.model('Rating', Rating);
