describe('Converter', function () {
  var photo;

  beforeEach(function(){
    photo = { longitude: 37.68, latitude: -127.54, thumbnail_url: "http://imgur.com/hZE9VrA.png"  };
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
      
      expect(Converter.toGeoJSONFormat(photo)).toEqual({
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
      });
    });
  });

  describe('getPhoto', function(){
    var photoSet = [photo, photo, photo]
    expect(getPhoto)
  })

});
