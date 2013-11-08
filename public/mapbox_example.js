var map = L.mapbox.map('map', 'examples.map-20v6611k')
.setView([37.769, -122.439], 13);

var getInstagram = function(){
  $.ajax({
    url: '/search',
    type: 'POST',
    timeout: 5000,
    success: postToMap
  })
}

var postToMap = function(location_JSON) {
  var locations = JSON.parse(location_JSON)
  var geoLocations = []
  for(var i=0; i<locations.length; i++){
    geoLocations.push(convertToGeoJSONFormat(locations[i]))
  }
  map.markerLayer.setGeoJSON(geoLocations);

}

var convertToGeoJSONFormat = function(location){
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      // coordinates here are in longitude, latitude order because
      // x, y is the standard for GeoJSON
      coordinates: [location[1],location[0]]
    },
      properties: {
      title: "I'M A MARKER, BITCH",
      description: 'meow',
      // can customize markers by adding simplestyle properties
      // http://mapbox.com/developers/simplestyle/
      'marker-size': 'small',
      'marker-color': '#FF530D'
    }
  }
}


  $.ready(getInstagram()) 
