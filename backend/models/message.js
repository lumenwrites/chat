/* Mongoose is ORM, like models.py in django */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define model. 
const messageSchema = new Schema({
    author: {
	type: String,
	unique: false,
	required: true,	
	lowercase: true
    },
    body: {
	type: String,
	required: true,
	minlength: 1,
	trim: true
    },
    channel: {
	type: String
    },
    createdAt: {
	type: Number,
	default: null
    }
});


// Create model class
const ModelClass = mongoose.model('message', messageSchema);

// Export model
module.exports = ModelClass;
