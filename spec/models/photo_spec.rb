require 'spec_helper'


describe Photo do
  let(:photo) {
    photo = Photo.new
    photo.insta_id = "xfsdfxfdsf34"
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
    expect {
      photo.save
      Photo.create(insta_id: "xfsdfxfdsf34")
    }.to change{Photo.count}.by(1)
  end

  it "should return an array of tuples of lat and long" do
  	photo.latitude = 2222.0
  	photo.longitude = 1111.0
  	photo.save
  	media = Photo.all
  	expect(Photo.grab_lat_longs(media)).to eql([[2222.0,1111.0]]) 
	end
end