#31st 12am: 1383202800
#1st 12am:  1383289200
def return_time_tuples(start_time, end_time)
  time_tuples = []
  2880.times do
    time_tuples << [start_time, end_time]
    start_time += 30
    end_time += 30
  end
  return time_tuples
end

describe "TUPLEZZZ" do
  it "should return 2880 tuples with intervals of 30 seconds" do
    time_tuples = return_time_tuples(0,30)
    time_tuples[1].should eq [30,60]
  end
end