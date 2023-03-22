class TrialsController < ApplicationController
    
    def index 
        trials = Trial.all 
        render json: trials, status: :ok
    end

    def show 
        trial = Trial.find(params[:id])
        render json: trial, status: :ok
    end

    def create 
        trial = Trial.create!(trial_params)
        render json: trial, status: :created
    end

    def update 
        trial = Trial.find(params[:id])
        trial.update(trial_params)
        render json: trial, status: :ok
    end

    def destroy 
        trial = Trial.find(params[:id])
        trial.destroy
    end

    private
    def trial_params 
        params.permit(:NCTId, :organization_name, :brief_title, :official_title, :overall_status, :start_date, :primary_completion_date, :primary_completion_date_type, :lead_sponsor, :is_fda_regulated_drug, :is_fda_regulated_device, :brief_summary, :detailed_description, :study_type, :phase, :intervention_type, :intervention_description, :eligibility_criteria, :gender, :minimum_age, :contact_name, :contact_phone, :contact_email)
    end
end
