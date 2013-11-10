#31st 12am: 1383202800
#1st 12am:  1383289200
def return_time_tuples(start_time, end_time)
  time_tuples = []
  2880.times do
    time_tuples << [start_time, end_time]
    start_time += 30
    end_time += 30
  end
  return time_tuples
end

describe "TUPLEZZZ" do
  it "should return 2880 tuples with intervals of 30 seconds" do
    time_tuples = return_time_tuples(0,30)
    time_tuples[1].should eq [30,60]
  end
end
######################################################
def instagram_api_call(array_of_time_windows)
  array_of_time_windows.each do |time_window|
    array_of_media_JSONs = Instagram.media_search("37.768815","-122.439736", {distance: 5000, max_timestamp: time_window[1], min_timestamp: time_window[0]})
    sleep(5)
    return array_of_media_JSONs
  end
end
#########################################
def seperateJson(collection_of_jsons)
  group_of_pictures = []
  collection_of_jsons.each do |picture_info|
    group_of_pictures << parseIGdata(picture_info)    
  end
  group_of_pictures
end

def parseIGdata(instagram_json)
  ig_photo_info = {}
  data_from_json = instagram_json["data"]

  ig_photo_info[:insta_id] = data_from_json["id"]
  ig_photo_info[:latitude] = data_from_json["location"]["longitude"]
  ig_photo_info[:longitude] = data_from_json["location"]["longitude"]
  ig_photo_info[:location_name] = data_from_json["location"]["name"]
  ig_photo_info[:created_time] = data_from_json["created_time"]
  ig_photo_info[:like_count] = data_from_json["likes"]["count"]
  ig_photo_info[:link] = data_from_json["link"]
  ig_photo_info[:thumbnail_url] = data_from_json["images"]["thumbnail"]["url"]
  ig_photo_info[:caption] = data_from_json["caption"]["text"]

  return ig_photo_info
end
##############################################

def write_to_DB(photo_attributes_array)
  photo_attributes_array.each do |photo|
    Photo.create(photo)
  end
end

