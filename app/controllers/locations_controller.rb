class LocationsController < ApplicationController
    def create 
        location = Location.create!(location_params)
        render json: location, status: :created
    end

    private

    def location_params
      params.permit(:trial_id, :facility, :city, :state, :zip, :country)
    end
end
