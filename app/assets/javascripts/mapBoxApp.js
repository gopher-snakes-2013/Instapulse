MapBuilder = {
  createMap: function(){
    return L.mapbox.map('map', 'salarkhan.g7l7ga11').setView([37.769, -122.439],13)
  },

  getInstagram: function(){
    $.ajax({
      url: '/',
      type: 'GET',
      dataType: 'json',
      success: MapBuilder.mapController
    })
  },

  mapController: function(location_JSON) {
    var locations = location_JSON
    var geoLocations = []
    for(var i=0; i<locations.length; i++){

      geoLocations.push(Converter.convertToGeoJSONFormat(locations[i]))
    }
    MapBuilder.map = MapBuilder.createMap()
    MapBuilder.geoLocations = geoLocations
    MapBuilder.addMarkerIncrementally(0)
  },

  addMarkerIncrementally: function (index) {
    L.mapbox.markerLayer(MapBuilder.geoLocations[index]).addTo(MapBuilder.map)
    var that = this
    setTimeout(function(){ if (index < MapBuilder.geoLocations.length){
      that.addMarkerIncrementally(++index)}
      }, 1)
  },

  initialize: function(){
    MapBuilder.getInstagram()
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
  MapBuilder.initialize()
})
