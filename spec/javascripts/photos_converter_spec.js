
describe('PhotosToGeoJSONs', function () {
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
          image : 'http://imgur.com/hZE9VrA.png',
          link_url : undefined,
          caption : undefined,
          created_time : undefined,

          icon: {
            iconUrl: "http://imgur.com/hZE9VrA.png",
            iconSize: [6,6],
            iconAnchor: [3,6],
            className: 'ig-dot'
          }
        }
      }

    photoSet = [photo, photo, photo];
    arrayOfGeoJSONs = [photoGeoJSON, photoGeoJSON, photoGeoJSON];
    TupleOfGeoJSONarrays = [arrayOfGeoJSONs, arrayOfGeoJSONs]

  })

  describe('toGeoJSONFormat', function(){
    it("should return a GeoJSON when given a photo object", function(){
      expect(PhotosToGeoJSONs.convertPhoto(photo)).toEqual(photoGeoJSON);
    });
  });

  describe('getPhotoGeoJSONs', function(){
    beforeEach(function() {
      photoGeoJSON.geometry.coordinates = [37.68, -127.54];
    });

    it("returns an array of GeoJSONs when given a collection of Photo objects", function() {
      // spyOn(PhotosToGeoJSONs, 'convert').andReturn(photoGeoJSON);
      expect(PhotosToGeoJSONs.convert(photoSet)).toEqual(arrayOfGeoJSONs);
    });
  });

//   describe("getTupleOfGeoJSONarrays", function(){
//     it("returns a tuple of GeoJSON arrays for each JSON tuple supplied", function(){
//       spyOn(PhotosToGeoJSONs, 'getPhotoGeoJSONs').andReturn(arrayOfGeoJSONs);
//       var individualTuple = [photoSet, photoSet];
//       // TODO-JW: this is BORKEN
//       expect(PhotosToGeoJSONs.__borken__(individualTuple)).toEqual(TupleOfGeoJSONarrays);
//     });
//   });

//   describe("seperateTuples", function(){
//     it("returns a collection of GeoJSON tuples for each array of JSON tuples supplied", function(){
//       spyOn(PhotosToGeoJSONs, 'getTupleOfGeoJSONarrays').andReturn(TupleOfGeoJSONarrays);
//       var arrayOfJSONTuples = [[photo, photo, photo],[photo, photo]];
//       // TODO-JW: this is BORKEN
//       expect(PhotosToGeoJSONs.__borken__(arrayOfJSONTuples));
//     });
//   });

});
