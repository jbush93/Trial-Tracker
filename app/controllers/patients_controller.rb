require 'will_paginate/array'

class PatientsController < ApplicationController

    def index 
        patients = Patient.all.paginate(:page => params[:page], :per_page => 6)
        response.headers['Total-Pages'] = patients.total_pages
        headers['Access-Control-Expose-Headers'] = 'Total-Pages'
        render json: patients, status: :ok
    end

    def show 
        patient = Patient.find(params[:id])
        render json: patient, status: :ok
    end

    def create 
        patient = Patient.create!(patient_params)
        render json: patient, status: :created
    end

    private
    def patient_params 
        params.permit(:trial_id, :first_name, :last_name, :address, :gender, :weight, :height, :age, :placebo)
    end

end
