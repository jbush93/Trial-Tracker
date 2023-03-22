class DocumentsController < ApplicationController

    require 'google/cloud/storage'
    def create
        @document = Document.create!(document_params)

        render json: @document
    rescue ActiveRecord::RecordInvalid => e
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end

      def show 
        document = Document.find(params[:id])
        render json: document, serializer: DocumentSerializer, status: :ok
      end

    private

    def document_params
        params.permit(:title, :patient_id, :document_url, :pdf)
    end
end

