/**
 * Initialize express app.
 */
const express = require('express');

const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const config = require('../config');
const router = require('./router');

// Create an express object.
let app = express();
app.set('port', config.port);

// Handle cookie
app.use(cookieParser());

// Handle application/json
app.use(bodyParser.json());

// Handle application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Set view path.
app.set('views', config.viewsPath());

// Set view engine.
app.set('view engine', 'hbs');

hbs.registerPartials(config.partialsPath());
app.engine('hbs', hbs.__express);

// Set favicon.
app.use(favicon(config.faviconPath()));

// Static resources.
app.use(express.static(config.staticPath()));

// Register router.
router.register(app);
module.exports = app;