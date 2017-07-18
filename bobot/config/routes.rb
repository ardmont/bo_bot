Rails.application.routes.draw do
  
  mount Messenger::Engine, at: "/messenger"
  get 'messenger/get_violence', to:"messenger#get_violence"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
