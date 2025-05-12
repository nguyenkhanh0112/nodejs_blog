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
        req.body.img = `https://img.youtube.com/vi/${req.body.videoId}/maxresdefault.jpg`
        const course = new Course(req.body)
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }


    //get course/:id/edit
    edit(req,res,next){
        Course.findById(req.params.id)
        .then(course => res.render('courses/edit',{
            course: mongooseToObject(course)}))
        .catch(next)
    }

    // put /khoa-hoc/:id
    update(req,res,next){
         Course.updateOne({_id:req.params.id},req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // delete/khoa-hoc:id
    destroy(req,res,next){
        Course.delete({_id:req.params.id})
            .then(()=> res.redirect('/me/stored/courses'))
            .catch(next);
    }
       // delete/khoa-hoc:id/force
      forceDestroy(req,res,next){
        Course.deleteOne({_id:req.params.id})
            .then(()=> res.redirect('/me/trash/courses'))
            .catch(next);
    }
    // patch/khoa-hoc/:id/restore
    restore(req,res,next){
        Course.restore({_id:req.params.id})
            .then(()=> res.redirect('/me/trash/courses'))
            .catch(next);

    }
    // post /courses/handle-form-actions
    handleFormActions(req,res,next){
        switch(req.body.action){
            case 'delete':
                Course.delete({_id:{$in: req.body.courseIds}})
                    .then(()=> res.redirect('/me/stored/courses'))
                    .catch(next);
                    break;
            default:
                res.json({message:'action is invalid'})
        }
    }
}
module.exports = new courseController;