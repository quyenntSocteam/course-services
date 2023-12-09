const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const emailValidator = require('email-validator');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

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
        username: {
            type: String,
            required: true,
            trim: true,
            index: { unique: true },
            minlength: 6,
        },
        type: { type: Array },
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
        birthday: { type: Date },
        gender: { type: String },
        active: { type: Boolean, default: false },
        password: {
            type: String,
            required: true,
            trim: true,
            index: { unique: true },
            minlength: 8,
        },
        verified: { type: Boolean, default: false },
        verificationToken: {
            type: String,
            required: true,
            index: true,
            unique: true,
            default: () => crypto.randomBytes(20).toString('hex'),
        },
        oauthprofiles: [
            {
                provider: { type: String },
                profileId: { type: String },
            },
        ],
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

Account.index({
    'oauthprofiles.provider': 1,
    'oauthprofiles.profileId': 1,
});

async function generateHash(password) {
    return bcrypt.hash(password, 12);
}

Account.pre('save', function preSave(next) {
    const user = this;
    if (user.isModified('password')) {
        return generateHash(user.password)
            .then((hash) => {
                user.password = hash;
                return next();
            })
            .catch((error) => {
                return next(error);
            });
    }
    return next();
});

Account.methods.comparePassword = async function comparePassword(
    candidatePassword
) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('account', Account);
