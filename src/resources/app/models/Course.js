const  mongoose  = require('mongoose');
const slug = require('mongoose-slug-generator');

/**
 * Represents the Mongoose Schema object used to define the structure of documents
 * within a MongoDB collection.
 */

mongoose.plugin(slug);

const Schema = mongoose.Schema;
const Course = new Schema({
    name: {type: String,required: true},
    description: {type: String},
    img: {type: String,required: true},
    videoId:{type:String},
    level: {type: String},
    slug:{type:String,slug:'name',unique: true}
});

module.exports =  mongoose.model('Course', Course);