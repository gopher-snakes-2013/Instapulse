module FormInterpreter

  def self.military_to_unix_time(military_time)
    year = 2013
    month = 10
    day = 31

    Time.new(year, month, day, military_time.split('')[0,2].join.to_i, 0, 0, "-08:00").to_i
  end

  def self.playback_speed_to_seconds_interval(speed)
    return speed * 60
  end

  def self.interpret_form(start_time, end_time, speed)
    playback_attributes = {}
    playback_attributes[:start_time] = military_to_unix_time(start_time)
    playback_attributes[:end_time] = military_to_unix_time(end_time)
    playback_attributes[:interval] = playback_speed_to_seconds_interval(speed)
    return playback_attributes
  end
end

