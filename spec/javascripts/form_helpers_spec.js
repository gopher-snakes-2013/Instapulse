describe('FormHelpers', function () {

  describe('getSelectedEventTimeStamp', function(){
    it("should return the correct unix time stamp for the supplied event name", function(){
      // var event_name = 'Halloween'
      spyOn(FormHelpers.getSelectedEventTimeStamp, 'event_name').andReturn('Halloween')
      expect(FormHelpers.getSelectedEventTimeStamp).toEqual(1383202800)    
    })
  })
})
