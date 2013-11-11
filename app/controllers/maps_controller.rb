
class MapsController < ApplicationController
  def index
  	media = Photo.order(:created_time)
  	output =  Photo.grab_media_info(media)
  	
  	# to call new methods use code below
  	# playback_attributes = FormInterpreter::interpret_form(arg 1,2,3)
  	# output = Photo.create_tuples(playback_attributes)

  	respond_to do	|format|
  		format.html
  		format.json { render :json => output.to_json  }
  	end
  end
end

# Uncomment if want to see file with JSON
# File.open("test.json", "w") do |f|
#   f.write(output.to_json)
# end
