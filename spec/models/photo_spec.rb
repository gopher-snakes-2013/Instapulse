require 'spec_helper'


describe Photo do
  let(:photo) {
    photo = Photo.new
    photo.insta_id = "xfsdfxfdsf34"
    photo.latitude = 2222.0
    photo.longitude = 1111.0
    photo.thumbnail_url = "imapicture.jpg"
    photo.created_time = 20
    photo
   }

  it "should save with valid attributes" do
    expect {
      photo.save
    }.to change{Photo.count}.from(0).to(1)
  end

  it "should not save without an insta_id" do
    expect{
    	photo.insta_id = ""
    	photo.save
    }.to change{Photo.count}.by(0)
  end


  it "should have a unique insta_id" do
    photo.save
    expect {
      Photo.create(insta_id: "xfsdfxfdsf34")
    }.to_not change{Photo.count}
  end

  context "grab_media_info" do
    it "should return an array of objects from db with latitude, longitude, and thumbnail_url" do
    	photo.save
      photo_from_db = Photo.where(created_time: 20)

    	expect(Photo.grab_media_info(photo_from_db)[0]).to include("latitude" => 2222.0, "longitude" => 1111.0, "thumbnail_url" => "imapicture.jpg") 
	  end 
  end

  context "create_tuples" do
    it "should return an array of tuples of objects" do
      photo.save
      expect(Photo.create_tuples({:start_time => 0, :end_time => 30, :interval => 30})[0][1][0]).to include("latitude" => 2222.0)
    end
  end
end