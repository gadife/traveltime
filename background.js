chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	// There is a problem if the first url is the eventpage_6 one.
	var oauth = ChromeExOAuth.initBackgroundPage({
	  'request_url': 'https://www.google.com/accounts/OAuthGetRequestToken',
	  'authorize_url': 'https://www.google.com/accounts/OAuthAuthorizeToken',
	  'access_url': 'https://www.google.com/accounts/OAuthGetAccessToken',
	  'consumer_key': 'anonymous',
	  'consumer_secret': 'anonymous',
	  'scope': 'https://www.googleapis.com/auth/calendar',
	  'app_name': 'Travel Time'
	});

	if(changeInfo.status == 'complete' && tab.url.endsWith('eventpage_6')){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    	var activeTab = tabs[0];
	    	chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
	    	console.log("test");
	    });
	}
	chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
  	// Use the token.
	});
})