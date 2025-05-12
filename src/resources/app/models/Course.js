const  mongoose  = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose); // Import p
/**
 * Represents the Mongoose Schema object used to define the structure of documents
 * within a MongoDB collection.
 */


const Schema = mongoose.Schema;
const courseSchema = new Schema({
    _id:{type: Number},
    name: { type: String, maxlength: 255, required: true },
    description: { type: String },
    img: { type: String, required: true },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, slug: 'name', unique: true }  // Tạo slug từ 'name'
  },
  {
    _id: false,
     timestamps: true, 
  });
// custom query helpers
courseSchema.query.sortable = function(req){
 if (Object.prototype.hasOwnProperty.call(req.query, '_sort')) {
    const isValidtype = ['asc','desc'].includes(req.query.type);
    return this.sort({[req.query.column]:isValidtype ? req.query.type: 'desc'});
  }  
 return  this;       
}




// add plugins
mongoose.plugin(slug);
courseSchema.plugin(AutoIncrement)
courseSchema.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all' 
});
module.exports =  mongoose.model('Course', courseSchema);