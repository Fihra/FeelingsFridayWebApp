Rails.application.routes.draw do
  resources :comments
  resources :feelings
  resources :users
  get "/user_feelings/:id", to: "users#user_feelings"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
