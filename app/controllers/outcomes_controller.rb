class OutcomesController < ApplicationController
    def create 
        outcome = Outcome.create!(outcome_params)
        render json: outcome, status: :created
    end

    private

    def outcome_params
        params.permit(:trial_id, :outcome_type, :outcome_measure, :outcome_description, :outcome_timeframe)
    end
end
