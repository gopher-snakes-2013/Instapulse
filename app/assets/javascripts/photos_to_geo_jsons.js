PhotosToGeoJSONs = {
  convert: function(arrayOfJSONs){
    var convertedPhotos = []
    $.each(arrayOfJSONs, function(index, photoJSON){
      geoPhoto = PhotosToGeoJSONs.convertPhoto(photoJSON)
      convertedPhotos.push(geoPhoto)
    })
    // TODO-JW: this would also work
    // for (var i in arrayOfJSONs) {
    //   geoPhoto = PhotosToGeoJSONs.convertPhoto(arrayOfJSONs[i])
    //   convertedPhotos.push(geoPhoto)
    // }
    return convertedPhotos
  },

  convertPhoto: function(photoJSON){
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [photoJSON.longitude, photoJSON.latitude]
      },
      properties: {
        image: photoJSON.thumbnail_url,
        link_url: photoJSON.link_url,
        caption: photoJSON.photo_caption,
        created_time: photoJSON.created_time,
        icon: {
          iconUrl: "http://imgur.com/hZE9VrA.png",
          iconSize: [6,6],    // 6x6 pixels
          iconAnchor: [3,6],  // 3x6 pixels
          className: "ig-dot"
        }
      }
    }
  }
}

