chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      // var firstHref = $("a[href^='http']").eq(0).attr("href");

      // This line is new!
      // chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});:1d.location-row
        console.log(request.otoken)
		add_travel_time_data(request.otoken)
    }
  }
);

function add_travel_time_data(token){
	// There is a problem if the first url is the eventpage_6 one.
	loadScript('https://apis.google.com/js/api.js');

	function loadScript(url){
	  var request = new XMLHttpRequest();

		request.onreadystatechange = function(){
			if(request.readyState !== 4) {
				return;
			}

			if(request.status !== 200){
				return;
			}

	    eval(request.responseText);
		};

		request.open('GET', url);
		request.send();
	};

	var location_row = document.querySelector('[id$="location-row"]')
	var id_prefix = location_row.id.split('.')[0]

	var parent_node = location_row.parentNode

	var travel_row = location_row.cloneNode(true);
	travel_row.id = id_prefix + '.travel-row'

	var travel_row_header = travel_row.getElementsByTagName('th')[0]
	var travel_label = travel_row_header.getElementsByTagName('label')[0]
	travel_label.textContent = 'Travel Time'
	travel_label.id = location_row + '.travel-label'

	var travel_row_data = travel_row.getElementsByTagName('td')[0]
	travel_row_data.innerHTML = '<div class="btn-group">' +
								'	<button type="button" class="btn btn-primary">Apple</button>' +
								'	<button type="button" class="btn btn-primary">Samsung</button>' +
								'	<button type="button" class="btn btn-primary">Sony</button>' +
								'</div>'

	// parentNode.insertBefore(location_row, parentGuest.nextSibling);
	parent_node.insertBefore(travel_row, location_row.nextSibling);

	// search for Save button element
	var save = document.getElementsByClassName("goog-inline-block goog-imageless-button");
	for (i=0;i<save.length;i++) {
		console.log(save[i].textContent);
		if (save[i].textContent.includes("Save")) {
			console.log("got it ", token);
			var save_element = save[i];
			break;
		}
	}
	// Get event date and start time
	save_element.addEventListener('mouseover', function(){
		var start_time = document.getElementsByClassName("text dr-time")[0].value;
		var start_date = document.getElementsByClassName("text dr-date")[0].value;
	});

	//Create event test
	var event = {
	  	start: {
	    	dateTime: "2016-12-02T10:00:00",
	    	timeZone: "America/Los_Angeles"
	  	},
	  	end: {
	    	dateTime: "2016-12-02T11:00:00",
	    	timeZone: "America/Los_Angeles"
	  	}
	};

	var jsonStr = JSON.stringify(event);

	var xhr = new XMLHttpRequest();
	//xhr.open('POST','https://www.googleapis.com/calendar/v3/calendars/gadi.fe@gmail.com/events');
	xhr.open('POST','https://www.googleapis.com/calendar/v3/calendars/gadi.fe@gmail.com/events');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Authorization','Bearer ' + token);
	xhr.send(jsonStr);
}