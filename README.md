Citygram
========

DBC Final Project: Instagram Heatmaps


Juke, Ryan, Daniel, Salar




MAP BOX
------------------------------------------------------------------
Create a map on Map Box  http://leafletjs.com/reference.html#map  <<< primary map creation resource
var map = L.map('dom element id', {
    center: [51.505, -0.09],
    zoom: 13
});
------------------------------------------------------------------
Overlay an image on the map  http://leafletjs.com/reference.html#map
var imageUrl = 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
    imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];

L.imageOverlay(imageUrl, imageBounds).addTo(map);
------------------------------------------------------------------
Import a JSON and plot
"Returns this map's TileJSON object which determines its tile source, zoom bounds and other metadata."
var layer = L.mapbox.tileLayer('examples.map-20v6611k');  <<<< tileJSON object
