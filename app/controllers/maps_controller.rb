class MapsController < ApplicationController
	
	def index
		# instagram_media = Instagram.media_search("37.768815","-122.439736", {distance: 5000, max_timestamp: 1383288690, min_timestamp: 1383288660})
		
	instagram_media = [ 
		{
	   "attribution" => nil,
	          "tags" => [],
	      "location" => {
	     "latitude"  => 37.793761667,
	    "longitude"  => -122.402016667
	    }
	  }
	]

	output = []

	instagram_media.each do |photo|
		lat = photo.location.latitude
		long = photo.location.longitude
		output << [lat,long]
	end

		render :json => output
	end

end




