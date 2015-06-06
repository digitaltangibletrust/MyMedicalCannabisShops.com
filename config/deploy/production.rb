server "166.78.105.47", :app, :web, :db, :primary => true
set :deploy_to, "/var/www/app"
set :branch, "master"
set :node_env, "production"
