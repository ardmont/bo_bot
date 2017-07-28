Rails.application.routes.draw do
  
  mount Messenger::Engine, at: "/messenger"
  get 'messenger/get_violence', to:"messenger#get_violence"
  get 'messenger/get_violence_by_type/:violence_type', to:"messenger#get_violence_by_type"
  get '/navbar', :to => redirect('/templates/navbar.html')
  get '/home', :to => redirect('/templates/home.html')
  get '/estatisticas', :to => redirect('/templates/estatisticas.html')
  get '/filtros', :to => redirect('/templates/filtros.html')
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
