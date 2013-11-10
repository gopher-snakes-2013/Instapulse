Map = {
  createMap: function(){
    return L.mapbox.map('map','salarkhan.g7l7ga11' ).setView([37.769, -122.439],13)
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

  postToMap: function(media_JSON) {
    var media = media_JSON
    var mediaCollection = []
    for(var i=0; i<media.length; i++){
      mediaCollection.push(Converter.convertToGeoJSONFormat(media[i]))
    }
    var map = Map.createMap()
    Map.customizeMarkers(map)
    map.markerLayer.setGeoJSON(mediaCollection);
    map.markerLayer.on('mouseover', function(e) {
        e.layer.unbindPopup();
        var feature = e.layer.feature;
        var info = '<h1>' + feature.properties.title + '</h1>' +
                   '<p>' + feature.properties.description + '</p>';

        document.getElementById('tooltip').innerHTML = info;
      $( "#tooltip" ).fadeIn( 300, function() {
        document.getElementById('tooltip').className = ''
      });
      });
    map.markerLayer.on('mouseout', function(e) {
      $('#tooltip').fadeOut(300)
      // e.layer.closePopup();
      // document.getElementById('tooltip').className = 'hidden'
});
  },

  initialize: function(){
    Map.getInstagram() 
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
  Map.initialize()
})
