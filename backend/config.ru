# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

run Rails.application

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*' # Change this to your frontend's URL in production
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
