def seperateJson(collection_of_jsons)
  group_of_pictures = []
  collection_of_jsons.each do |picture_info|
    group_of_pictures << parseIGdata(picture_info)    
  end
  group_of_pictures
end

def parseIGdata(instagram_json)
  ig_photo_info = {}
  
  instagram_json.
  data_from_json = instagram_json["data"]

  ig_photo_info[:insta_id] = data_from_json["id"]
  ig_photo_info[:latitude] = data_from_json["location"]["longitude"]
  ig_photo_info[:longitude] = data_from_json["location"]["longitde"]
  ig_photo_info[:location_name] = data_from_json["location"]["name"]
  ig_photo_info[:created_time] = data_from_json["created_time"]
  ig_photo_info[:like_count] = data_from_json["likes"]["count"]
  ig_photo_info[:link] = data_from_json["link"]
  ig_photo_info[:thumbnial] = data_from_json["images"]["thumbnial"]["url"]
  ig_photo_info[:caption] = data_from_json["caption"]["text"]

  return ig_photo_info
end