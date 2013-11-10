class Photo < ActiveRecord::Base
	attr_accessible :insta_id,:latitude,:longitude,:location_name,:created_time,:like_count,:link,:thumbnail_url,:caption

	validates :insta_id, uniqueness: true 

	def self.grab_media_info(media)
		output = []
		media.each do |photo|
			lat = photo.latitude
			long = photo.longitude
			thumbnail_url = photo.thumbnail_url
			output << [lat,long, thumbnail_url]
		end
		output
	end
end
