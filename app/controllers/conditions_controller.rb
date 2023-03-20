class ConditionsController < ApplicationController
    def create 
        condition = Condition.create!(condition_params)
        render json: condition, status: :created
    end

    private

    def condition_params
      params.permit(:trial_id, :condition)
    end
end
