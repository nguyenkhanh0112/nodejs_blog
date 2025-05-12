const Course = require('../models/Course');
const {multipleMongooseObjectToObject} = require('../../util/mongoose')
class MeController {
    //[Get] me/stored/courses
    storedCourses(req,res,next){
        Promise.all([
            Course.find({}).sortable(req),
            Course.countDocumentsWithDeleted({deleted:true})])
            .then(([courses,deletedCounter])=>{
                courses = multipleMongooseObjectToObject(courses)
                res.render('me/stored-courses',{courses,deletedCounter})
            })
            .catch(next);
    }
   
    //[Get] me/trash/courses
    trashCourses(req,res,next){
        Course.findWithDeleted({deleted:true}) 
            .then(courses =>{
                courses = multipleMongooseObjectToObject(courses)
                res.render('me/trash-courses',{courses})
            })
            .catch(next)
        }
}

module.exports = new MeController();
