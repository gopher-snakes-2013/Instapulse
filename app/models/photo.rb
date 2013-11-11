class Photo < ActiveRecord::Base
	attr_accessible :insta_id,:latitude,:longitude,:location_name,:created_time,:like_count,:link,:thumbnail_url,:caption

	validates :insta_id, uniqueness: true, presence: true

	def self.grab_media_info(media)
		output = []
		media.each do |photo|
			photo_object = {}
			photo_object["lat"] = photo.latitude
			photo_object["long"] = photo.longitude
			photo_object["thumbnail_url"] = photo.thumbnail_url
			output << photo_object
		end
		output
	end

	def self.create_tuples(params)
		start_time = params[:start_time]
		end_time = params[:end_time]
		interval = params[:interval]

		time_keeper = start_time
		batch_time = interval / 2
		iterate = true
		output = []
		until iterate == false
			tuple = []
			batch_A_complete_objects = Photo.where(created_time: (time_keeper)..(time_keeper + batch_time))
			batch_A_digested = Photo.grab_media_info(batch_A_complete_objects)
			tuple << batch_A_digested

			batch_B_complete_objects = Photo.where(created_time: (time_keeper + batch_time)..(time_keeper + interval))
			batch_B_digested = Photo.grab_media_info(batch_B_complete_objects)
			tuple << batch_B_digested

			output << tuple

			time_keeper += batch_time
			if time_keeper >= end_time
				iterate = false
			end
		end
		output
	end
end


#test calls for console:
	#x = Photo.create_tuples({start_time: 1383291500, end_time: 1383291800, interval: 60})
	# x = Photo.create_tuples({:start_time=>1383206400, :end_time=>1383210000,:interval=>30})