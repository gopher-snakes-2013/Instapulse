MapBuilder = {
  initialize: function() {
    this.map = this.createMap()
    this.map.on('layeradd', LayerHelpers.onLayerAdd)
    $('#time_form').on('submit', MapBuilder.render)
  },

  createMap: function(){
    return L.mapbox.map('map', 'salarkhan.g7l7ga11', {zoomControl: false})
    .setView([37.769, -122.439],13)
  },

  render: function(e){
    e.preventDefault()
    $('#loading_icon').show()
    MapBuilder.removeExtraLayers()
    $.ajax({
      url:"/maps",
      type: "GET",
      dataType: "json",
      data: $('#time_form').serialize()
    }).done(MapBuilder.placePhotosOnMap)
  },

  removeExtraLayers: function() {
    if (MapBuilder.mappedPoints){
      $.each(MapBuilder.mappedPoints, function(index, layer){
        MapBuilder.map.removeLayer(layer)
      })
    }
  },

  placePhotosOnMap: function(arrayOfPhotoJSONs){
    FormHelpers.disableForm()
    MapBuilder.arrayOfGeoJSONs = PhotosToGeoJSONs.convert(arrayOfPhotoJSONs)
    MapBuilder.mappedPoints = []
    MapBuilder.markerAddRemove(MapBuilder.arrayOfGeoJSONs)
  },

  markerAddRemove: function(arrayOfGeoJSONs){
    $.each(arrayOfGeoJSONs, function(index, photo){
      var timeout = FormHelpers.playbackSpeed() * (photo.properties.created_time - FormHelpers.mapStartTime())
      var oneHour = FormHelpers.playbackSpeed() * 3600
      setTimeout(MapBuilder.createMarkerLayerClosure(photo), timeout);
      setTimeout(MapBuilder.removeMarkerLayer, timeout + oneHour);
    })
  },

  createMarkerLayerClosure: function(photo) {
    return function() {
      $('#loading_icon').hide()
      FormHelpers.updateTime(photo.properties.created_time)

      var newLayer = L.mapbox.markerLayer(photo)
      newLayer.addTo(MapBuilder.map)
      MapBuilder.mappedPoints.push(newLayer)
      ToolTipHelper.bindToolTipForLayer(newLayer);
    }
  },

  removeMarkerLayer: function(){
    var toRemove = MapBuilder.mappedPoints.shift()
    MapBuilder.map.removeLayer(toRemove)
    if (MapBuilder.mappedPoints.length === 0){
      FormHelpers.enableForm()
    }
  }
}
