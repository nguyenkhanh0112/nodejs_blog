const Course = require('../models/Course');
const {multipleMongooseObjectToObject} = require('../../util/mongoose')
class SiteController {
    //Get /
    index(req,res,next){
      Course.find({})
        .then(courses => {
          courses = multipleMongooseObjectToObject(courses);
          res.render('home', { courses });
        })
        .catch(next)
    }
      

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
