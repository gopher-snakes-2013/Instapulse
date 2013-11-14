MapBuilder = {
  initialize: function() {
    this.map = this.createMap()
    this.map.on('layeradd', LayerHelpers.onLayerAdd)
    $('#time_form').on('submit', MapBuilder.render)
  },

  render: function(e){
    e.preventDefault()
    MapBuilder.removeExtraLayers()
    $.ajax({
      url:"/maps",
      type: "GET",
      dataType: "json",
      data: $('#time_form').serialize(),
    }).done(MapBuilder.placePhotosOnMap)
  },

  createMap: function(){
    return L.mapbox.map('map', 'salarkhan.g7l7ga11', {zoomControl: false})
    .setView([37.769, -122.439],13)
  },

  placePhotosOnMap: function(arrayOfPhotoJSONs){
    FormHelpers.disableForm()
    MapBuilder.arrayOfGeoJSONs = PhotosToGeoJSONs.convert(arrayOfPhotoJSONs)
    MapBuilder.mappedPoints = []
    MapBuilder.markerAddRemove(MapBuilder.arrayOfGeoJSONs)
  },

  // TODO-JW: the functions below here should be pulled out into an object that deals
  // with individual points / layers
  markerAddRemove: function(arrayOfGeoJSONs){
    $.each(arrayOfGeoJSONs, function(index, photo){
      var timeout = FormHelpers.playbackSpeed() * (photo.properties.created_time - FormHelpers.mapStartTime())
      var oneHour = FormHelpers.playbackSpeed() * 3600
      MapBuilder.createMarkerLayer(photo, timeout)
      MapBuilder.removeMarkerLayer(timeout + oneHour)
    })
  },

  createMarkerLayer: function(photo, timeout){
    setTimeout(function() {
      var newLayer = L.mapbox.markerLayer(photo)
      newLayer.addTo(MapBuilder.map)
      MapBuilder.mappedPoints.push(newLayer)
      MapBuilder.bindToolTipForLayer(newLayer);
    }, timeout);
  },

  bindToolTipForLayer: function(layer){
    layer.on('click', function(e) {
      e.layer.unbindPopup(); // prevent MapBox default behavior
      MapBuilder.addToolTip(MapBuilder.buildFeedPhoto(e.layer.feature))
    })
  },

  buildFeedPhoto: function(feature){
    return '<div class="feed-photo">' + '<a href="' + feature.properties.link_url + '">' + '<img src="' + feature.properties.image + '"/>' + '</a>' + '<p>' + feature.properties.caption + '</p>' + '</div>'
  },

  addToolTip: function(html){
    $(".pop-up").on('click', function(e){
      $("#feed-container").append(html)
    })
  },

  removeMarkerLayer: function(timeout){
    setTimeout(function() {
      var toRemove = MapBuilder.mappedPoints.shift()
      MapBuilder.map.removeLayer(toRemove)
      if (MapBuilder.mappedPoints.length === 0){
        FormHelpers.enableForm()
      }
    },timeout);
  },

  removeExtraLayers: function() {
    if (MapBuilder.mappedPoints){
      $.each(MapBuilder.mappedPoints, function(index, layer){
        MapBuilder.map.removeLayer(layer)
      })
    }    
  }
}
