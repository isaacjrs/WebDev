// Globals
var map;
var lat = 59.347;
var lng = 18.073;
var latA = -37.8971726;
var lngA = 145.1534078;
var latI = 10.493157;
var lngI = -66.839500;
var KTHpos = new google.maps.LatLng(lat, lng);
var otherPos2 = new google.maps.LatLng(lat, lng);
var otherPos;
var isaacPlace = new google.maps.LatLng(latI, lngI);
var alexPlace = new google.maps.LatLng(latA, lngA);
var title = "Here is KTH!";

var alexPlaceMarker = new google.maps.Marker({
		position: alexPlace,
		map: map,
		title: 'Alex Favorite Place',
		draggable: true,
	});
var isaacPlaceMarker = new google.maps.Marker({
		position: isaacPlace,
		map: map,
		title: 'Isaac Favorite Place',
		draggable: true
	});

/**
 * Initializer
 */
function initialize() {
	var mapOptions = {
		center: KTHpos,
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		heading: 90,
		tilt: -45,
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	var KTHmarker = new google.maps.Marker({
		position: KTHpos,
		map: map,
		title: title,
		draggable: true,
		animation: google.maps.Animation.BOUNCE
	});
	 isaacPlaceMarker.setMap(null);
	alexPlaceMarker.setMap(null);
}
/**
 * Manipulation functions
 */
function rotate90() {// Not used
	var heading = map.getHeading() || 0;
	map.setHeading(heading + 90);
}
function autoRotate() {// Not used
	// Determine if we're showing aerial imagery
	if (map.getTilt() != 0) {
		window.setInterval(rotate90, 3000);
	}
}
function zoomIn() {
	map.setZoom(map.getZoom() + 1);
}
function zoomOut() {
	map.setZoom(map.getZoom() - 1);
}
function moveRight() {
	lng = lng + 0.001;
	otherPos = new google.maps.LatLng(lat, lng);
	map.panTo(otherPos);
}
function moveLeft() {
	lng = lng - 0.001;
	otherPos = new google.maps.LatLng(lat, lng);
	map.panTo(otherPos);
}
function moveUp() {
	lat = lat + 0.001;
	otherPos = new google.maps.LatLng(lat, lng);
	map.panTo(otherPos);
}
function moveDown() {
	lat = lat - 0.001;
	otherPos = new google.maps.LatLng(lat, lng);
	map.panTo(otherPos);
}
function moveToIsaac() {
	lat = latI;
	lng = lngI;
	map.panTo(isaacPlace);
	isaacPlaceMarker.setMap(map);
	alexPlaceMarker.setMap(null);
}
function moveToAlex() {
	lat = latA;
	lng = lngA;
	map.panTo(alexPlace);
	alexPlaceMarker.setMap(map);
	isaacPlaceMarker.setMap(null);
}
function getMyPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position){
		        var coords = new google.maps.LatLng(
			        position.coords.latitude,
			        position.coords.longitude
			    );
		    	console.log(position.coords.latitude + ', ' + position.coords.longitude);

		   		 map.setCenter(coords);
       	 	});

    } else {
        alert("Your Browser don't support location feature");
    }
}


/**
 * Scripts executed on start
 */
// Trigger intializer
google.maps.event.addDomListener(window, 'load', initialize);

//// Button listeners
// Zoom
google.maps.event.addDomListener(document.getElementById('zoomIn'), 'click', zoomIn);
google.maps.event.addDomListener(document.getElementById('zoomOut'), 'click', zoomOut);
// Move
google.maps.event.addDomListener(document.getElementById('moveRight'), 'click', moveRight);
google.maps.event.addDomListener(document.getElementById('moveLeft'), 'click', moveLeft);
google.maps.event.addDomListener(document.getElementById('moveUp'), 'click', moveUp);
google.maps.event.addDomListener(document.getElementById('moveDown'), 'click', moveDown);
// Special places
google.maps.event.addDomListener(document.getElementById('isaacPlace'), 'click', moveToIsaac);
google.maps.event.addDomListener(document.getElementById('alexPlace'), 'click', moveToAlex);

// Front start screen listener
document.getElementsByClassName('front')[0].addEventListener('click', function() {
	this.style.display = 'none';
});
