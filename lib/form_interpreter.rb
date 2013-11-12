#ryan!!

module FormInterpreter

  def self.military_to_unix_time(military_time)
    year = 2013
    month = 10
    day = 31

    Time.new(year, month, day, military_time.split('')[0,2].join.to_i, 0, 0, "-08:00").to_i
  end

  def self.playback_speed_to_seconds_interval(speed)
    case speed
    when '0.5'
      30
    when '1'
      60
    when '2'
      120
    when '3'
      180
    when '6'
      360
    when '8'
      480
    when '15'
      900
    when '30'
      1800
    when '90'
      5400
    when '180'
      10800
    end
  end

  def self.interpret_form(start_time, end_time, speed)
    playback_attributes = {}
    playback_attributes[:start_time] = military_to_unix_time(start_time)
    playback_attributes[:end_time] = military_to_unix_time(end_time)
    playback_attributes[:interval] = playback_speed_to_seconds_interval(speed)
    return playback_attributes
  end
end

