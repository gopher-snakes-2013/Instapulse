module Scraper

  def self.return_time_tuples(start_time, end_time)
    number_of_intervals = (end_time - start_time)/30
    time_tuples = []
    number_of_intervals.times do
      time_tuples << [start_time, end_time]
      start_time += 30
      end_time += 30
    end
    return time_tuples
  end

  def self.instagram_api_call(array_of_time_windows)
    collection_of_json_arrays = []
    array_of_time_windows.each do |time_window|
      array_of_media_JSONs = Instagram.media_search("37.768815","-122.439736", {distance: 5000, max_timestamp: time_window[1], min_timestamp: time_window[0]})
      collection_of_json_arrays << array_of_media_JSONs
      sleep(5)
    end
    return collection_of_json_arrays
  end



  def self.separate_json(collection_of_json_arrays)
    group_of_pictures = []
    collection_of_json_arrays.each do |collection_of_jsons|
      collection_of_jsons.each do |picture_info|
        group_of_pictures << Scraper.parseIGdata(picture_info) unless picture_info.nil?
      end
    end
    return group_of_pictures
  end

  def self.parseIGdata(instagram_json)
    ig_photo_info = {}

    ig_photo_info[:insta_id] = instagram_json["id"]
    ig_photo_info[:latitude] = instagram_json["location"]["latitude"]
    ig_photo_info[:longitude] = instagram_json["location"]["longitude"]
    ig_photo_info[:location_name] = instagram_json["location"]["name"] unless instagram_json["location"]["name"].nil?
    ig_photo_info[:created_time] = instagram_json["created_time"]
    ig_photo_info[:like_count] = instagram_json["likes"]["count"]
    ig_photo_info[:link] = instagram_json["link"] unless instagram_json["link"].nil?
    ig_photo_info[:thumbnail_url] = instagram_json["images"]["thumbnail"]["url"] unless instagram_json["images"]["thumbnail"]["url"].nil?
    ig_photo_info[:caption] = instagram_json["caption"]["text"] unless instagram_json["caption"].nil?

    return ig_photo_info
  end

  def self.write_to_DB(group_of_pictures)
    group_of_pictures.each do |photo|
      Photo.create(photo)
    end
  end
end
