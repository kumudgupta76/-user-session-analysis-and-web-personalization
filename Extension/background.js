chrome.runtime.onInstalled.addListener(function() {

  function getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
}

chrome.storage.sync.get('userid', function(items) {
  var userid = items.userid;
  if (!userid) {
      userid = getRandomToken();
      chrome.storage.sync.set({userid: userid}, function(){
        console.log("User id is set: "+userid);
      });
  }
});
    
  chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("The color is green.");
    });
  
    chrome.browserAction.onClicked.addListener(function() {
      chrome.storage.sync.get('userid',function(items){
        chrome.tabs.create({
          'url':'localhost:3000/user-session-analysis?userid=' + items.userid
        });
      });
    });
});