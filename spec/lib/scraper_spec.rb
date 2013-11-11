require 'spec_helper'

describe "Scraper" do
  let(:igdata) {
    {
      "attribution"=> nil,
      "tags"=>  [],
      "type"=> "image",
      "location"=>  {
        "latitude"=> 37.760208333,
        "longitude"=> -122.422163333
      },
      "comments"=>  {
        "count"=> 0,
        "data"=>  []
      },
      "filter"=> "Mayfair",
      "created_time"=> "1384148161",
      "link"=> "http://instagram.com/p/gkBV7yrjps/",
      "likes"=>  {
        "count"=> 0,
        "data"=>  []
      },
      "images"=>  {
        "low_resolution"=>  {
          "url"=> "http://distilleryimage8.s3.amazonaws.com/269e609a4a9311e3931a0eb48f42df98_6.jpg",
          "width"=> 306,
          "height"=> 306
        },
        "thumbnail"=>  {
          "url"=> "http://distilleryimage8.s3.amazonaws.com/269e609a4a9311e3931a0eb48f42df98_5.jpg",
          "width"=> 150,
          "height"=> 150
        },
        "standard_resolution"=>  {
          "url"=> "http://distilleryimage8.s3.amazonaws.com/269e609a4a9311e3931a0eb48f42df98_8.jpg",
          "width"=> 640,
          "height"=> 640
        }
      },
      "users_in_photo"=>  [],
      "caption"=>  {
        "created_time"=> "1384148167",
        "text"=> "Cute",
        "from"=>  {
          "username"=> "sherlyn_eb_izzle",
          "profile_picture"=> "http://images.ak.instagram.com/profiles/profile_104872957_75sq_1380380475.jpg",
          "id"=> "104872957",
          "full_name"=> "Sherlyn"
        },
        "id"=> "586599807245498580"
      },
      "user_has_liked"=> false,
      "id"=> "586599756821576300_104872957",
      "user"=>  {
        "username"=> "sherlyn_eb_izzle",
        "website"=> "",
        "profile_picture"=> "http://images.ak.instagram.com/profiles/profile_104872957_75sq_1380380475.jpg",
        "full_name"=> "Sherlyn",
        "bio"=> "",
        "id"=> "104872957"
      }
    }
  }
  let(:parsed_ig_photo){
    {
      insta_id: "586599756821576300_104872957",
      latitude: 37.760208333,
      longitude: -122.422163333,
      created_time: "1384148161",
      like_count: 0,
      link: "http://instagram.com/p/gkBV7yrjps/",
      thumbnail_url: "http://distilleryimage8.s3.amazonaws.com/269e609a4a9311e3931a0eb48f42df98_5.jpg",
      caption: "Cute"
    }
  }

  context "return_time_tuples" do
    it "should return an array of time tuples when given a start and end time" do
      time_tuples = Scraper.return_time_tuples(1384147260, 1384147320)

      expect(time_tuples).to eq([[1384147260, 1384147290], [1384147290, 1384147320]])
    end
  end

  context "parseIGdata" do
    it "should create a hash of instagram photo data" do

      expect(Scraper.parseIGdata(igdata)).to eq(parsed_ig_photo)
    end
  end

  context "separate_json" do
    it "should return an array of photo hashes" do
      group_of_pictures = Scraper.separate_json([[igdata, igdata]])

      expect(group_of_pictures[1][:insta_id]).to eq("586599756821576300_104872957")
    end
  end

  context "write_to_DB" do
    it "should save an array of photos to the db" do
      expect{
        Scraper.write_to_DB([parsed_ig_photo])
        }.to change{Photo.count}.by(1)
    end
  end

end
