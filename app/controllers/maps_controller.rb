class MapsController < ApplicationController
	def index


    HardWorker.perform_async

	end
end
