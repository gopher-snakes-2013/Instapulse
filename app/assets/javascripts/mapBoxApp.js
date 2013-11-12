$(document).ready(function(){
  MapBuilder.map = MapBuilder.createMap()
  MapBuilder.spittle = L.mapbox.markerLayer().addTo(MapBuilder.map)
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
    for(var k=0; k<arrayOfJSONTuples.length; k++){
      collectionOfGeoJSONTuples.push(Converter.getTupleOfGeoJSONarrays(arrayOfJSONTuples[k]))
    }
    return collectionOfGeoJSONTuples
  },

  getTupleOfGeoJSONarrays: function(individualTuple){
    var TupleOfGeoJSONarrays = []
    for(var j=0; j<individualTuple.length; j++){
      TupleOfGeoJSONarrays.push(Converter.getPhotoGeoJSONs(individualTuple[j]))
    }
    return TupleOfGeoJSONarrays
  },

  getPhotoGeoJSONs: function(photoSet){
    var arrayOfGeoJSONs = []
    for(var i=0; i < photoSet.length; i++){
      arrayOfGeoJSONs.push(Converter.toGeoJSONFormat(photoSet[i]))
    }
    return arrayOfGeoJSONs
  },

  toGeoJSONFormat: function(photo){
    if(photo){
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [photo.longitude, photo.latitude]
        },
        properties: {
          title: "Salar sucks",
          description: '<img src=' + photo.thumbnail_url + '>',
          icon: {
            iconUrl: "http://imgur.com/hZE9VrA.png",
            iconSize: [6,6],
            iconAnchor: [3,6]
          }
        }
      }
    }
  }
}

MapBuilder = {
  createMap: function(){
    return L.mapbox.map('map', 'salarkhan.g7l7ga11', { zoomControl: false })
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
    }, 500)
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
          MapBuilder.createGeoJSONLayer(photoObjects[counter])
          // MapBuilder.decideWhetherToPost(photoObjects[counter])
        }

        counter++
      }
    }, 250)
  },

  createGeoJSONLayer: function(geoJSON){
    //Can't remove layers
    // MapBuilder.map.markerLayer.eachLayer(
    //   function(l) { MapBuilder.map.markerLayer.removeLayer(l); }
    // );

    MapBuilder.map.removeLayer(MapBuilder.spittle)
    MapBuilder.map.markerLayer.setGeoJSON(geoJSON)
    console.log(MapBuilder.spittle)
    MapBuilder.spittle = L.mapbox.markerLayer().addTo(MapBuilder.map)
  },

  decideWhetherToPost: function(photoObjectArray){
      var counter = 0
      var objectInterval = setInterval(function(){
        if(counter === photoObjectArray.length){
          MapBuilder.map.removeLayer(MapBuilder.spittle)
          MapBuilder.spittle = L.mapbox.markerLayer().addTo(MapBuilder.map)
          clearInterval(objectInterval)
        }
        else {
          L.mapbox.markerLayer(photoObjectArray[counter]).addTo(MapBuilder.spittle)
          counter++
        }
      }, 500)
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
