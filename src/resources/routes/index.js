const newsRouter = require('./news');
const siteRouter = require('./site');


function route(app){


    app.use('/news',newsRouter);
   
    app.use('/',siteRouter);


    // app.get('/', (req, res) => {
    //     console.log(req.query.q);
    //     res.render('search');
    //   })
    //   app.get('/search', (req, res) => {
    //     res.render('search');
    //   })
      
    //   app.post('/search',(req,res)=>{
    //     console.log(req.body);
    //     res.send('');
    //   })
      
}

module.exports = route;