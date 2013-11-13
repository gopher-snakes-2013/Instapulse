$(document).ready(function(){
  MapBuilder.map = MapBuilder.createMap()
  TimeSelector.initialize()
  MarkerModifier.changeMarkerIcon()
})

TimeSelector = {
  initialize: function(){
    $('#time_form').on('submit', function(e){
      e.preventDefault()
      $('#submit_button').css("visibility", "hidden")
      if (MapBuilder.mappedPoints){
        $.each(MapBuilder.mappedPoints, function(index, layer){
          MapBuilder.map.removeLayer(layer)
        })
      }
      var speed = $('#speed')[0].options[$('#speed')[0].selectedIndex].value
      var startTime = $('#start_time')[0].options[$('#start_time')[0].selectedIndex].value
      MapBuilder.definePlaybackSpeed(startTime, speed)
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
    $.each(arrayOfJSONs, function(index, photoJSON){
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
        link_url: photoJSON.link_url,
        caption: photoJSON.photo_caption,
        created_time: photoJSON.created_time,
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
  definePlaybackSpeed: function(startTime, speed){
    var unixSelectedDate = 1383202800
    var unixStartHour = 36 * startTime
    MapBuilder.unixMapStart = unixSelectedDate + unixStartHour
    var millisecondsPerInstagramHour = 1000.0 * speed
    MapBuilder.playbackSpeed = (millisecondsPerInstagramHour / 3600)
  },

  createMap: function(){
    return L.mapbox.map('map', 'salarkhan.g7l7ga11', {zoomControl: false})
    .setView([37.769, -122.439],13)
  },

  mapController: function(arrayOfJSONs){
    MapBuilder.arrayOfGeoJSONs = Converter.convertToGeoJSON(arrayOfJSONs)
    MapBuilder.mappedPoints = []
    MapBuilder.markerAddRemove(MapBuilder.arrayOfGeoJSONs)
  },

  markerAddRemove: function(arrayOfGeoJSONs){
    $.each(arrayOfGeoJSONs, function(index, photo){
      var timeout = MapBuilder.playbackSpeed * (photo.properties.created_time - MapBuilder.unixMapStart)
      var oneHour = MapBuilder.playbackSpeed * 3600
      MapBuilder.createMarkerLayer(photo, timeout)
      MapBuilder.removeMarkerLayer(timeout + oneHour)
    })
  },

  createMarkerLayer: function(photo, timeout){
    setTimeout(function() {
      MapBuilder.newLayer = L.mapbox.markerLayer(photo)
      MapBuilder.mappedPoints.push(MapBuilder.newLayer)
      MapBuilder.newLayer.addTo(MapBuilder.map)

      MapBuilder.currentLayer = MapBuilder.newLayer
      ToolTipModifier.handleToolTips();
    }, timeout);
  },

  removeMarkerLayer: function(timeout){
    setTimeout(function() {
      var toRemove = MapBuilder.mappedPoints.shift()
      MapBuilder.map.removeLayer(toRemove)
      if (MapBuilder.mappedPoints.length === 0){
        MapBuilder.showSubmit()
      }
    },timeout);
  },

  showSubmit: function(){
    $('#submit_button').css("visibility", "visible")
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
      self.editToolTip(e)
      self.addToolTip()
    })
    self.hideToolTip()
  },

  editToolTip: function(e){
    e.layer.unbindPopup();
    ToolTipModifier.feature = e.layer.feature;
    ToolTipModifier.info = '<div class="feed-photo">' + '<a href="' + ToolTipModifier.feature.properties.link_url + '">' + '<img src="' + ToolTipModifier.feature.properties.image + '"/>' + '</a>' + '<p>' + ToolTipModifier.feature.properties.caption + '</p>' + '</div>'
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
