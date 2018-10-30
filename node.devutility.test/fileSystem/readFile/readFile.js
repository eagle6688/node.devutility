var fs = require('fs');

fs.readFile('Index.cshtml', 'utf-8', function(err, data){
	console.log(data);
	console.log(getLayout(data));
});

var getLayout = function (content) {
    var regExp = /\bLayout\b\s=\s"[^"]+\/(\w+).cshtml"/g;
    var array = regExp.exec(content);

    if (array && array.length > 1) {
        return array[1];
    }

    return null;
};