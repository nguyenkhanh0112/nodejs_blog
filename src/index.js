const express = require('express')
const app = express()
const morgan = require('morgan')
const port = 3000
const handlebars = require('express-handlebars')
const path = require('path')

const route = require('./resources/routes')
const dbmongo = require('./config/db');
const methodOverride = require('method-override')
const SortMiddleware = require('./resources/app/middlewares/SortMiddleware')
const { applyTimestamps } = require('./resources/app/models/Course')
// Connect to DB
dbmongo.connect();

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(SortMiddleware);
//http logger route
// app.use(morgan('combined'))


// template engine
app.engine('hbs',handlebars.engine({
    extname: '.hbs',
    helpers: require('./helpres/handlebars')
  }));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'resources','views'));

// route init
route(app);


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
