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
	// There is a problem if the first url is the eventpage_6 one.
	console.log("test2");
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
	//travel_row_data.innerHTML = '<div class="btn-group">' +
	//							'	<button type="button" class="btn btn-primary">Apple</button>' +
	//							'	<button type="button" class="btn btn-primary">Samsung</button>' +
	//							'	<button type="button" class="btn btn-primary">Sony</button>' +
	//							'</div>'
	travel_row_data.innerHTML = //'<div class="btn-group btn-group-xs">' +
								'	<button type="button" class="buttons">15</button>' +
								'	<button type="button" class="buttons">30</button>' +
								'	<button type="button" class="buttons">45</button>' +
								'	<button type="button" class="buttons">60</button>' +
								'	<button type="button" class="buttons">90</button>'
								//'</div>'

	// parentNode.insertBefore(location_row, parentGuest.nextSibling);

	var save = document.getElementById('goog-inline-block.goog-imageless-button');
	save.addEventListener('mouseover', function(){
		console.log("TTTTT");
	});
	parent_node.insertBefore(travel_row, location_row.nextSibling);
}