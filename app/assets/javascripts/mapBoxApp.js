$(document).ready(function(){
  MapBuilder.map = MapBuilder.createMap()
  MapBuilder.spittleLayer = L.mapbox.markerLayer().addTo(MapBuilder.map)
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
  createMap: function(){
    return L.mapbox.map('map', 'salarkhan.g7l7ga11')
    .setView([37.769, -122.439],13)
  },

  mapController: function(arrayOfJSONTuples){
    var arrayOfGeoJSONTuples = Converter.seperateTuples(arrayOfJSONTuples)
    var counter = 0
    var arrayInterval = setInterval(function(){
      if(counter === arrayOfGeoJSONTuples.length){
        clearInterval(arrayInterval)
      } else {
        MapBuilder.addMarkersToLayer(arrayOfGeoJSONTuples[counter])
        counter++;
      }
    }, 1000)
  },


  createGeoJSONLayer: function(geoJSON){
    MapBuilder.map.markerLayer.setGeoJSON(geoJSON)
  },

  addMarkersToLayer: function(photoObjects){
    var counter = 0
    var tupleInterval = setInterval(function(){
      if(counter === photoObjects.length) {
        clearInterval(tupleInterval);
      } else {
        if (counter % 2 === 0){
          console.log("SLAP")
          MapBuilder.createGeoJSONLayer(photoObjects[counter])
        } else{
          console.log("spittle")
          MapBuilder.decideWhetherToPost(photoObjects[counter])
        }
        counter++
      }
    }, 500)
  },

  decideWhetherToPost: function(photoObjectArray){
      var counter = 0
      var objectInterval = setInterval(function(){
        if(counter === photoObjectArray.length){
          clearInterval(objectInterval)
        }
        else {
          // MapBuilder.spittleLayer = L.mapbox.markerLayer().addTo(MapBuilder.map)
          MapBuilder.spittleLayer = L.mapbox.markerLayer(photoObjectArray[counter]).addTo(MapBuilder.map)
          counter++
        }
      }, 50)
    }
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

    //      var myArray = [
    //   [
    //   [{a: 0}, {b:1}],
    //   [{c: 0}, {d:1}],
    //   [],
    //   [{e: 0}]
    //   ]
    // ]