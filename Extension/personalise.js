function reset()
{
    alert("Are you sure?");
    localStorage.clear();
    document.location.reload();
}
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
	createBarInterface2(arr);
}

function createBarInterface2(linkArr) {
      if (linkArr.length>0)
      {
          var link, a, href, type;
          
                var div2 = document.createElement("DIV");
                var id2 = document.createAttribute("ID");
                id2.value = 'usawpToggle2';
                div2.setAttributeNode(id2);
                var text = document.createTextNode("Personalised Links");
                div2.appendChild(text);
                var t2=document.createAttribute("onclick");
    t2.value="document.getElementById('usawpToggle2').style.display='none';document.getElementById('usawpBar2').style.display='block';";
          div2.setAttributeNode(t2);
                div2.style.display = 'block';
                div2.style.position = 'fixed';
                div2.style.bottom = '0px';
                div2.style.right = '200px';
                div2.style.backgroundColor = 'indigo';
                div2.style.zIndex = '2147483647';
                div2.style.padding = '10px';
                div2.style.color = 'yellow';
                div2.style.cursor = 'pointer';
                div2.style.borderRadius = '20px 20px 0px 0px';
                document.body.appendChild(div2);
    
    
      var myDiv = document.createElement("DIV");
          var id = document.createAttribute("ID");
          id.value = 'usawpBar2';
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
                                  href.value = linkArr[i];
                                  a.setAttributeNode(href);
                                  link = document.createTextNode(linkArr[i]);
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
          t.value="document.getElementById('usawpBar2').style.display='none';document.getElementById('usawpToggle2').style.display='block';";
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
    