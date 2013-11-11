describe('Converter', function () {
  var photo;
  var photoJSON;

  beforeEach(function(){
    photo = { longitude: 37.68, latitude: -127.54, thumbnail_url: "http://imgur.com/hZE9VrA.png"  };
    photoJSON = {
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

  })

  // context('seperateTuples', function(){
  //   it("should return a collection of GeoJSON tuples", function(){
  //       var arrayOfJSONTuples = [[{ "photo": "salar sucks" }, { "photo": "salar sucks" }, { "photo": "salar sucks" }],
  //       [{ "photo": "salar sucks" }, { "photo": "salar sucks" },]]
  //       var collectionOfGeoJSONTuples = Converter.seperateTuples(arrayOfJSONTuples)
  //     })
  //   })

  describe('toGeoJSONFormat', function(){
    it("should return a GeoJSON when given a photo object", function(){
      
      expect(Converter.toGeoJSONFormat(photo)).toEqual(photoJSON);
    });
  });

  describe('getPhoto', function(){
    beforeEach(function() {
      photoJSON.geometry.coordinates = [37.68, -127.54];
      photoJSON.properties.description = '<img src="http://imgur.com/hZE9VrA.png">';
    })

    it("returns an array of GeoJSONs when giben a collection of Photo objects", function() {
      spyOn(Converter, 'toGeoJSONFormat').andReturn(photoJSON);
      var photoSet = [photo, photo, photo];
      expect(Converter.getPhoto(photoSet)).toEqual([photoJSON, photoJSON, photoJSON]);
    })
  });

});
