Map = {
  createMap: function(){
    return L.mapbox.map('map', 'salarkhan.g7l7ga11').setView([37.769, -122.439],13)
  },

  customizeMarkers: function(map){
    map.markerLayer.on('layeradd', function(e){
      var marker = e.layer,
      feature = marker.feature;
      marker.setIcon(L.icon(feature.properties.icon));
    })
  },

  getInstagram: function(){
    $.ajax({
      url: '/',
      type: 'GET',
      dataType: 'json',
      success: Map.postToMap
    })
  },

  postToMap: function(location_JSON) {
    var locations = location_JSON
    var geoLocations = []
    for(var i=0; i<locations.length; i++){
      geoLocations.push(Converter.convertToGeoJSONFormat(locations[i]))
    }
    var map = Map.createMap()
    Map.customizeMarkers(map)
    map.markerLayer.setGeoJSON(geoLocations);
  },

  initialize: function(){
    Map.getInstagram() 
  }
}

Converter = {
    //should this be done in ruby land instead to minimize number of format conversions
    convertToGeoJSONFormat: function(location){
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [location[1],location[0]]
        },
        properties: {
         title: "I'M A MARKER, BITCH",
         description: 'meow',
         icon: {
          iconUrl: "http://imgur.com/hZE9VrA.png",
          iconSize: [6,6], //icon size
          iconAnchor: [0,0] //point of icon that corresponds to marker location
        }
      }
    }
  }
}


$(document).ready(function(){
  Map.initialize()
})
