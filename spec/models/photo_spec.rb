require 'spec_helper'


describe Photo do
  let(:photo_template) { build(:photo) }
  let(:photo) { create(:photo) }

  it "should save with valid attributes" do
    expect {
      photo
    }.to change{Photo.count}.from(0).to(1)
  end

  it "should not save without an insta_id" do
    expect{
    	photo_template.insta_id = ""
    	photo_template.save
    }.to change{Photo.count}.by(0)
  end


  it "should have a unique insta_id" do
    photo
    expect {
      Photo.create(insta_id: "xfsdfxfdsf34")
    }.to_not change{Photo.count}
  end

  context "grab_media_info" do
    it "should return an array of objects from db with latitude, longitude, and thumbnail_url" do
    	photo
      photo_from_db = Photo.where(created_time: 20)

    	expect(Photo.grab_media_info(photo_from_db)[0]).to include("latitude" => 2222.0, "longitude" => 1111.0, "thumbnail_url" => "imapicture.jpg") 
	  end 
  end

  context "create_tuples" do
    it "should return an array of tuples of objects" do
      photo
      expect(Photo.create_tuples({:start_time => 0, :end_time => 30, :interval => 30})[0][1][0]).to include("latitude" => 2222.0)
    end
  end
end