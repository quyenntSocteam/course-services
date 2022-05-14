require('dotenv').config()
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const hbtdate = require('handlebars-helper-formatdate')
const hbs = require('hbs');
const moment = require('moment');

const SortMiddleware = require('./app/middlewares/SortMiddleware')

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();


const app = express();
const port = 3131;

// Use static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);


app.use(express.json());


app.use(methodOverride('X-HTTP-Method-Override'))

var xhr = new XMLHttpRequest()
xhr.open('post', '/resource', true)
xhr.setRequestHeader('X-HTTP-Method-Override', 'DELETE')


// custom middlewares
app.use(SortMiddleware)

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            dateFormat(datetime, format) {
                var DateFormats = {
                    short: "DD MMMM - YYYY",
                    long: "dddd DD.MM.YYYY HH:mm"
             };
             if (moment) {
                // can use other formats like 'lll' too
                format = DateFormats[format] || format;
                return moment(datetime).format(format);
              }
              else {
                return datetime;
              }
            },
            sortTable(field, sort) {
             const sortType = field === sort.column 
                              ? sort.type : 'default'
             const icons = {
                 default: 'oi oi-elevator',
                 asc: 'oi oi-sort-ascending',
                 desc: 'oi oi-sort-descending'
             }
             const types = {
                 default: 'desc',
                 asc: 'desc',
                 desc: 'asc'
             }
             const icon = icons[sortType]
             const type = types[sortType]
             return `<a id="sort" href="?_sort&column=${field}&type=${type}">
                       <span class="${icon}"></span>
                     </a>`
            }
        },
    })
);

app.set('view engine', 'hbs');

hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
