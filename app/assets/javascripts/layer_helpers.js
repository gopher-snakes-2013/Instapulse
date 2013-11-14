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
  }
}
