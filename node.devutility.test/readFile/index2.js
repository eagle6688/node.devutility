var fs = require('fs');

fs.readFile('input.txt2', function (err, data) {
    if (err) {
		console.error(err.stack);
		return;
	}
	
    console.log(data.toString());
});

console.log('运行结束!');