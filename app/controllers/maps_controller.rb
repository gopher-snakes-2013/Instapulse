class MapsController < ApplicationController
	def index

    Sidekiq.configure_server do |config|
      config.poll_interval = 0.5
    end


    Sidetiq.configure do |config|
      config.resolution = 0.5
    end

    HardWorker.perform_asynch

	end
end
