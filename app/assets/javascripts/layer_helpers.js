LayerHelpers = {
  onLayerAdd: function(e) {
    LayerHelpers.changeMarkerIcon(e.layer)
  },

  changeMarkerIcon: function(marker) {
    if(marker.feature){
      marker.setIcon(L.icon(marker.feature.properties.icon));
      var popupContent = '<img class ="pop-up" src=' + marker.feature.properties.image + '>'
      marker.bindPopup(popupContent, {
        closeButton: true
      });
    }
  },

  updateTime: function(created_time){
    var timer = document.getElementById('timer')
    var date = new Date(created_time*1000); // JS can only create Date objects in milliseconds
    var formattedTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    timer.innerHTML = formattedTime
  },

  markerAddRemove: function(arrayOfGeoJSONs){
    $('#loading_icon').removeClass('hidden')
    $.each(arrayOfGeoJSONs, function(index, photo){
      var timeout = FormHelpers.playbackSpeed() * (photo.properties.created_time - FormHelpers.mapStartTime())
      var oneHour = FormHelpers.playbackSpeed() * 3600
      LayerHelpers.createMarkerLayer(photo, timeout)
      LayerHelpers.removeMarkerLayer(timeout + oneHour)
    })
  },

  createMarkerLayer: function(photo, timeout){
    setTimeout(function() {
      $('#loading_icon').addClass('hidden')
      LayerHelpers.updateTime(photo.properties.created_time)

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
