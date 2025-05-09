const Course = require('../models/Course');
const {mongooseToObject} = require('../../util/mongoose')

class courseController{
    show(req,res,next){
        Course.findOne({slug: req.params.slug})
            .then((course)=>{
                course = mongooseToObject(course)
                res.render('courses/show',{course})
            })
            .catch(next)
    }
    create(req,res,next){
        res.render('courses/create')
    }
    // [POST] /courses/store
    store(req,res,next){
        const formData =  req.body
        formData.img = `https://img.youtube.com/vi/${req.body.videoId}/maxresdefault.jpg`
        const course = new Course(formData)
        course.save()
            .then(() => res.redirect('/'))
            .catch(erro=>{

            })
        
    }
}
module.exports = new courseController;