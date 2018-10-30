var http = require('http');

var app = http.createServer(function (req, res) {
    var sreq = http.request({
        host: '10.100.97.64',
        path: '/annotation/produces',
        method: req.method
    }, function (sres) {
        sres.pipe(res);

        sres.on('end', function () {
            console.log('done');
        });
    });

    if (/POST|PUT/i.test(req.method)) {
        req.pipe(sreq);
    }
    else {
        sreq.end();
    }
});

app.listen(3001);
console.log('server started on 127.0.0.1:3001');