const mongoose = require('mongoose');

const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    age: {
        type: String,
        required: true
    },
    role: {
        type: Number, //0->admin, 1->doctor, 2->patient
        required: true,
        default: 2
    },
    privateKey: {
        type: String,
        required: true
    },
    mnemonic: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('users', userSchema)