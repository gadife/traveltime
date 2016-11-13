chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	// There is a problem if the first url is the eventpage_6 one.

	if(changeInfo.status == 'complete' && tab.url.endsWith('eventpage_6')){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    	var activeTab = tabs[0];
	    	chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
	    });
	}
})