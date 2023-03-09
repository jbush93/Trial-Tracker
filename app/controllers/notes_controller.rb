class NotesController < ApplicationController
    def index 
        notes = Note.all 
        render json: notes, status: :ok
    end

    def show 
        note = Note.find(params[:id])
        render json: note, status: :ok
    end
end
