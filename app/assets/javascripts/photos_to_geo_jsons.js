PhotosToGeoJSONs = {
  convert: function(arrayOfJSONs){
    var convertedPhotos = []
    $.each(arrayOfJSONs, function(index, photoJSON){
      geoPhoto = PhotosToGeoJSONs.convertPhoto(photoJSON)
      convertedPhotos.push(geoPhoto)
    })
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
  }
}

