
class MapsController < ApplicationController

  include Scraper

  def index
  # ap Instagram.media_search("37.768815","-122.439736", {distance: 5000, max_timestamp: 1383202890, min_timestamp: 1383202800}) 1383278400 1383282000



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
