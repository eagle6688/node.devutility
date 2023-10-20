import { IOUtilities } from "../index.js";

//Directory to directory
IOUtilities.copy("resources/source", "resources/dest1");

//File to directory
IOUtilities.copy("resources/source/asd/456.js", "resources/dest2");

//File to file
IOUtilities.copy("resources/source/asd/456.js", "resources/dest3/789.js");

//Directory to file, error!
IOUtilities.copy("resources/source", "resources/dest4/789.js");