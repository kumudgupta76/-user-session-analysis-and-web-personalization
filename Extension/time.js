var d = new Date();
    var hh=d.getHours();
    var mm=d.getMinutes();
 var ss=d.getSeconds();
 var dd=d.getDate();
 var mn=d.getMonth();
 var yy=d.getFullYear();
 var yz="AM";
 if(hh==12)
 {yz="PM";}
 if(hh>12)
 {   yz="PM";
     hh=hh-12;}
if(hh<10)
{
hh="0"+hh;
}  if(mm<10)
{
    mm="0"+mm;
}
 if(ss<10)
 {
    ss="0"+ss;
 }
 if(dd<10)
 {
dd="0"+dd;
 }
 if(mn<10)
 {
mn="0"+mn;
 } 
     var clock=hh+":"+mm+":"+ss +" "+ yz;
    var dated=dd+"/"+mn+"/"+yy;

var dd = document.createElement("div");
dd.appendChild(document.createTextNode("Page is active since "+clock+" on "+dated));

dd.style.position = 'fixed';
dd.style.backgroundColor = 'rgb(200,200,255)';
dd.style.padding = '10px';
dd.style.borderRadius = '0px 0px 50px 50px';
dd.style.top = '0px';
dd.style.left = '40%';
dd.style.zIndex = '2147483647';

document.body.appendChild(dd);
