chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	// There is a problem if the first url is the eventpage_6 one.
	if(changeInfo.status == 'complete' && tab.url.endsWith('eventpage_6')){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    	var activeTab = tabs[0];
	    	console.log("back");
	    	//chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
	    	chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
				// Use the token.
				console.log("Identity:", token);
				//chrome.tabs.sendMessage(activeTab.id, {"otoken": token});
				chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action", "otoken": token});
			});
	    });
	}
})