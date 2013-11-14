LayerHelpers = {
  onLayerAdd: function(e) {
    LayerHelpers.changeMarkerIcon(e.layer)
  },

  changeMarkerIcon: function(marker) {
    if(marker.feature){

      if(marker.feature.properties.like_count > 30) {
        marker.setIcon(L.icon(marker.feature.properties.pink_icon));
      } else {
        marker.setIcon(L.icon(marker.feature.properties.blue_icon));
      }
      var popupContent = '<img class ="pop-up" src=' + marker.feature.properties.image + '>'
      marker.bindPopup(popupContent, {
        closeButton: true
      });
    }
  },

  markerAddRemove: function(arrayOfGeoJSONs){
    $.each(arrayOfGeoJSONs, function(index, photo){
      var timeout = FormHelpers.playbackSpeed() * (photo.properties.created_time - FormHelpers.mapStartTime())
      var oneHour = FormHelpers.playbackSpeed() * 3600
      LayerHelpers.createMarkerLayer(photo, timeout)
      LayerHelpers.removeMarkerLayer(timeout + oneHour)
    })
  },

  createMarkerLayer: function(photo, timeout){
    setTimeout(function() {
      var newLayer = L.mapbox.markerLayer(photo)
      newLayer.addTo(MapBuilder.map)
      MapBuilder.mappedPoints.push(newLayer)
      ToolTipHelper.bindToolTipForLayer(newLayer);
    }, timeout);
  },

  removeMarkerLayer: function(timeout){
    setTimeout(function() {
      var toRemove = MapBuilder.mappedPoints.shift()
      MapBuilder.map.removeLayer(toRemove)
      if (MapBuilder.mappedPoints.length === 0){
        FormHelpers.enableForm()
      }
    },timeout);
  }
}