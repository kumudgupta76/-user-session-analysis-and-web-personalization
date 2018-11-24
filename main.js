var app = require('express')();
var fs = require('fs');
var bodyParser = require('body-parser');
var spawn = require("child_process").spawn;
var cookieParser = require('cookie-parser');
var converter = require('json-2-csv');

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

app.post('/login', function(req,res){
	var name = req.body.name;
	var email = req.body.email;
	var cookie = [name, email];
	res.cookie('user', cookie).redirect('/');
});

app.get('/logout', function(req,res){
	var name = req.cookies.user[0].toString();
	res.clearCookie('user').redirect('/');
	/* var process = spawn('python',["./hello.py", name+'_c.txt', name+'.txt']);
    process.stdout.on('data', function(data) {
        console.log(data.toString());
    }); */
});

app.post('/postdata', function(req, res){
	var clist = req.body;
	console.log(clist);
	if (clist === undefined){
		res.clearCookie('user').send('logout');
	} else {
		converter.json2csv(clist, function(err,csv){
			//var name = req.cookies.user[0].toString();
			console.log(csv);
			/* fs.appendFile(name+'_c.csv', clist, function (err) {
				if (err) throw err;
			}); */
		}, {delimiter:'field'});
	}
});