class Photo < ActiveRecord::Base
	attr_accessible :insta_id,:latitude,:longitude,:location_name,:created_time,:like_count,:link,:thumbnail_url,:caption
end
