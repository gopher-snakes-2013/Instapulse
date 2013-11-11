describe('Converter', function () {
  var photo;
  var photoGeoJSON;
  var arrayOfGeoJSONs;
  var photoSet;

  beforeEach(function(){
    photo = { longitude: 37.68, latitude: -127.54, thumbnail_url: "http://imgur.com/hZE9VrA.png"  };

    photoGeoJSON = {
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
            iconAnchor: [10,10]
          }
        }
      }

    photoSet = [photo, photo, photo];
    arrayOfGeoJSONs = [photoGeoJSON, photoGeoJSON, photoGeoJSON];
    TupleOfGeoJSONarrays = [arrayOfGeoJSONs, arrayOfGeoJSONs]

  })

  describe('toGeoJSONFormat', function(){
    it("should return a GeoJSON when given a photo object", function(){
      expect(Converter.toGeoJSONFormat(photo)).toEqual(photoGeoJSON);
    });
  });

  describe('getPhotoGeoJSONs', function(){
    beforeEach(function() {
      photoGeoJSON.geometry.coordinates = [37.68, -127.54];
      photoGeoJSON.properties.description = '<img src="http://imgur.com/hZE9VrA.png">';
    });

    it("returns an array of GeoJSONs when giben a collection of Photo objects", function() {
      spyOn(Converter, 'toGeoJSONFormat').andReturn(photoGeoJSON);
      expect(Converter.getPhotoGeoJSONs(photoSet)).toEqual(arrayOfGeoJSONs);
    });
  });

  describe("getTupleOfGeoJSONarrays", function(){
    it("returns a tuple of GeoJSON arrays for each JSON tuple supplied", function(){
      spyOn(Converter, 'getPhotoGeoJSONs').andReturn(arrayOfGeoJSONs);
      var individualTuple = [photoSet, photoSet];
      expect(Converter.getTupleOfGeoJSONarrays(individualTuple)).toEqual(TupleOfGeoJSONarrays);
    });
  });

  describe("seperateTuples", function(){
    it("returns a collection of GeoJSON tuples for each array of JSON tuples supplied", function(){
      spyOn(Converter, 'getTupleOfGeoJSONarrays').andReturn(TupleOfGeoJSONarrays);
      var arrayOfJSONTuples = [[photo, photo, photo],[photo, photo]];
      expect(Converter.seperateTuples(arrayOfJSONTuples));
    });
  });

});
