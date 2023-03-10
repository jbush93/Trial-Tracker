class NotesController < ApplicationController
    def index 
        notes = Note.all 
        render json: notes, status: :ok
    end

    def show 
        note = Note.find(params[:id])
        render json: note, status: :ok
    end

    def create 
        note = Note.create!(notes_params)
        render json: note, status: :created
    end

    private

    def notes_params
      params.permit(:patient_id, :date, :title, :description)
    end
end
