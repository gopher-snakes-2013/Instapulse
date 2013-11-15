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
  }
}
