var express = require("express"),
	app = express();
	
app.use(express.static("./"));
	
var server = app.listen(80, function () {
	console.log("We are ready!");
});