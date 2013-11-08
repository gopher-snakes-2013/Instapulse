class CreatePhotos < ActiveRecord::Migration
  def up
    create_table :photos do |t|
      t.integer :insta_id
      t.float :latitude
      t.float :longitude
      t.string :location_name
      t.integer :created_time
      t.integer :like_count
      t.string :link
      t.string :thumbnail_url
      t.string :caption
    end
  end

  def down
    drop_table :photos
  end
end
