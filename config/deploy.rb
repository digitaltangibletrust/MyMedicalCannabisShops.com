require "bundler/capistrano"
require "capistrano/ext/multistage"

set :application, "mmcs"
set :scm, "git"
set :repository, "git@github.com:digitaltangibletrust/MyMedicalCannabisShops.com.git"
set :branch, "master"
set :deploy_to, "/var/www/app"
set :deploy_via, :copy
set :copy_strategy, :checkout
set :keep_releases, 5
set :use_sudo, false
set :copy_compression, :bz2
set :normalize_asset_timestamps, false
set :document_root, "/var/www/app"
set :ssh_options, {:forward_agent => true}
set :user, "bitcoin"
set :stages, ["production"]
set :default_stage, "production"

namespace :deploy do
    task :start, :roles => :app do
        run "cd #{current_path} && pm2 ping && NODE_ENV=#{node_env} pm2 startOrRestart processes/#{node_env}.json"
    end

    task :stop, :roles => :app do
        run "cd #{current_path} && pm2 ping && NODE_ENV=#{node_env} pm2 stop processes/#{node_env}.json"
    end

    task :restart, :roles => :app do
        start
    end

    task :npm_install, :roles => :app do
        run "cd #{release_path} && nodejs -v && NODE_ENV='' npm cache clean && NODE_ENV='' npm install && node_modules/bower/bin/bower install"
    end
    task :grunt_build, :roles => :app do
        run "cd #{release_path} && grunt build"
    end
    task :migrations, :roles => :app do
        run "cd #{release_path} && NODE_ENV=#{node_env} grunt migrate:up"
    end
end

after "deploy:update", "deploy:cleanup"
after "deploy:update_code", "deploy:npm_install"
after "deploy:npm_install", "deploy:grunt_build"
after "deploy:grunt_build", "deploy:migrations"
