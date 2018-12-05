var mevent=0;
var session = {
	'timestamp' : Date.now(),
	'userid' : null,
	'hostname' : window.location.hostname,
	'port' : window.location.port,
	'path' : window.location.pathname,
	'query' : window.location.search,
	'title' : document.title,
	'total_time' : 0,
	'actual_time' : 0
};
chrome.storage.sync.get('userid', function(items) {
	var userid = items.userid;
	// console.log(userid);
	session.userid = userid;
});
var interval = window.setInterval(function () {
	session.total_time += 1;
	if (mevent){
		session.actual_time += 1;
		mevent=0;
	}
	// console.log(session.userid);
	// console.log(session.actual_time);
}, 1000);
document.onmousemove = function(){
	mevent=1;
};
window.onbeforeunload = function(){
	clearInterval(interval);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST","http://localhost:3000/postdata");
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
	xmlhttp.send('details='+JSON.stringify(session));
	return 'Are you sure you want to leave?';
};