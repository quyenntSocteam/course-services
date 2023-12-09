const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;


let dataDefaul = {
    _id: 12,
    user_id: 1,
    courses: {
        course_detail: [
        {
            course_id: 12,
            nameCourse: "NestJS",
            description: "How to learn about NestJS?",
            image: "image/nestjs",
            videoId: 'ieqw222',
            level: 'advanced',
            slug: "nestjs-1",
        },
        {
            course_id: 13,
            nameCourse: "NestJS",
            description: "How to learn about NestJS?",
            image: "image/nestjs",
            videoId: 'ieqw222',
            level: 'advanced',
            slug: "nestjs-1",
        }
     ]
    },
    notifications: [
        {
            course_id: 12,
            nameCourse: "NestJS",
            description: "How to learn about NestJS?",
            image: "image/nestjs",
            videoId: 'ieqw222',
            level: 'advanced',
            slug: "nestjs-1",
            sendemail: true,
        },
    ],
    active: true,
}