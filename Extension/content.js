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
	'path' : window.location.pathname,
	'total_time' : 0,
	'actual_time' : 0
};
chrome.storage.sync.get('userid', function(items) {
	var userid = items.userid;
	console.log(userid);
	session.userid = userid;
});
var interval = window.setInterval(function () {
	session.total_time += 60;
	if (mevent){
		session.actual_time += 60;
		mevent=0;
	}
	console.log(session.userid);
	console.log(session.actual_time);
}, 60000);
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
// window.onbeforeunload = null;

if (typeof(Storage) !== "undefined") {
	var obj = {
		title: document.title,
		url: window.location.href
	};
	if (!localStorage.pages || !localStorage.adjMatrix){
		initializeGraph(obj);
	} else {
		var pages = JSON.parse(localStorage.pages);
		var adjMatrix = JSON.parse(localStorage.adjMatrix);
		var index1 = find(pages, window.location.href);
		if (index1 === -1){
			addNode(pages, adjMatrix, obj);
		}
		localStorage.pages = JSON.stringify(pages);
		localStorage.adjMatrix = JSON.stringify(adjMatrix);
	}
	recommendationBar();
	if (document.addEventListener)
		document.addEventListener('click', callback, false);
  	else
		document.attachEvent('onclick', callback);
} else {
	alert('No Web Storage Support.\nPersonalisation may not work.');
}

function find(arr, link) {
	var flag = -1;
	for (var i=0; i<arr.length; i++){
		if (arr[i].url === link) {
			flag = i;
			break;
		}
	}
	return flag;
}

function initializeGraph(obj) {
	var pages = [];
	pages.push(obj);
	var adjMatrix = [[0]];
	localStorage.pages = JSON.stringify(pages);
	localStorage.adjMatrix = JSON.stringify(adjMatrix);
}

function addNode(pages, adjMatrix, obj) {
	var newArr = [];
	for(var i=0; i<pages.length; i++){
		adjMatrix[i].push(0);
		newArr.push(0);
	}
	newArr.push(0);
	adjMatrix.push(newArr);
	pages.push(obj);
}

function callback(e) {
	if (e.target.tagName === 'A') {
		var pages = JSON.parse(localStorage.pages);
		var adjMatrix = JSON.parse(localStorage.adjMatrix);
		var index = find(pages, e.target.href);
		if (index === -1){
			var obj = {
				title: e.target.innerText,
				url: e.target.href
			};
			addNode(pages, adjMatrix, obj);
			index = find(pages, e.target.href);
		}
		var index1 = find(pages, window.location.href);
		adjMatrix[index1][index] += 1;
		localStorage.pages = JSON.stringify(pages);
		localStorage.adjMatrix = JSON.stringify(adjMatrix);
	}
	else return;
}

function recommendationBar() {
	var pages = JSON.parse(localStorage.pages);
	var adjMatrix = JSON.parse(localStorage.adjMatrix);
	console.log(pages);
	console.log(adjMatrix);
	var maxsColumn=0, maxsRow=0, col=0, row=0;
	for (var i=0; i<pages.length; i++){
		var sum1=0, sum2=0;
		for (var j=0; j<pages.length; j++){
			sum1 += adjMatrix[j][i];
			sum2 += adjMatrix[i][j];
		}
		if (sum1 >= maxsColumn){
			maxsColumn = sum1;
			col = i;
		}
		if (sum2 >= maxsRow){
			maxsRow = sum2;
			row = i;
		}
	}
	var max = 0;
	var index1 = find(pages, window.location.href);
	for (var l=1; l<pages.length; l++){
		if (adjMatrix[index1][l] >= adjMatrix[index1][max]) max = l;
	}
	var arr = [pages[col], pages[max], pages[row]];
	createBarInterface(arr);
}

function createBarInterface(linkArr) {
	var link, a, href, type;
	var myDiv = document.createElement("DIV");
	console.log(myDiv);
	var note = document.createElement("DIV");
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
	var ln3 = document.createElement("LI");
	name = document.createTextNode("Raghav Arora");
	ln3.appendChild(name);
	listn.appendChild(ln3);
	var ln4 = document.createElement("LI");
	name = document.createTextNode("Mudit Banga");
	ln4.appendChild(name);
	listn.appendChild(ln4);
	note.appendChild(listn);
	note.style.position = 'absolute';
	note.style.right = '0px';
	note.style.width = '160px';
	note.style.textAlign = 'left';
	myDiv.appendChild(note);
		var para = document.createElement("P");
			var t = document.createTextNode("Recommended links");
			para.appendChild(t);
		myDiv.appendChild(para);
			var list = document.createElement("UL");
			type = document.createAttribute("type");
			type.value = 'none';
			list.setAttributeNode(type);
			for (var i=0; i<linkArr.length; i++){
				var l1 = document.createElement("LI");
				a = document.createElement("A");
				href = document.createAttribute("href");
				href.value = linkArr[i].url;
				a.setAttributeNode(href);
				link = document.createTextNode(linkArr[i].title);
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
	myDiv.style.background = 'linear-gradient(to bottom,rgba(0,0,0,0.6),rgba(0,0,0,1))';
	myDiv.style.color = 'white';
	myDiv.style.textAlign = 'center';
	myDiv.style.zIndex = '99';
	document.body.appendChild(myDiv);
  }

function removeSpaces(node) {
	var nodelist = node.childNodes;
	if (node.nodeValue !== null){
		var str = '';
		var i=0;
		while(node.nodeValue[i] === ' ' || node.nodeValue[i] === '\n' || node.nodeValue[i] === '\t')
			i++;
		for(;i<node.nodeValue.length;i++){
			str += node.nodeValue[i];
		}
		node.nodeValue = str;
	}
	if (nodelist.length !== 0){
		for (var n=0; n<nodelist.length; n++){
			removeSpaces(nodelist[n]);
		}
	}
}

function childs(node, indent) {
	var nodelist = node.childNodes;
	var value = node.nodeValue;
	if (value!==null){
		if (value!==''){
			for (var d=0; d<indent; d++){
				msg += '\t';
			}
			msg += node+' ('+node.nodeValue;
			msg += ')\n';
		}
	}
	else{
		for (var e=0; e<indent; e++){
			msg += '\t';
		}
		msg += node+' ('+nodelist.length;
		if (node.nodeType === 1){
			var rect = node.getBoundingClientRect();
			msg += ') - ('+(rect.left+window.pageXOffset)+','+(rect.top+window.pageYOffset)+','+rect.height+','+rect.width;
		}
		msg += ')\n';
	}
	if (nodelist.length !== 0){
		for (var n=0; n<nodelist.length; n++){
			childs(nodelist[n], indent+1);
		}
	}
}

function getText(node) {
	var c = node.childNodes;
	var i;
	for (i = 0; i < c.length; i++) {
	    if (c[i].nodeName === '#text' && c[i].nodeValue !== ''){
		txt = txt + c[i].nodeValue + "$\n";
	    } else if (c[i].nodeType===1 || c[i].nodeType===9){
		    if (c[i].nodeName !== 'SCRIPT' && c[i].childNodes.length !== 0){
			    getText(c[i]);
		    }
	    }
	}
  }

  
