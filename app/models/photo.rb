class Photo < ActiveRecord::Base
	attr_accessible :insta_id,:latitude,:longitude,:location_name,:created_time,:like_count,:link,:thumbnail_url,:caption

	validates :insta_id, uniqueness: true, presence: true

	def self.grab_lat_longs(media)
		output = []
		media.each do |photo|
			lat = photo.latitude
			long = photo.longitude
			output << [lat,long]
		end
		output
	end
end
