require 'spec_helper'

describe "FormInterpreter" do

  context "tz_for_ymd_in_2013" do
    it "should return wether or not daylight savings time is in effect" do
      expect(FormInterpreter.tz_for_ymd_in_2013(2013, 10, 31)).to eq("-07:00")
    end
  end

  context "military_to_unix_time" do
  	it "converts military time on Oct 31 to unix time" do
  		expect(FormInterpreter.military_to_unix_time('0100', 'Halloween')).to eq(1383206400)
  	end
  end

  context "interpret_form" do
  	it "converts start time, end time, and an interval from AJAX to usable paramaters" do
  		expect(FormInterpreter.interpret_form('0100', '0200', 'Halloween')).to eql({:start_time => 1383206400, :end_time => 1383210000})
		end
  end
end
