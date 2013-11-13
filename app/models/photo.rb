class Photo < ActiveRecord::Base
	attr_accessible :insta_id,:latitude,:longitude,:location_name,:created_time,:like_count,:link,:thumbnail_url,:caption

	validates :insta_id, uniqueness: true, presence: true

#Want keys saved as symbols?  (update test line 42 if so)
	def self.grab_media_info(media)
		output = []
		media.each do |photo|
			photo_object = {}
			photo_object["latitude"] = photo.latitude
			photo_object["longitude"] = photo.longitude
			photo_object["thumbnail_url"] = photo.thumbnail_url
			photo_object["link_url"] = photo.link
			photo_object["photo_caption"] = photo.caption[0..30].gsub(/\s\w+\s*$/,'...') if photo.caption
			photo_object["created_time"] = photo.created_time
			output << photo_object
		end
		output
	end

	def self.fetch_data_array(playback_attributes)
		start_time = playback_attributes[:start_time]
		end_time = playback_attributes[:end_time]
		interval = playback_attributes[:interval]

		all_from_db = Photo.where(created_time: (start_time)..(end_time))
		digested_photos = Photo.grab_media_info(all_from_db)
	end
end

#   all_from_db = Photo.where(created_time: (0)..(1383213000))
