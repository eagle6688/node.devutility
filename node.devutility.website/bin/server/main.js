/**
 * Initialize express app.
 */
let path = require('path');
let express = require('express');

let hbs = require('hbs');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let favicon = require('serve-favicon');

let projectDirectory = process.cwd();
let config = require('../config');
let router = require('./router');

// Create an express object.
let app = express();
app.set('port', config.port);

// Set view path.
let viewsPath = path.join(projectDirectory, config.directory.views);
app.set('views', viewsPath);

// Set view engine.
app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);

// register moudle 
hbs.registerPartials(projectDirectory + '/views/partials');

// uncomment after placing your favicon in /dist
app.use(favicon(path.join(projectDirectory, 'dist/images', 'favicon.ico')));

// Static resources.
app.use(express.static(path.join(projectDirectory, 'dist')));

// Handle cookie.
app.use(cookieParser());

// Handle application/json
app.use(bodyParser.json());

// Handle application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Register router.
router.register(app);

module.exports = app;