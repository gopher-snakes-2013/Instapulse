var map = L.mapbox.map('map', 'examples.map-20v6611k')
.setView([37.9, -77], 6);

var getInstagram = function(){
  $.ajax({
    url: '/search',
    type: 'POST',
    timeout: 5000,
    success: postToMap
    })
}

  var postToMap  = function(location_JSON) {
    var locations = JSON.parse(location_JSON)
    var geoLocations = []
    for(var i=0; i<locations.length; i++){
      geoLocations.push(convertToGeoJSONFormat(locations[i]))
    }
    debugger
    map.markerLayer.setGeoJSON(geoLocations);

  }

  var convertToGeoJSONFormat = function(location){
    return {
    type: 'Feature',
    geometry: {
      type: 'Point',
        coordinates: [location[1],location[0]]
      },
      properties: {
        title: 'A Single Marker',
        description: 'Just one of me',
        'marker-size': 'large',
        'marker-color': '#f0a'
      }

    }
  }

getInstagram()
