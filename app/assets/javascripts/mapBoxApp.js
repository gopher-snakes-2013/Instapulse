$(document).ready(function(){
  MapBuilder.map = MapBuilder.createMap()
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
      convertedPhotos.push(geoPhoto)
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
        // title: "Salar sucks",
        description: '<a href=' + photoJSON.link_url + '><img src=' + photoJSON.thumbnail_url + '></a>',
        icon: {
          iconUrl: "http://imgur.com/hZE9VrA.png",
          iconSize: [6,6],
          iconAnchor: [3,6],
          className: "dot"
        }
      }
    }
  }
}

MapBuilder = {
  delay: 50,
  maxLayers: 1000,

  createMap: function(){
    return L.mapbox.map('map', 'salarkhan.g7l7ga11', {zoomControl: false})
    .setView([37.769, -122.439],13)
  },

  mapController: function(arrayOfJSONs){
    MapBuilder.arrayOfGeoJSONs = Converter.convertToGeoJSON(arrayOfJSONs)
    MapBuilder.mappedPoints = []
    MapBuilder.initializeMap(MapBuilder.arrayOfGeoJSONs, MapBuilder.maxLayers)
    MapBuilder.markerAddRemove(MapBuilder.arrayOfGeoJSONs)
  },

  initializeMap: function(arrayOfGeoJSONs, numToInitialize){
    var pointsToInitialize = arrayOfGeoJSONs.slice(0, numToInitialize)
    $.each(pointsToInitialize, function(index, photo){
      MapBuilder.createMarkerLayer(photo, MapBuilder.delay*index, false)
      MapBuilder.arrayOfGeoJSONs.shift()
    })
  },

  createMarkerLayer: function(photo, timeout, remove){
    setTimeout(function() {
      newLayer = L.mapbox.markerLayer(photo)
      MapBuilder.mappedPoints.push(newLayer)
      newLayer.addTo(MapBuilder.map)
      // MapBuilder.currentLayer = newLayer
      // toolTipModifier.handleToolTips();
      if (remove) MapBuilder.removeMarkerLayer()
    }, timeout);
  },

  markerAddRemove: function(arrayOfGeoJSONs){
    $.each(arrayOfGeoJSONs, function(index, photo){
      MapBuilder.createMarkerLayer(photo, (MapBuilder.maxLayers*MapBuilder.delay)+(MapBuilder.delay*index), true)
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
    MapBuilder.currentLayer.on('mouseover', function(e) {
      event.stopPropagation()
      self.editToolTip(e)
      self.showToolTip()
    })
    self.hideToolTip()
  },

  editToolTip: function(e){
    e.layer.unbindPopup();
    toolTipModifier.feature = e.layer.feature;
    toolTipModifier.info =
    '<p>' + toolTipModifier.feature.properties.description + '</p>'
  },

  showToolTip: function(){
    $("#tooltip" ).html(toolTipModifier.info)
    $("#tooltip" ).fadeIn( 300, function() {
      $('#tooltip').removeClass('hidden')
    })
  },

  hideToolTip: function(){
    MapBuilder.currentLayer.on('mouseout', function(e) {
      $('#tooltip').fadeOut(300, function(){
        e.layer.closePopup();
        $('#tooltip').addClass('hidden')
      })
    });
  }
}

// geoJSON for testing
    // photo = {
    //     type: 'Feature',
    //     geometry: {
    //       type: 'Point',
    //       coordinates: [37.68, -127.54]
    //     },
    //     properties: {
    //       title: "Salar sucks",
    //       description: '<img src=' + "http://imgur.com/hZE9VrA.png" + '>',
    //       icon: {
    //         iconUrl: "http://imgur.com/hZE9VrA.png",
    //         iconSize: [6,6],
    //         iconAnchor: [10,10]
    //       }
    //     }
    //   }
