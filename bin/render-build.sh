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
# postbuild
cp -a frontend/build/. public/