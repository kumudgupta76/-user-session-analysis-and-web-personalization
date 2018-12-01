var msg = '', txt = '';
var auth = false;


// localStorage.removeItem('pages');
// localStorage.removeItem('adjMatrix');

// removeSpaces(document.body);
// childs(document.body, 0);

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
	console.log(userid);
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
function recommendationBar() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    var arr = JSON.parse(this.responseText);
			//createBarInterface(arr);
			//console.log(arr);
		}
	};
	chrome.storage.sync.get('userid',function(items){
		var userid = items.userid;
		var hostname = window.location.hostname;
		xmlhttp.open("GET","http://localhost:3000/getlinks?userid="+userid+"&hostname="+hostname,true);
		xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		xmlhttp.send();
	});
}


  

  function reset()
  {
	alert("are you sure");
	localStorage.clear();
	document.location.reload();
  }
  var cur=window.location.href;
  var links=document.getElementsByTagName("a");
  if(localStorage.getItem(cur))
	  {
		var a=JSON.parse(localStorage.getItem(cur));
		//console.log(JSON.stringify(a)+"**");
		if (document.title!=a.title)
		  a.title=document.title;
		localStorage.setItem(cur,JSON.stringify(a)) ;
		//console.log(a);
		//console.log("already in local storage");
	  }
	  else
	  {
		var a={"count":1,"title":cur};
		localStorage.setItem(cur,JSON.stringify(a)) ;
		//console.log("1st"+a);
	  }

  // call update funtion on click event
  for (i in links)
  {
	if (links[i].href)
	{
	  links[i].onclick=update;
	} 
  }
  // reset();

function update() {
if(localStorage.getItem(this.href))
{
  var a=JSON.parse(localStorage.getItem(this.href));
  console.log(JSON.stringify(a)+"**");
  a.count=parseInt(a.count)+1;
  localStorage.setItem(this.href,JSON.stringify(a));
  console.log(a);
}else{
  var a={"count":1,"title":this.href};
  localStorage.setItem(this.href,JSON.stringify(a)) ;
  console.log("1st"+a);
}
console.log("hi"+localStorage.getItem(this.href) );
}
recommendation();
function recommendation() {
  console.log("Inside recom");
  var pages = localStorage;
  if (pages.length>0){
  var arr=[];
	  for (var i=0;i<pages.length;i++){
		//console.log(i,pages.key(i),pages.getItem(pages.key(i)));
			
			  var p={};
			  p['url']=pages.key(i);
			  var a=JSON.parse(localStorage.getItem(pages.key(i)));
			  p['id']=a.count;
			  p['title']=a.title;
			  console.log(p);
			  arr.push(p);
			
		   
	  }
	  //console.log("array before sort"+[arr[0].url,arr[1].url,arr[2].url,arr[3].url,arr[4].url,arr[5].url]);
	  arr.sort(function(a, b){
		return parseInt(b.id) - parseInt(a.id);
	});
	  //console.log("array after sort"+[arr[0].url,arr[1].url,arr[2].url]);
	  if(arr.length>=3)
	  createBarInterface([arr[1].title,arr[1].url,arr[2].title,arr[2].url,arr[3].title,arr[3].url]);
}
}

function createBarInterface(linkArr) {
  if (linkArr.length>0)
  {
  var link, a, href, type;
  var myDiv = document.createElement("DIV");
  
  //console.log(myDiv);
  var note = document.createElement("DIV");
  var rst = document.createElement("div");
  var b=document.createElement("a");
	var click=document.createTextNode("click to reset");
	var oc=document.createAttribute("onclick");
	b.appendChild(click);
	b.setAttributeNode(oc);
	oc.value="reset()";
	rst.appendChild(b);
  var h = document.createTextNode("Project By:");
  note.appendChild(h);
  var listn = document.createElement("UL");
  var ln = document.createElement("LI");
  var name = document.createTextNode("Parth Pathak");
  ln.appendChild(name);
  listn.appendChild(ln);
  var ln2 = document.createElement("LI");
  name = document.createTextNode("Kumud Gupta");
  ln2.appendChild(name);
  listn.appendChild(ln2);
  note.appendChild(listn);
  
  note.style.position = 'absolute';
  note.style.right = '0px';
  note.style.width = '160px';
  note.style.textAlign = 'left';
  rst.style.position = 'absolute';
  rst.style.marginLeft='10px';
  rst.style.marginTop='5px';
  myDiv.appendChild(rst);
  myDiv.appendChild(note);
		var para = document.createElement("P");
		
			  var t = document.createTextNode("Recommended links");
			  para.appendChild(t);
		myDiv.appendChild(para);
			  var list = document.createElement("UL");
			  type = document.createAttribute("type");
			  type.value = 'none';
			  list.setAttributeNode(type);
			  for (var i=0; i<linkArr.length; i=i+2){
					var l1 = document.createElement("LI");
					a = document.createElement("A");
					href = document.createAttribute("href");
					href.value = linkArr[i+1];
					a.setAttributeNode(href);
					link = document.createTextNode(linkArr[i]);
					a.appendChild(link);
					l1.appendChild(a);
					l1.style.cssFloat = 'left';
					l1.style.padding = '20px';
					list.appendChild(l1);
			  }
  myDiv.appendChild(list);
  myDiv.style.position = 'fixed';
  myDiv.style.bottom = '0px';
  myDiv.style.width = '100%';
  myDiv.style.background = 'linear-gradient(to bottom,rgba(0,0,0,0.8),rgba(0,0,0,1))';
  myDiv.style.color = 'white';
  myDiv.style.textAlign = 'center';
  myDiv.style.zIndex = '1';
  document.body.appendChild(myDiv);
}
}