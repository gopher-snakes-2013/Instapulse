  $(document).ready(function(){

  	var createMap = function(){
      return L.mapbox.map('map', 'salarkhan.g7l7ga11').setView([37.769, -122.439],13)
    }

    function customizeMarkers(map){
     map.markerLayer.on('layeradd', function(e){
      var marker = e.layer,
      feature = marker.feature;
      marker.setIcon(L.icon(feature.properties.icon));
    })
   }

   var getInstagram = function getInstagram(){
    $.ajax({
      url: '/',
      type: 'GET',
      dataType: 'json',
      success: postToMap
    })
  }

  function postToMap(location_JSON) {
    var locations = location_JSON
    var geoLocations = []
    for(var i=0; i<locations.length; i++){
      geoLocations.push(convertToGeoJSONFormat(locations[i]))
    }
    var map = createMap()
    customizeMarkers(map)
    map.markerLayer.setGeoJSON(geoLocations);
  }

  //should this be done in ruby land instead to minimize number of format conversions
  function convertToGeoJSONFormat(location){
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [location[1],location[0]]
      },
      properties: {
       title: "I'M A MARKER, BITCH",
       description: 'meow',
       icon: {
        iconUrl: "http://leafletjs.com/docs/images/leaf-green.png",
          iconSize: [100,100], //icon size
          iconAnchor: [50,50], //point of icon that corresponds to marker location
          popupAnchor: [0,-55], //point from which popup should open relative to marker
          className: "leaflet-marker-icon"
        }
      }
    }
  }

  function initialize(){
    getInstagram() 
  }

  initialize()
})
