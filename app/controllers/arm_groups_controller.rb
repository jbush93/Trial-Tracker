class ArmGroupsController < ApplicationController
    def create 
        arm_group = ArmGroup.create!(arm_group_params)
        render json: arm_group, status: :created
    end

    private

    def arm_group_params
      params.permit(:trial_id, :label, :group_type, :description, :intervention_name)
    end
end
