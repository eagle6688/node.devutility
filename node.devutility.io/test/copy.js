const utilities = require("../index");

//Directory to directory
utilities.copy("resources/source", "resources/dest1");

//File to directory
utilities.copy("resources/source/asd/456.js", "resources/dest2");

//File to file
utilities.copy("resources/source/asd/456.js", "resources/dest3/789.js");

//Directory to file, error!
utilities.copy("resources/source", "resources/dest4/789.js");