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
  delay: 50,
  maxLayers: 1000,

  createMap: function(){
    return L.mapbox.map('map', 'salarkhan.g7l7ga11')
    .setView([37.769, -122.439],13)
  },

  mapController: function(arrayOfJSONs){
    MapBuilder.arrayOfGeoJSONs = Converter.convertToGeoJSON(arrayOfJSONs)
    MapBuilder.mappedPoints = []
    //test mapping of a single point
    // debugger
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
    // newLayer = L.mapbox.markerLayer(photo).addTo(MapBuilder.map)
    // debugger
    // console.log(MapBuilder.arrayOfGeoJSONs)
    MapBuilder.initializeMap(MapBuilder.arrayOfGeoJSONs, MapBuilder.maxLayers)
    // console.log(MapBuilder.arrayOfGeoJSONs)
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
