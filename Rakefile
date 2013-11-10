#!/usr/bin/env rake
# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Instapulse::Application.load_tasks

namespace :db do
	desc "Make API call to feed DB ARGS"
	task :scrape, [:time_start, :time_end] => :environment do |t, args|
		require "Scraper"
		array_of_time_windows = Scraper.return_time_tuples(args[:time_start].to_i, args[:time_end].to_i)
		collection_of_json_arrays = Scraper.instagram_api_call(array_of_time_windows)
		group_of_pictures = Scraper.separate_json(collection_of_json_arrays)
		Scraper.write_to_DB(group_of_pictures)
	end
end

