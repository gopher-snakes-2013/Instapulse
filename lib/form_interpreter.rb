module FormInterpreter

  def self.tz_for_ymd_in_2013(year, month, day)

    tz = tz_pst = "-08:00"
    tz_pdt = "-07:00"
    # hack -- between midnight and 2am this won't work
    # double-hack -- this is only valid for california in 2013
    # triple-hack -- use the geonames API to do this properly!
    # see: http://www.timeanddate.com/worldclock/timezone.html?n=137
    if month == 3 and day >= 10
      tz = tz_pdt
    elsif month > 3 and month < 11
      tz = tz_pdt
    elsif month == 11 and day <= 3
      tz = tz_pdt
    end
    tz
  end

  def self.military_to_unix_time(military_time, event)
    year = 2013

    case event
    when 'Halloween'
      month = 10
      day = 31
    when 'Bay to Breakers'
      month = 5
      day = 19
    when 'SF Giants'
      year = 2012
      month = 10
      day = 28
    when 'Folsom Street Fair'
      month = 9
      day = 29
    when 'Hottest day of the year'
      month = 5
      day = 2
    when 'Coldest day of the year'
      month = 10
      day = 31
    end

    tz = self.tz_for_ymd_in_2013(year, month, day)
    t = Time.new(year, month, day, military_time[0,2].to_i, military_time[2,2].to_i, 0, tz)
    t.to_i
  end


  def self.interpret_form(start_time, end_time, speed, event)
    playback_attributes = {}
    playback_attributes[:start_time] = military_to_unix_time(start_time, event)
    playback_attributes[:end_time] = military_to_unix_time(end_time, event)
    return playback_attributes
  end
end

#1383274859 at -8
#1383274859  at -7

