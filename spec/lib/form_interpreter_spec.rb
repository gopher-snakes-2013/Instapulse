require 'spec_helper'

describe "FormInterpreter" do

  context "playback_speed_to_seconds_interval" do
    it "should return an interval 60 times the speed" do
      expect(FormInterpreter.playback_speed_to_seconds_interval('30')).to eq(1800)
    end
  end

  context "military_to_unix_time" do
  	it "converts military time on Oct 31 to unix time" do
  		expect(FormInterpreter.military_to_unix_time('1')).to eq(1383210000)
  	end
  end

  context "interpret_form" do
  	it "converts start time, end time, and an interval from AJAX to usable paramaters" do
  		expect(FormInterpreter.interpret_form('1', '2', 30)).to eql({:start_time => 1383210000, :end_time => 1383213600, :interval => 1800})
		end
  end
end