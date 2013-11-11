
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


[Array[0], Array[0]]
[Array[0], Array[2]]
[Array[2], Array[0]]
[Array[0], Array[2]]
[Array[2], Array[0]]
[Array[0], Array[1]]
[Array[1], Array[2]]
[Array[2], Array[1]]
[Array[1], Array[1]]
[Array[1], Array[1]]
[Array[1], Array[2]]
[Array[2], Array[3]]
[Array[3], Array[3]]
[Array[3], Array[1]]
[Array[1], Array[0]]
[Array[0], Array[1]]
[Array[1], Array[1]]
[Array[1], Array[1]]
[Array[1], Array[1]]
[Array[1], Array[0]]
[Array[0], Array[2]]
