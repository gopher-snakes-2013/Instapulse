require 'spec_helper'

describe "Scraper" do
  let(:igdata) { ScraperStub.igdata }
  let(:parsed_ig_photo) { ScraperStub.parsed_ig_photo }

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
