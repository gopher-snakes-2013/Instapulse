class MapsController < ApplicationController
include FormInterpreter

  def index
    if params[:start_time]
    	playback_attributes = FormInterpreter.interpret_form(params[:start_time],params[:end_time],params[:speed],params[:event])
      output = Photo.fetch_data_array(playback_attributes)
    end
      respond_to do |format|
        format.html
        format.json { render :json => output.to_json  }
  	end
  end
end

# Uncomment if want to see file with JSON
# File.open("test.json", "w") do |f|
#   f.write(output.to_json)
# end

    # timestart = params[:timestart]
    # timeend   = params[:timeend]
    # sometime = method_to_calculate_stuff(timestart, timeend)

