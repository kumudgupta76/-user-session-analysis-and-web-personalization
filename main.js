var app = require('express')();
var fs = require('fs');
var bodyParser = require('body-parser');
var spawn = require("child_process").spawn;
var cookieParser = require('cookie-parser');
//var converter = require('json-2-csv');
var json2csv = require('json2csv').parse;
var newLine= "\r\n";

app.listen(3000, function() {
    console.log('Server started on port 3000');
});

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/',function(req,res){
	var user = req.cookies.user;	
    res.render('C:/Users/dell/Desktop/home.html',{
		currentUser: user
	});
});

app.post('/postdata', function(req, res){
	var clist = req.body;
	var fields = ['userid', 'hostname', 'port', 'protocol', 'path', 'total_time', 'actual_time'];
	const opts = { fields };
	

	fs.stat('file.csv', function (err, stat) {
		if (err == null) {
			console.log('File exists');

			//write the actual data and end with newline
		}
		else {
			//write the headers and newline
			console.log('New file, just writing headers');
			fields= (fields + newLine);

			fs.writeFile('file.csv', fields, function (err, stat) {
				if (err) throw err;
				console.log('file saved');
			});
		}
		try {
				const csv = json2csv(JSON.parse(clist.details));
				console.log(csv.split(newLine)[1]);
				fs.appendFile('file.csv', csv.split(newLine)[1]+newLine, function (err) {
					if (err) throw err;
					console.log('The "data to append" was appended to file!');
				});
			} catch (err) {
				console.error(err);
			}
	});
});


