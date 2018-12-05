window.onload = function(){
	recommendation();
};

function reset()
{
    alert("Are you sure?");
    localStorage.clear();
    document.location.reload();
}

var cur = window.location.href;
if(localStorage.getItem(cur))
      {
          var a = JSON.parse(localStorage.getItem(cur));
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
var links = document.getElementsByTagName("a");
for (var i in links)
{
    if (links[i].href)
    {
      links[i].onclick = update;
    } 
}
//  reset();

function update() {
      if(localStorage.getItem(this.href)) {
            var a = JSON.parse(localStorage.getItem(this.href));
            // console.log(JSON.stringify(a)+"**");
            a.count = parseInt(a.count)+1;
            localStorage.setItem(this.href,JSON.stringify(a));
            // console.log(a);
      } else {
            var a={"count":1,"title":this.href};
            localStorage.setItem(this.href,JSON.stringify(a)) ;
            // console.log("1st"+a);
      }
      // console.log("hi"+localStorage.getItem(this.href) );
}

function recommendation() {
          // console.log("Inside recom");
      var pages = localStorage;
      if (pages.length>0){
            var arr=[];
            for (var i=0;i<pages.length;i++){
                  console.log(i,pages.key(i),pages.getItem(pages.key(i)));
                
                  var p={};
                  p['url']=pages.key(i);
                  var a = JSON.parse(localStorage.getItem(pages.key(i)));
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
            if(arr.length>=3){
                  createBarInterface([arr[1].title,arr[1].url,arr[2].title,arr[2].url,arr[3].title,arr[3].url]);
            } else createBarInterface([]);
      }
}

function createBarInterface(linkArr) {
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
                div2.style.right = '150px';
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
    