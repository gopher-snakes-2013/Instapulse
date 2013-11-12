$(document).ready(function(){
  MapBuilder.map = MapBuilder.createMap()
  MapBuilder.spittle = L.mapbox.markerLayer().addTo(MapBuilder.map)
  TimeSelector.initialize()
})

TimeSelector = {
  initialize: function(){
    $('#time_form').on('submit', function(e){
      e.preventDefault()
      $.ajax({
        url:"/maps",
        type: "GET",
        dataType: "json",
        data: $('#time_form').serialize()
      }).done(function(server_data){
        MapBuilder.mapController(server_data)
      })
    })
  }
}

Converter = {
  convertToGeoJSON: function(arrayOfJSONs){
    var convertedPhotos = []
    $.each(arrayOfJSONs, function(index, photoJSON) {
      geoPhoto = Converter.toGeoJSONFormat(photoJSON)
      convertedPhotos << geoPhoto
    })
    return convertedPhotos
  },

  toGeoJSONFormat: function(photoJSON){
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [photoJSON.longitude, photoJSON.latitude]
      },
      properties: {
        title: "Salar sucks",
        description: '<img src=' + photoJSON.thumbnail_url + '>',
        icon: {
          iconUrl: "http://imgur.com/hZE9VrA.png",
          iconSize: [6,6],
          iconAnchor: [3,6]
        }
      }
    }
  }
}

MapBuilder = {
  createMap: function(){
    return L.mapbox.map('map', 'salarkhan.g7l7ga11')
    .setView([37.769, -122.439],13)
  },

  mapController: function(arrayOfJSONs){
    MapBuilder.arrayOfGeoJSONs = Converter.convertToGeoJSON(arrayOfJSONs)
    console.log(MapBuilder.arrayOfGeoJSONs)
    MapBuilder.mappedPoints = []
    MapBuilder.initializeMap(MapBuilder.arrayOfGeoJSONs, 35)
    MapBuilder.markerAddRemove(MapBuilder.arrayOfGeoJSONs)
  },

  initializeMap: function(arrayOfGeoJSONs, numToInitialize){
    var pointsToInitialize = arrayOfGeoJSONs.slice(0, numToInitialize)
    $.each(pointsToInitialize, function(index, photo){
      MapBuilder.createMarkerLayer(photo)
      MapBuilder.arrayOfGeoJSONs.shift()
    })
  },

  createMarkerLayer: function(photo){
    newLayer = L.mapbox.markerLayer(photo).addTo(MapBuilder.map)
    MapBuilder.mappedPoints << newLayer
  },

  markerAddRemove: function(arrayOfGeoJSONs){
    $.each(arrayOfGeoJSONs, function(index, photo){
      createMarkerLayer(photo)
      removeMarkerLayer()
    })
  },

  removeMarkerLayer: function(){
    toRemove = MapBuilder.mappedPoints.shift()
    MapBuilder.map.removeLayer(toRemove)
  }
}

toolTipModifier = {

  handleToolTips: function(){
    var self = this
    MapBuilder.blueMarkerLayer.on('mouseover', function(e) {
      self.editToolTip(e)
      self.showToolTip()
    })
    self.hideToolTip()
  },

  editToolTip: function(e){
    e.layer.unbindPopup();
    toolTipModifier.feature = e.layer.feature;
    toolTipModifier.info = '<p>' + toolTipModifier.feature.properties.title +  '</p>' +
    '<p>' + toolTipModifier.feature.properties.description + '</p>'
  },

  showToolTip: function(){
    $("#tooltip" ).html(toolTipModifier.info)
    $("#tooltip" ).fadeIn( 300, function() {
      $('#tooltip').removeClass('hidden')
    })
  },

  hideToolTip: function(){
    MapBuilder.blueMarkerLayer.on('mouseout', function(e) {
      $('#tooltip').fadeOut(300, function(){
        e.layer.closePopup();
        $('#tooltip').addClass('hidden')
      })
    });
  }
}

    //      var myArray = [
    //   [
    //   [{a: 0}, {b:1}],
    //   [{c: 0}, {d:1}],
    //   [],
    //   [{e: 0}]
    //   ]
    // ]
