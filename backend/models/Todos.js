const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
    }
}, { timestamps: true });

module.exports = mongoose.model('todos', TodoSchema);