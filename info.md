#31st 12am: 1383202800
#1st 12am:  1383289200

##### module test
describe "TUPLEZZZ" do
  it "should return 2880 tuples with intervals of 30 seconds" do
    time_tuples = return_time_tuples(0,30)
    time_tuples[1].should eq [30,60]
  end
end
