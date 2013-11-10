
class MapsController < ApplicationController
  
  include Scraper

  def index
  # ap Instagram.media_search("37.768815","-122.439736", {distance: 5000, max_timestamp: 1383202890, min_timestamp: 1383202800})

    array_of_time_windows = Scraper.return_time_tuples(1383202800, 1383202890)
    collection_of_json_arrays = Scraper.instagram_api_call(array_of_time_windows)
   ap group_of_pictures = Scraper.separate_json(collection_of_json_arrays)
    Scraper.write_to_DB(group_of_pictures)



    media = Photo.all
    output =  Photo.grab_lat_longs(media)

    respond_to do |format|
      format.html
      format.json { render :json => output.to_json  }
    end

      # Uncomment if want to see file with JSON
      # File.open("test.json", "w") do |f|
      #   f.write(output.to_json)
      # end
  end
end
