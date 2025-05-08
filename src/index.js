const express = require('express')
const app = express()
const morgan = require('morgan')
const port = 3000
const handlebars = require('express-handlebars')
const path = require('path')

const route = require('./resources/routes')


app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

//http logger route
// app.use(morgan('combined'))


// template engine
app.engine('hbs',handlebars.engine({
  extname: '.hbs'
  }));
app.set('view engine', 'hbs');
    app.set('views',path.join(__dirname,'resources/views'));

// route init
      route(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
