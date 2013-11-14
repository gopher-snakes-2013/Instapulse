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
    LayerHelpers.markerAddRemove(MapBuilder.arrayOfGeoJSONs)
  }
}

MapBuilder.createMap()
