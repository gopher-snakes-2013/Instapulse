class HardWorker
  include Sidekiq::Worker
  include Sidetiq::Schedulable

  recurrence { secondly }

  def perform
    puts 'Doing hard work'
  end

end





# Data-population worker
#     "every 1 second make API call for data in variable timespan
#     to populate initial DB until end of timespan near current time"

#     then

#     "add Instagram real-time listener to instagram for geography"


#   ---------------------------------

# Clean-up worker

#   "every day delete data if Instagram.time < current time - 1 week"
