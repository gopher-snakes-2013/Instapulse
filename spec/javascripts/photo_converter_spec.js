
describe('PhotosToGeoJSONs', function () {
  var photoJSON;
  var photoGeoJSON;
  var arrayOfGeoJSONs;
  var photoSet;

  beforeEach(function(){
    photoJSON = { longitude: 37.68, latitude: -127.54, thumbnail_url: "http://imgur.com/hZE9VrA.png"  };

    photoGeoJSON = {
        type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [photoJSON.longitude, photoJSON.latitude]
              },
              properties: {
                image: photoJSON.thumbnail_url,
                link_url: photoJSON.link_url,
                like_count: photoJSON.like_count,
                caption: photoJSON.photo_caption,
                created_time: photoJSON.created_time,
                blue_icon: {
                  iconUrl: "http://imgur.com/hZE9VrA.png",
                  iconSize: [6,6],    // 6x6 pixels
                  iconAnchor: [3,6],  // 3x6 pixels
                  className: "ig-dot"
                },
                white_icon: {
                  iconUrl: "http://i.imgur.com/NMYn0KU.png",
                  iconSize: [6,6],    // 6x6 pixels
                  iconAnchor: [3,6],  // 3x6 pixels
                  className: "ig-dot"
                }
              }
            }

    photoSet = [photoJSON, photoJSON, photoJSON];
    arrayOfGeoJSONs = [photoGeoJSON, photoGeoJSON, photoGeoJSON];
    TupleOfGeoJSONarrays = [arrayOfGeoJSONs, arrayOfGeoJSONs]

  })

  describe('toGeoJSONFormat', function(){
    it("should return a GeoJSON when given a photoJSON object", function(){
      expect(PhotosToGeoJSONs.convertPhoto(photoJSON)).toEqual(photoGeoJSON);
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
//       var arrayOfJSONTuples = [[photoJSON, photoJSON, photoJSON],[photoJSON, photoJSON]];
//       // TODO-JW: this is BORKEN
//       expect(PhotosToGeoJSONs.__borken__(arrayOfJSONTuples));
//     });
//   });

});
