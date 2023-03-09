class TrialsController < ApplicationController
    
    def index 
        trials = Trial.all 
        render json: trials, status: :ok
    end

    def show 
        trial = Trial.find(params[:id])
        render json: trial, status: :ok
    end
end
