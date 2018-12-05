window.onload = function(){
	recommendation();
};

function recommendation() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    var arr = JSON.parse(this.responseText);
			createBarInterface(arr);
			console.log(arr);
		}
	};
	chrome.storage.sync.get('userid',function(items){
		var userid = items.userid;
		var hostname = window.location.hostname;
		// console.log(userid);
		// console.log(hostname);
		xmlhttp.open("GET","http://localhost:3000/getlinks?userid="+userid+"&hostname="+hostname,true);
		xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		xmlhttp.send();
	});
}


function createBarInterface(linkArr) {
  if (linkArr.length>0)
  {
	var link, a, href, type;
	
		var div2 = document.createElement("DIV");
		var id2 = document.createAttribute("ID");
		id2.value = 'usawpToggle';
		div2.setAttributeNode(id2);
		var text = document.createTextNode("Recommended Links");
		div2.appendChild(text);
		var t2=document.createAttribute("onclick");
t2.value="document.getElementById('usawpToggle').style.display='none';document.getElementById('usawpBar').style.display='block';";
	div2.setAttributeNode(t2);
		div2.style.display = 'block';
		div2.style.position = 'fixed';
		div2.style.bottom = '0px';
		div2.style.right = '50px';
		div2.style.backgroundColor = 'indigo';
		div2.style.zIndex = '2147483647';
		div2.style.padding = '10px';
		div2.style.color = 'yellow';
		div2.style.cursor = 'pointer';
		div2.style.borderRadius = '20px 20px 0px 0px';
		document.body.appendChild(div2);


  var myDiv = document.createElement("DIV");
	var id = document.createAttribute("ID");
	id.value = 'usawpBar';
	myDiv.setAttributeNode(id);
  //console.log(myDiv);


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
					l1.style.borderLeft = '1px solid #aaa';
					list.appendChild(l1);
			  }
  myDiv.appendChild(list);
  myDiv.style.position = 'fixed';
  myDiv.style.bottom = '0px';
	myDiv.style.width = '100%';
	// myDiv.style.height = '50px';
	myDiv.style.backgroundColor = 'white';
	myDiv.style.boxShadow = '0px 0px 10px';
  myDiv.style.textAlign = 'center';
	myDiv.style.zIndex = '2147483647 !important';
	myDiv.style.padding = '0px';
	myDiv.style.display = 'none';


  var rst = document.createElement("div");
	var click=document.createTextNode("x");
	rst.appendChild(click);
	var t=document.createAttribute("onclick");
	t.value="document.getElementById('usawpBar').style.display='none';document.getElementById('usawpToggle').style.display='block';";
	rst.setAttributeNode(t);
  rst.style.position = 'absolute';
  rst.style.right='10px';
	rst.style.top='0px';
	rst.style.backgroundColor = 'white';
	rst.style.fontSize = '24px';
	rst.style.borderRadius = '50%';
	rst.style.padding = '10px';
	rst.style.display = 'block';
	rst.style.cursor = 'pointer';
	myDiv.appendChild(rst);

  document.body.appendChild(myDiv);
}
}
