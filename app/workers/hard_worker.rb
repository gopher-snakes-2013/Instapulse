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



# schedule 

# Data-population worker
#     "every 5 second make API call for data in variable timespan
#     to populate initial DB until end of timespan near current time"

#     then

#     "add Instagram real-time listener to instagram for geography"


#   ---------------------------------

# Clean-up worker

#   "every day delete data if Instagram.time < current time - 1 week"


# heroku app settings will show current workers & dynos
#   pay past 1 dyno, 0 workers
