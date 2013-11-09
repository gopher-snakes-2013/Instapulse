class HardWorker
  include Sidekiq::Worker
  include Sidetiq::Schedulable

  #per minute
  def self.second_counter(seconds)
    seconds_in_minute = []
    counter = 0
    until counter > 59
      seconds_in_minute << counter
      counter += seconds
    end
    return seconds_in_minute
  end


  recurrence { minutely.second_of_minute(HardWorker.second_counter(4)) }

  def perform
    puts 'Salar sucks'
  end

end



# research schedule 

#   ---------------------------------

# Clean-up worker

#   "every day delete data if Instagram.time < current time - 1 week"


# heroku app settings will show current workers & dynos
#   pay past 1 dyno, 0 workers

module DataScraper

  min_timestamp = 1383288660
  max_timestamp = 1383288690
  returned_pictures = 15
  search_interval = max_timestamp - min_timestamp

  def set_min_timestamp
    min_timestamp = max_timestamp
  end

  def set_max_timestamp
    if returned_pictures < 16
      search_interval += 1
    elsif returned_pictures > 16
      search_interval -= 1
    end
    max_timestamp += search_interval
  end

end


class HardWorker
  include Sidekiq::Worker
  include Sidetiq::Schedulable

  #per minute
  def self.second_counter(seconds)
    seconds_in_minute = []
    counter = 0
    until counter > 59
      seconds_in_minute << counter
      counter += seconds
    end
    return seconds_in_minute
  end


  recurrence { minutely.second_of_minute(HardWorker.second_counter(4)) }

  def perform
    @media = Instagram.media_search("37.768815","-122.439736", {distance: 5000, min_timestamp: DataScraper::set_min_timestamp, max_timestamp: DataScraper::set_max_timestamp})
    write to db (ensuring unique)
  end

end

delete worker when caught up to present and request Instagram send us live updates 
http://instagram.com/developer/realtime/











