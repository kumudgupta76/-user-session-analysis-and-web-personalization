var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var spawn = require("child_process").spawn;
var json2csv = require('json2csv').parse;
var app = express();
var newLine= "\r\n";

app.listen(3000, function() {
    console.log('Server started on port 3000');
});
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/static'));



app.get('/user-session-analysis', function(req,res){
	var userid = req.query.userid;
	var process = spawn('python',["./favsites.py",req.query.userid]);
	
	var obj;
	process.stdout.on('data', function(data) {
		obj = JSON.parse(data);
		console.log(obj);
		res.render('analysis.html',{
			userid : userid,
			siteList : obj
		});
      });
      process.stderr.on('data', function(data){
		console.log("Error: " + data);
	});
});

app.get('/chart', function(req, res){
	var userid = req.query.userid;
	var type = req.query.type;
	res.render('frame.html',{
		userid : userid,
		type : type
	});
});

app.get('/getchart', function(req, res){
	var type = req.query.type;
	var process;
	if (type === 'bar'){
		process = spawn('python',["-u","./chart.py",req.query.userid]);
	}
	else if (type === 'pie'){
		process = spawn('python',["-u","./piechart.py",req.query.userid]);
	}
	process.stdout.on('data', function(data) {
        res.send(data.toString());
    });
    process.stderr.on('data', function(data){
	console.log("Error: " + data);
    });
});

app.get('/getlinks', function(req, res){
	// console.log('getlinks'+req.query.userid+':'+req.query.hostname);
	var process = spawn('python',["-u","./recommendation.py",req.query.userid,req.query.hostname]);
	// console.log('hiii');
	process.stdout.on('data', function(data) {
		// console.log(JSON.parse(data)); 
		res.send(JSON.parse(data));
    });
    process.stderr.on('data', function(data){
	console.log("Error: " + data);
    });
//     console.log('complete');
});

app.post('/postdata', function(req, res){
	var clist = req.body;
	var fields = ['timestamp', 'userid', 'hostname', 'port', 'path', 'query', 'title', 'total_time', 'actual_time'];
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