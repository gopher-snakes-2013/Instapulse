var map = L.mapbox.map('map', 'salarkhan.g7l7ga11')
.setView([37.769, -122.439], 13);

// map.addLayer(L.mapbox.tileLayer('salarkhan.eux9wwmi'))
// map.addLayer(L.mapbox.tileLayer('salarkhan.g7l7ga11'))

var getInstagram = function(){
  $.ajax({
    url: '/search',
    type: 'POST',
    timeout: 5000,
    success: postToMap
  })
}


//test: given a json string, this function should contain an array of parsed lat/longs
var postToMap = function(location_JSON) {
  //JSON.parse should be its own function?
  var locations = JSON.parse(location_JSON)

  //this function returns geoLocations
  var geoLocations = []
  for(var i=0; i<locations.length; i++){
    geoLocations.push(convertToGeoJSONFormat(locations[i]))
  }

  //break this out into postToMap function that accepts geoLocations
  map.markerLayer.setGeoJSON(geoLocations);
}


//given a lat/long, this function should return a GeoJSON object 
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
