class MeasurementsController < ApplicationController
    def create 
        measurement = Measurement.create!(measurements_params)
        render json: measurement, status: :created
    end

    private

    def measurements_params
      params.permit(:patient_id, :date, :measurement, :measurement_label)
    end
end
