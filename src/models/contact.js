const { Schema, model } = require('mongoose');

const contactSchema = new Schema(
{
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
    },
    message: {
        type: String,
    }
},
{
    timestamps: true,
    versionKey: false,
}
);

module.exports = model('Contact', contactSchema);