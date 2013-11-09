Instapulse::Application.routes.draw do
  resources :maps, :only => [:index]
  
  root :to => 'maps#index'
end



