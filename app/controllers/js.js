
printMap = function(array_of_tuples){
  array_of_tuples.each do |tuple|
    create_layer(tuple[0])
    add_markers(tuple[1])
  end
}

create_layer = function(geoJSON) {
  MapBuilder.map.markerLayer.setGeoJSON(geoJSON)
}

add_markers = function(photoObjects) {
  photoObjects.each do |photo|
    L.mapbox.markerLayer(photo).addTo(MapBuilder.map)
  end
}

printMap(data)