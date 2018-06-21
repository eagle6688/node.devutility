const Builder = require("../index");

let config = {
    resources: {
        styles: [
            'resources/styles/bootstrap.min.css',
            'resources/styles/bootstrap-theme.min.css'
        ],
        scripts: [
            'resources/scripts/jquery.min.js',
            'resources/scripts/bootstrap.min.js',
            'resources/scripts/vue.min.js'
        ]
    },
    server: {
        router: function (app) {
            app.get('/', function (request, response, next) {
                response.redirect('/index');
            });

            app.get('/login', function (request, response, next) {
                let data = {};
                data.requireAuth = false;
                response.render("pages/login/index", data);
            });

            app.get('/index', function (request, response, next) {
                let data = {};
                data.requireAuth = true;
                response.render("pages/index/index", data);
            });

            // Catch api and 404 request.
            app.use(function (request, response, next) {
                var error = new Error('Not Found');
                error.status = 404;
                next(error);
            });

            // Error handler
            app.use(function (err, req, res, next) {
                console.log("express error: ", err);
                res.status(err.status || 500);
                res.render('error', { title: 'Not Found', layout: false });
            });
        }
    }
};

let builder = Builder(config);
builder.build_fonts();
builder.build_images();
builder.build_scriptLib();
builder.build_sass();
builder.build_ts();
builder.start();