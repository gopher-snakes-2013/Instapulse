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

MapBuilder = {

  createMap: function(){
    return L.mapbox.map('map', 'salarkhan.g7l7ga11')
    .setView([37.769, -122.439],13)
  },

  mapController: function(arrayOfJSONTuples){
    console.log(arrayOfJSONTuples)
    var arrayOfGeoJSONTuples = MapBuilder.convertToGeoJSONs(arrayOfJSONTuples)
    // arrayOfGeoJSONTuples[i][0]


    for(i=0; i<arrayOfJSONTuples.length; i++){
      // MapBuilder.createGeoJSONLayer(arrayOfGeoJSONTuples[i][0])
      // MapBuilder.addMarkersToLayer(arrayOfGeoJSONTuples[i][1])
    }
  },

  convertToGeoJSONs: function(arrayOfJSONTuples){
    for(tuple=0; tuple < arrayOfJSONTuples.length; tuple++){

      if(arrayOfJSONTuples[tuple][0].length > 0){

        for(objects=0; objects < arrayOfJSONTuples[tuple][0].length; objects++){

          if(typeof arrayOfJSONTuples[tuple][objects] !== 'undefined' && arrayOfJSONTuples[tuple][objects].length > 0){

            for(object=0; object < arrayOfJSONTuples[tuple][objects].length; object++ ){
              // Converter.toGeoJSONFormat(arrayOfJSONTuples[tuple][objects][object])
              arrayOfJSONTuples[tuple][objects][object] = "herp"
            }
          }
        }
      }

      if(arrayOfJSONTuples[tuple][1].length > 0){

        for(objects=0; objects < arrayOfJSONTuples[tuple][1].length; objects++){

          if(typeof arrayOfJSONTuples[tuple][objects] !== 'undefined' &&
            arrayOfJSONTuples[tuple][objects].length > 0){

            for(object=0; object < arrayOfJSONTuples[tuple][objects].length; object++){
                //Converter.toGeoJSONFormat(arrayOfJSONTuples[tuple][objects][object])
                arrayOfJSONTuples[tuple][objects][object] = "derp"
              }
            }
          }
        }
      }
      return arrayOfJSONTuples
    },

    createGeoJSONLayer: function(geoJSON){
      MapBuilder.map.markerLayer.setGeoJSON(geoJSON)
    },

    addMarkersToLayer: function(photoObjects){
      for(i=0; i<photoObjects.length; i++){
        MapBuilder.blueMarkerLayer = L.mapbox.markerLayer(photoObjects[i]).addTo(MapBuilder.map)
      }
    }

  // mapController: function(media_collection) {
  //   var geoJsonCollection = []
  //   for(var i=0; i<media_collection.length; i++){
  //     geoJsonCollection.push(Converter.toGeoJSONFormat(media_collection[i]))
  //   }
  //   MapBuilder.geoJsonCollection = geoJsonCollection
  //   MapBuilder.addMarkerIncrementally(0)
  // },

  // addMarkerIncrementally: function (index) {
  //   MapBuilder.blueMarkerLayer = L.mapbox.markerLayer(MapBuilder.geoJsonCollection[index]).addTo(MapBuilder.map)
  //   var that = this
  //   setTimeout(function(){ if (index < MapBuilder.geoJsonCollection.length){
  //     that.addMarkerIncrementally(++index)}
  //   }, 1)
  //   toolTipModifier.handleToolTips()
  // }
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
},

Converter = {
    //should this be done in ruby land instead to minimize number of format conversions
    toGeoJSONFormat: function(media){
      if(media){
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [media.long,media.lat]
          },
          properties: {
            title: "Salar sucks",
            description: '<img src=' + media.thumbnail_url + '>',
            icon: {
              iconUrl: "http://imgur.com/hZE9VrA.png",
          iconSize: [6,6], //icon size
          iconAnchor: [10,10] //point of icon that corresponds to marker location
        }
      }
    }
  }
}
}

