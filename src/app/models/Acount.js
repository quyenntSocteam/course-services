const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const emailValidator = require('email-validator');

const Schema = mongoose.Schema;


let data_default = {
    _id: 1,
    username: 'Thanh Quyen',
    type: ['email', 'phone'],
    email: 'thanh-quyen@gmail.com',
    phone: '1222131212',
    birthday: '22/08/1999',
    gender: 'male',
    active: true,
    password: '2131j2hdjdwq90992',
}

const Account = new Schema(
    {
        username: { type: String, required: true },
        type: { type: Array, required: true },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: { unique: true },
            validate: {
                validator: emailValidator.validate,
                message: props => `${props.value} is not a valid email address!`,
            },
        },
        phone: { type: Number, unique: true },
        birthday: { type: Date, required: true },
        gender: { type: String },
        active: { type: Boolean, required: true },
        password: {
            type: String,
            required: true,
            trim: true,
            index: { unique: true },
            minlength: 8,
        },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
Account.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('account', Account);
