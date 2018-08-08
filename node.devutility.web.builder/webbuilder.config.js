module.exports = {
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
    copy: [
        {
            source: "resources/styles",
            target: "dist/copy"
        }
    ],
    webpack: {
        mode: "development"
    },
    server: {
        router: function (app, helper) {
            app.get('/', function (request, response, next) {
                console.log(request.url);
                response.redirect('/index');
            });

            app.get('/login', function (request, response, next) {
                let data = helper.getPageData("login");
                data.requireAuth = false;
                response.render("pages/login/index", data);
            });

            app.get('/index', function (request, response, next) {
                let data = helper.getPageData("index");
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