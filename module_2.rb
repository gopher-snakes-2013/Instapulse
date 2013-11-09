def instagram_api_call(array_of_time_windows)
  array_of_time_windows.each do |time_window|
    array_of_media_JSONs = Instagram.media_search("37.768815","-122.439736", {distance: 5000, max_timestamp: time_window[1], min_timestamp: time_window[0]})
    sleep(5)
    return array_of_media_JSONs
  end
end
