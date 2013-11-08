require './app'

100.times do |i|
  Photo.create(
  :insta_id => i,
  :latitude => (37.768815 * (rand/1000 + 1)),
  :longitude => (-122.439736 * (rand/1000 + 1)),
  :location_name => Faker::Address.street_name,
  :created_time => 1383288850, 
  :like_count => rand(20), 
  :link => 'http://instagram.com/p/gKaFkat0Tj/' , 
  :thumbnail_url => "http://origincache-prn.fbcdn.net/1173089_566382760098534_103778226_s.jpg",
  :caption => Faker::Lorem.words.map { |word| "#"+word}.join(" ") )
end
