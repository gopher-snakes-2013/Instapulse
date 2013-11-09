def write_to_DB(photo_attributes)
  Photo.create(photo_attributes)
end

def write_to_DB(photo_attributes_array)
  photo_attributes_array.each do |photo|
    Photo.create(photo)
  end
end
