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
end
