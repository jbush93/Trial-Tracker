#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
# clean
rm -rf public
# build
npm install --prefix frontend && npm run build --prefix frontend
# migrate
bundle exec rake db:migrate
# load seed data
DISABLE_DATABASE_ENVIRONMENT_CHECK=1 bundle exec rake db:reset
# postbuild
cp -a frontend/build/. public/