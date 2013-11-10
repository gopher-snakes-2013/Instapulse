Map = {
  createMap: function(){
    return L.mapbox.map('map', 'salarkhan.g7l7ga11')
        .setView([37.769, -122.439],13)
        // .LatLngBounds(new L.LatLng(37.6493,-122.5492),new L.LatLng(37.8323,-122.3086);
        // .fitBounds([37.6493,-122.5492],[37.8323,-122.3086]);
  },

  customizeMarkers: function(){
    Map.map.markerLayer.on('layeradd', function(e){
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
      success: Map.mapController
    })
  },

  mapController: function(location_JSON) {
    var locations = location_JSON
    var geoLocations = []
    for(var i=0; i<locations.length; i++){

      geoLocations.push(Converter.convertToGeoJSONFormat(locations[i]))
    }
    Map.map = Map.createMap()
    Map.customizeMarkers(Map.map)
    Map.geoLocations = geoLocations
    Map.addMarkerIncrementally(0)
  },

  addMarkerIncrementally: function (index) {
    L.mapbox.markerLayer(Map.geoLocations[index]).addTo(Map.map);
    var that = this

    setTimeout(function(){ if (index < Map.geoLocations.length){
      that.addMarkerIncrementally(++index)}
      }, 1)
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
