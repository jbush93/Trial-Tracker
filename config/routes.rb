Rails.application.routes.draw do
  resources :events
  resources :users
  resources :measurements
  resources :notes
  resources :outcomes
  resources :trials
  resources :conditions
  resources :locations
  resources :arm_groups
  resources :patients
  resources :documents

  post '/login', to: 'sessions#create'
  delete '/login', to: 'sessions#destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
