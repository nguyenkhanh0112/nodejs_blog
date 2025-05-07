const express = require('express')
const app = express()
const morgan = require('morgan')
const port = 3000
const handlebars = require('express-handlebars')
const path = require('path')
const sass = require('sass');
// const result = sass.compile(scssFilename);


app.use(express.static(path.join(__dirname,'public')))

//http logger route
app.use(morgan('combined'))


// template engine
app.engine('hbs',handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'resources/views'));
app.get('/', (req, res) => {
  res.render('news');
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
