#Citygram

DBC Final Project: Instagram Heatmaps

Team: [Juke](https://github.com/boblikesoup), [Ryan](https://github.com/ryanhedges), [Daniel](https://github.com/trostli), [Salar](https://github.com/salarkhan)

Overview
------------------------------------------------------------------
An app that allows you to discover trends through Instagram photos over time and space in San Francisco

APIs
------------------------------------------------------------------
MapBox: Layer-based map. While beautiful, its treatment of markers as individual layers proved to be a major sticking point. We originally envisioned having all the data points (about 16 thousand of them) of a single day on the map--turns out MapBox can't handle 16 thousand layers.

Instagram: Media search queries based on Lat/Long/Radius. Surprised us with easy it was to navigate the returned JSON.
