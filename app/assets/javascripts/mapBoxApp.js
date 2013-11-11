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


Converter = {
  seperateTuples: function(arrayOfJSONTuples){
    var collectionOfGeoJSONTuples = []
    for(var tuple=0; tuple<arrayOfJSONTuples.length; tuple++){
      collectionOfGeoJSONTuples.push(Converter.getInsideTuple(arrayOfJSONTuples[tuple]))
    }
    return collectionOfGeoJSONTuples
  },

  getInsideTuple: function(individualTuple){
    var objectSet = []
    for(var objects=0; objects<individualTuple.length; objects++){
      objectSet.push(Converter.getObject(individualTuple[objects]))
    }
    return objectSet
  },

  getObject: function(objectSet){
    var arrayOfGeoJSONs = []
    for(var object=0; object<objectSet.length; object++){
      arrayOfGeoJSONs.push(Converter.toGeoJSONFormat(objectSet[object]))
    }
    return arrayOfGeoJSONs
  },

  toGeoJSONFormat: function(media){
    if(media){
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [media.longitude,media.latitude]
        },
        properties: {
          title: "Salar sucks",
          description: '<img src=' + media.thumbnail_url + '>',
          icon: {
            iconUrl: "http://imgur.com/hZE9VrA.png",
            iconSize: [10,10],
            iconAnchor: [50,50],
            popupAnchor: [0,-25]
          }
        }
      }
    }
  }
}

MapBuilder = {
    // var myArray = [
    //   [{a: 1}, {b:1}],
    //   [{a: 2}, {b:2}]
    // ]

  createMap: function(){
    return L.mapbox.map('map', 'salarkhan.g7l7ga11')
    .setView([37.769, -122.439],13)
  },

  mapController: function(arrayOfJSONTuples){
      var myArray = [
      [{a: 1}, {b:1}],
      [{a: 2}, {b:2}]
    ]

    var arrayOfGeoJSONTuples = Converter.seperateTuples(arrayOfJSONTuples)
    var counter = 0
    var intervalOutside = setInterval(function(){
      if(counter === myArray.length){
        clearInterval(intervalOutside)
      } else {
        MapBuilder.addMarkersToLayer(myArray[counter])
        console.log(myArray[counter])
        counter++;
      }
    }, 100)
  },

  createGeoJSONLayer: function(geoJSON){
    MapBuilder.map.markerLayer.setGeoJSON(geoJSON)
  },

  addMarkersToLayer: function(photoObjects){
    var counter = 0
    var intervalId = setInterval(function(){
      if(counter === photoObjects.length) {
        clearInterval(intervalId);
      } else {
        // console.log(photoObjects[counter])
        MapBuilder.decideWhetherToPost(photoObjects[counter])
        counter++
      }
    }, 50)
  },

  decideWhetherToPost: function(photoObjectArray){
    if(photoObjectArray.length > 0){
        console.log("derp",photoObjectArray)
    }
  }

  // addMarkerIncrementally: function(index) {
  //   MapBuilder.blueMarkerLayer = L.mapbox.markerLayer(MapBuilder.photoObjects[index]).addTo(MapBuilder.map)
  //   var that = this
  //   setTimeout(function(){ if (index < MapBuilder.photoObjects.length){
  //     that.addMarkerIncrementally(++index)}
  //   }, 100)
  //   toolTipModifier.handleToolTips()
  // }


  // mapController: function(media_collection) {
  //   var geoJsonCollection = []
  //   for(var i=0; i<media_collection.length; i++){
  //     geoJsonCollection.push(Converter.toGeoJSONFormat(media_collection[i]))
  //   }
  //   MapBuilder.geoJsonCollection = geoJsonCollection
  //   MapBuilder.addMarkerIncrementally(0)
  // },

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
}
