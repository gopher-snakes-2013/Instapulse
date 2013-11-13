$(document).ready(function(){
  MapBuilder.map = MapBuilder.createMap()
  TimeSelector.initialize()
  MarkerModifier.changeMarkerIcon()
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
        image: photoJSON.thumbnail_url,
        icon: {
          iconUrl: "http://imgur.com/hZE9VrA.png",
          iconSize: [6,6],
          iconAnchor: [3,6],
          className: "ig-dot"
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
      MapBuilder.newLayer = L.mapbox.markerLayer(photo)
      MapBuilder.mappedPoints.push(MapBuilder.newLayer)
      MapBuilder.newLayer.addTo(MapBuilder.map)
      MapBuilder.currentLayer = MapBuilder.newLayer
      ToolTipModifier.handleToolTips();
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

MarkerModifier = {

  changeMarkerIcon: function(){
   MapBuilder.map.on('layeradd', function(e) {
    var marker = e.layer,
    feature = marker.feature;
    if(feature){
      marker.setIcon(L.icon(feature.properties.icon));
      var popupContent = '<img class ="pop-up" src=' + feature.properties.image + '>'
      marker.bindPopup(popupContent, {
        closeButton: true
      });
    }
  });
 }

}

ToolTipModifier = {

  handleToolTips: function(){
    var self = this
    MapBuilder.currentLayer.on('click', function(e) {
      event.stopPropagation()
      self.editToolTip(e)
      self.addToolTip()
    })
    self.hideToolTip()
  },

  editToolTip: function(e){
    e.layer.unbindPopup();
    ToolTipModifier.feature = e.layer.feature;
    ToolTipModifier.info = '<div class="feed-photo">' + '<img src=' + ToolTipModifier.feature.properties.image + '>' + '</div>'
  },

  addToolTip: function(){
    $(".pop-up").on('click', function(){
      $("#feed-container" ).append(ToolTipModifier.info)
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
