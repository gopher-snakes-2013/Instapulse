MapBuilder = {
  createMap: function(){
    return L.mapbox.map('map', 'salarkhan.g7l7ga11')
        .setView([37.769, -122.439],13)
  },

  getInstagram: function(){
    $.ajax({
      url: '/',
      type: 'GET',
      dataType: 'json',
      success: MapBuilder.mapController
    })
  },

  tooltipModifier: function() {

   MapBuilder.blueMarkerLayer.on('mouseover', function(e) {
        e.layer.unbindPopup();
        var feature = e.layer.feature;
        var info = '<p>' + feature.properties.title + '</p>' +
                   '<p>' + feature.properties.description + '</p>';

        
      $("#tooltip" ).html(info)
      $("#tooltip" ).fadeIn( 300, function() {
      $('#tooltip').removeClass('hidden')
        });
      });

    MapBuilder.blueMarkerLayer.on('mouseout', function(e) {
      $('#tooltip').fadeOut(300)
      e.layer.closePopup();
      $('#tooltip').addClass('hidden')
    });
  },

  mapController: function(media_collection) {
    var geoJsonCollection = []
    for(var i=0; i<media_collection.length; i++){
      geoJsonCollection.push(Converter.convertToGeoJSONFormat(media_collection[i]))
    }
    MapBuilder.map = MapBuilder.createMap()
    MapBuilder.geoJsonCollection = geoJsonCollection
    MapBuilder.addMarkerIncrementally(0)
  },

  addMarkerIncrementally: function (index) {
    MapBuilder.blueMarkerLayer = L.mapbox.markerLayer(MapBuilder.geoJsonCollection[index]).addTo(MapBuilder.map)
    var that = this
    setTimeout(function(){ if (index < MapBuilder.geoJsonCollection.length){
      that.addMarkerIncrementally(++index)}
      }, 300)
    MapBuilder.tooltipModifier() 
  },

  initialize: function(){
    MapBuilder.getInstagram() 
  }
}

Converter = {
    //should this be done in ruby land instead to minimize number of format conversions
    convertToGeoJSONFormat: function(media){
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [media[1],media[0]]
        },
        properties: {
          title: "Salar sucks",
         description: '<img src=' + media[2] + '>',
         icon: {
          iconUrl: "http://imgur.com/hZE9VrA.png",
          iconSize: [6,6], //icon size
          iconAnchor: [10,10] //point of icon that corresponds to marker location
        }
      }
    }
  }
}

$(document).ready(function(){
  MapBuilder.initialize()
})
