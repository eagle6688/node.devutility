var fs = require('fs');

fs.readdir('../../', function(err, data){
	for(var i in data){
		var dir = '../../' + data[i];
		var stats = fs.statSync(dir);
		
		if(stats.isFile()){
			console.log(dir.concat(' is a file.'));
		}
		else if(stats.isDirectory()){
			console.log(dir + ' is a directory.');
			console.log(fs.readdirSync(dir));
		}
	}
});