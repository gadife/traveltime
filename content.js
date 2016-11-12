chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      // var firstHref = $("a[href^='http']").eq(0).attr("href");

      // This line is new!
      // chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});:1d.location-row
		add_travel_time_data()
    }
  }
);

function add_travel_time_data(){
	var location_row = document.querySelector('[id$="location-row"]')
	console.log(location_row)

	var parent_node = location_row.parentNode

	var travel_row = location_row.cloneNode(true);
	travel_row.id = ':1d.travel-row'

	var travel_row_header = travel_row.getElementsByTagName('th')[0]
	var travel_label = travel_row_header.getElementsByTagName('label')[0]
	travel_label.textContent = 'Travel Time'
	travel_label.id = ':1d.travel-label'

	// var travel_row_data = travel_row.getElementsByTagName('td')[0]

	// parentNode.insertBefore(location_row, parentGuest.nextSibling);
	parent_node.insertBefore(travel_row, location_row.nextSibling)
}