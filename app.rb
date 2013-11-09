
require "sinatra"
require 'sinatra/activerecord'
require "instagram"
require "json"

if Sinatra::Application.development?
  require 'dotenv'
  Dotenv.load(".env")
  require "awesome_print"
  require "faker"
end

require_relative './photo'

set :database, 'postgres://localhost/Instapulse' || ENV['DATABASE_URL']


enable :sessions



Instagram.configure do |config|
  config.client_id = ENV['INSTA_ID']
  config.client_secret = ENV['INSTA_SECRET']
end

get "/" do
  '<a href="/oauth/connect">Connect with Instagram</a>'
end

get "/oauth/connect" do
  redirect Instagram.authorize_url(:redirect_uri => ENV['CALLBACK_URL'])
end

get "/oauth/callback" do
  response = Instagram.get_access_token(params[:code], :redirect_uri => ENV['CALLBACK_URL'])
  session[:access_token] = response.access_token
  redirect "/feed"
end

get "/feed" do
  client = Instagram.client(:access_token => session[:access_token])
  user = client.user

  html = "<h1>#{user.username}'s recent photos</h1>"
  for media_item in client.user_recent_media
    html << "<img src='#{media_item.images.thumbnail.url}'>"
  end
  html
end

get "/search" do
  erb :search
end

# Pulls from the DB
post "/search" do
  @media = Photo.all
  output = []

  @media.each do |photo|
    lat = photo.latitude
    long = photo.longitude
    output << [lat,long]
  end
  output.to_json
end

# Pulls from the API

# post "/search" do
#   ap @media = Instagram.media_search("37.768815","-122.439736", {distance: 5000, max_timestamp: 1383288690, min_timestamp: 1383288660})
#   output = []

#   @media.each do |photo|
#     lat = photo.location.latitude
#     long = photo.location.longitude
#     output << [lat,long]
#   end
#   output.to_json
# end


