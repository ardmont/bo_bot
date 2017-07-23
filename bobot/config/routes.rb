Rails.application.routes.draw do
  
  mount Messenger::Engine, at: "/messenger"
  get 'messenger/get_violence', to:"messenger#get_violence"
  get 'messenger/get_violence_by_type/:violence_type', to:"messenger#get_violence_by_type"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
