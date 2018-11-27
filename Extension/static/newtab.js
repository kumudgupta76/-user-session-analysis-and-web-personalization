var d = new Date();
document.getElementById("date").innerHTML = d.toDateString();

if (!localStorage.quotesPetal){
	localStorage.quotesPetal = 'Friend';
}
document.getElementById("name").innerHTML = localStorage.quotesPetal;

if (!localStorage.welcomeMessage){
	localStorage.welcomeMessage = 'Have a good day.';
}
document.getElementById("welcome").innerHTML = localStorage.welcomeMessage;

function clock(){
	//calculate angle
	var d, h, m, s;
	d = new Date();
	
	h = 30 * ((d.getHours() % 12) + d.getMinutes() / 60);
	m = 6 * d.getMinutes();
	s = 6 * d.getSeconds();
	
	//move hands
	setAttr('h-hand', h);
	setAttr('m-hand', m);
	setAttr('s-hand', s);
	setAttr('s-tail', s+180);
	
	//display time
	h = d.getHours();
	m = d.getMinutes();
	s = d.getSeconds();
	
	if(h >= 12){
	    setText('suffix', 'PM');
	}else{
	    setText('suffix', 'AM');
	}
	
	if(h != 12){
	    h %= 12;
	}
	
	setText('sec', s);
	setText('min', m);
	setText('hr', h);
	
	//call every second
	setTimeout(clock, 1000);
	
  }
  
  function setAttr(id,val){
	var v = 'rotate(' + val + ', 70, 70)';
	document.getElementById(id).setAttribute('transform', v);
  }
  
  function setText(id,val){
	if(val < 10){
	    val = '0' + val;
	}
	document.getElementById(id).innerHTML = val;
  }
  
  window.onload=clock;

document.getElementById("name").addEventListener("click",function(){
	var nm = prompt('Please enter your name to display:');
	if (nm !== null){
		localStorage.quotesPetal = nm;
		window.location.reload();
	}
});

document.getElementById("welcome").addEventListener("click",function(){
	var nm = prompt('Please enter the message to display:');
	if (nm !== null){
		localStorage.welcomeMessage = nm;
		window.location.reload();
	}
});

  document.getElementById("change").addEventListener("click",function(){
	  document.getElementById("bgPalette").style.visibility = 'visible';
  });
  document.getElementById("close").addEventListener("click",function(){
	document.getElementById("bgPalette").style.visibility = 'hidden';
  });